import { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

import ServiceSearch from "@/components/services/ServiceSearch";
import ServiceFilters from "@/components/services/ServiceFilters";
import ServiceToolbar from "@/components/services/ServiceToolbar";
import ServiceListCard from "@/components/services/ServiceListCard";
import MobileFilters from "@/components/services/MobileFilters";

import { services } from "@/data/services";

const categories = [
    "All Services",
    "Wedding & Events",
    "DJ & Sound",
    "Decoration",
    "Boutique & Tailoring",
    "Electrical Services",
    "Tent & Event Setup",
];

const priceRanges = {
    "Under ₹2,000": {
        min: 0,
        max: 1999,
    },
    "₹2,000 – ₹5,000": {
        min: 2000,
        max: 5000,
    },
    "₹5,000 – ₹10,000": {
        min: 5001,
        max: 10000,
    },
    "₹10,000+": {
        min: 10001,
        max: Infinity,
    },
};

function Services() {

    const [searchParams, setSearchParams] = useSearchParams();
    const [search, setSearch] = useState(
        searchParams.get("search") || ""
    );

    const [category, setCategory] = useState("All Services");
    const [selectedPrices, setSelectedPrices] = useState([]);
    const [sortBy, setSortBy] = useState("popular");
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    /*
     * Price filter
     */
    const handlePriceChange = (priceLabel) => {
        setSelectedPrices((current) => {
            if (current.includes(priceLabel)) {
                return current.filter((price) => price !== priceLabel);
            }

            return [...current, priceLabel];
        });
    };

    /*
     * Reset everything
     */
    const handleReset = () => {
        setSearch("");
        setCategory("All Services");
        setSelectedPrices([]);
        setSortBy("popular");
    };

    /*
     * Filter + Sort
     */
    const filteredServices = useMemo(() => {
        const searchText = search.trim().toLowerCase();

        const filtered = services.filter((service) => {

            // Category
            const matchesCategory =
                category === "All Services" ||
                service.category === category;

            // Search
            const matchesSearch =
                !searchText ||
                service.title.toLowerCase().includes(searchText) ||
                service.description.toLowerCase().includes(searchText) ||
                service.category.toLowerCase().includes(searchText);

            // Price
            const matchesPrice =
                selectedPrices.length === 0 ||
                selectedPrices.some((priceLabel) => {
                    const range = priceRanges[priceLabel];

                    return (
                        service.priceValue >= range.min &&
                        service.priceValue <= range.max
                    );
                });

            return (
                matchesCategory &&
                matchesSearch &&
                matchesPrice
            );
        });

        // Sorting
        return [...filtered].sort((a, b) => {
            switch (sortBy) {
                case "rating":
                    return b.rating - a.rating;

                case "price-low":
                    return a.priceValue - b.priceValue;

                case "price-high":
                    return b.priceValue - a.priceValue;

                case "name":
                    return a.title.localeCompare(b.title);

                case "popular":
                default:
                    return b.reviews - a.reviews;
            }
        });
    }, [
        search,
        category,
        selectedPrices,
        sortBy,
    ]);

    return (
        <main className="min-h-screen bg-slate-50">

            {/* =====================================================
          PAGE HEADER
      ====================================================== */}

            <section className="border-b border-slate-200 bg-white">

                <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10">

                    <div className="max-w-3xl">

                        <span className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">
                            Our services
                        </span>

                        <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                            Find the right
                            <span className="text-indigo-600">
                                {" "}service for you.
                            </span>
                        </h1>

                        <p className="mt-5 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg">
                            Explore trusted local services for weddings, events,
                            tailoring, electrical work and more.
                        </p>

                    </div>

                    <ServiceSearch
                        value={search}
                        onChange={setSearch}
                    />

                </div>

            </section>

            {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

            <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">

                {/* Mobile filter button */}
                <div className="mb-6 flex items-center justify-between lg:hidden">

                    <p className="text-sm font-medium text-slate-600">
                        {filteredServices.length} services available
                    </p>

                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => setMobileFiltersOpen(true)}
                        className="rounded-xl"
                    >
                        <SlidersHorizontal className="mr-2 h-4 w-4" />
                        Filters
                    </Button>

                </div>

                <div className="grid gap-8 lg:grid-cols-[240px_1fr]">

                    {/* Desktop filters */}
                    <ServiceFilters
                        categories={categories}
                        selectedCategory={category}
                        onCategoryChange={setCategory}
                        selectedPrices={selectedPrices}
                        onPriceChange={handlePriceChange}
                        onReset={handleReset}
                    />

                    {/* Results */}
                    <div>

                        <ServiceToolbar
                            count={filteredServices.length}
                            sortBy={sortBy}
                            onSortChange={setSortBy}
                        />

                        {/* Results */}
                        {filteredServices.length > 0 ? (
                            <div className="grid gap-6 md:grid-cols-2">

                                {filteredServices.map((service) => (
                                    <ServiceListCard
                                        key={service.id}
                                        service={service}
                                    />
                                ))}

                            </div>
                        ) : (
                            <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center">

                                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                                    <SlidersHorizontal className="h-6 w-6" />
                                </div>

                                <h3 className="mt-5 text-lg font-bold text-slate-900">
                                    No services found
                                </h3>

                                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                                    We couldn't find any services matching your current
                                    search and filters. Try changing your search or clearing
                                    some filters.
                                </p>

                                <Button
                                    type="button"
                                    onClick={handleReset}
                                    className="mt-6 rounded-xl bg-indigo-600 hover:bg-indigo-700"
                                >
                                    Clear Filters
                                </Button>

                            </div>
                        )}

                    </div>

                </div>

            </section>

            {/* Mobile drawer */}
            <MobileFilters
                open={mobileFiltersOpen}
                onClose={() => setMobileFiltersOpen(false)}
                categories={categories}
                selectedCategory={category}
                onCategoryChange={setCategory}
                selectedPrices={selectedPrices}
                onPriceChange={handlePriceChange}
                onReset={handleReset}
            />

        </main>
    );
}

export default Services;