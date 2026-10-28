import {
    ArrowRight,
    CalendarCheck,
    CheckCircle2,
    ChevronRight,
    Clock3,
    Heart,
    MapPin,
    MessageCircle,
    ShieldCheck,
    Sparkles,
    Star,
    Users,
    Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import ServiceCategoryCard from "@/components/home/ServiceCategoryCard";
import ServiceCard from "@/components/home/ServiceCard";
import HowItWorks from "@/components/home/HowItWorks";
import WhatsAppCTA from "@/components/home/WhatsAppCTA";
import TrustStat from "@/components/home/TrustStats";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { services } from "@/data/services";
import { Link } from "react-router-dom";

const categories = [
    {
        icon: "wedding",
        title: "Wedding & Events",
        description: "Complete solutions for memorable celebrations.",
        serviceCount: "12",
    },
    {
        icon: "dj",
        title: "DJ & Sound",
        description: "DJ, sound, lighting and music setups.",
        serviceCount: "8",
    },
    {
        icon: "decoration",
        title: "Decoration",
        description: "Stage, mandap, tent and venue decoration.",
        serviceCount: "10",
    },
    {
        icon: "tailoring",
        title: "Boutique & Tailoring",
        description: "Custom stitching and wedding outfits.",
        serviceCount: "6",
    },
    {
        icon: "electrical",
        title: "Electrical Services",
        description: "Repair, wiring and installation work.",
        serviceCount: "9",
    },
    {
        icon: "tent",
        title: "Tent & Event Setup",
        description: "Complete arrangements for local events.",
        serviceCount: "7",
    },
];

function Home() {

    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();

        const query = searchQuery.trim();

        navigate(
            query
                ? `/services?search=${encodeURIComponent(query)}`
                : "/services"
        );
    };

    return (
        <main className="overflow-hidden bg-white">

            {/* =====================================================
          HERO
      ====================================================== */}
            <section className="relative min-h-[680px] overflow-hidden">

                <img
                    src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=2200&q=90"
                    alt="Beautiful wedding venue"
                    className="absolute inset-0 h-full w-full object-cover"
                />

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-slate-950/65" />

                {/* Gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/65 to-slate-950/25" />

                {/* Bottom fade */}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-950/40 to-transparent" />

                <div className="relative z-10 mx-auto flex min-h-[680px] max-w-7xl items-center px-5 py-20 sm:px-8 lg:px-10">

                    <div className="max-w-3xl">

                        {/* Badge */}
                        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md">
                            <span className="flex h-2 w-2 rounded-full bg-emerald-400" />
                            Trusted local services near you
                        </div>

                        {/* Heading */}
                        <h1 className="max-w-4xl text-5xl font-bold leading-[1.02] tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
                            Make your special
                            <span className="block text-indigo-400">
                                moments unforgettable.
                            </span>
                        </h1>

                        <p className="mt-7 max-w-2xl text-base leading-7 text-white/75 sm:text-lg lg:text-xl">
                            Discover trusted local services for weddings, events,
                            tailoring, electrical work and everyday needs — all in one
                            place.
                        </p>

                        ```jsx
                        {/* Search */}
                        <form
                            onSubmit={handleSearch}
                            className="mt-9 flex max-w-2xl flex-col gap-2 rounded-2xl border border-white/20 bg-white p-2 shadow-2xl sm:flex-row"
                        >
                            <div className="flex min-h-14 flex-1 items-center gap-3 px-4">
                                <Sparkles className="h-5 w-5 shrink-0 text-indigo-500" />

                                <div className="min-w-0 flex-1">
                                    <p className="text-xs font-medium text-slate-400">
                                        Find a service
                                    </p>

                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="What do you need?"
                                        aria-label="Search services"
                                        className="w-full bg-transparent pt-1 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400"
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                size="lg"
                                className="h-14 cursor-pointer rounded-xl bg-indigo-600 px-8 text-sm font-semibold shadow-lg shadow-indigo-600/20 hover:bg-indigo-700"
                            >
                                Search Services
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </form>
                        ```

                        {/* Trust points */}
                        <div className="mt-7 flex flex-wrap gap-x-7 gap-y-3 text-sm text-white/75">

                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                                Verified local services
                            </div>

                            <div className="flex items-center gap-2">
                                <CalendarCheck className="h-4 w-4 text-indigo-300" />
                                Easy booking requests
                            </div>

                            <div className="flex items-center gap-2">
                                <ShieldCheck className="h-4 w-4 text-indigo-300" />
                                Admin verified
                            </div>

                        </div>
                    </div>
                </div>

                {/* Floating information card */}
                <div className="absolute bottom-8 right-8 z-20 hidden w-64 rounded-2xl border border-white/20 bg-white/95 p-4 shadow-2xl backdrop-blur-md lg:block">

                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                            <Heart className="h-5 w-5 fill-indigo-100" />
                        </div>

                        <div>
                            <p className="text-sm font-semibold text-slate-900">
                                Your special day
                            </p>

                            <p className="text-xs text-slate-500">
                                We help make it memorable.
                            </p>
                        </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                        <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                            <span className="text-sm font-semibold text-slate-800">
                                4.9
                            </span>
                        </div>

                        <span className="text-xs text-slate-400">
                            Local service rating
                        </span>
                    </div>
                </div>
            </section>

            {/* =====================================================
          TRUST STATS
      ====================================================== */}
            <section className="border-b border-slate-100 bg-white">
                <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-slate-100 md:grid-cols-4">

                    <TrustStat
                        icon={Users}
                        value="500+"
                        label="Local Customers"
                    />

                    <TrustStat
                        icon={Sparkles}
                        value="50+"
                        label="Services Available"
                    />

                    <TrustStat
                        icon={CheckCircle2}
                        value="100%"
                        label="Booking Reviewed"
                    />

                    <TrustStat
                        icon={MapPin}
                        value="Local"
                        label="Service Focus"
                    />

                </div>
            </section>

            {/* =====================================================
          CATEGORIES - Explore services
      ====================================================== */}
            <section className="bg-white py-24">

                <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

                    <SectionHeading
                        eyebrow="Explore services"
                        title="Everything you need,"
                        highlight=" in one place."
                        description="From celebrations to everyday work, discover trusted services from your local area."
                        action="View all services"
                    />

                    <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {categories.map((category) => (
                            <ServiceCategoryCard
                                key={category.title}
                                {...category}
                            />
                        ))}
                    </div>

                </div>
            </section>

            {/* =====================================================
          POPULAR SERVICES
      ====================================================== */}
            <section className="bg-slate-50 py-24">

                <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

                    <SectionHeading
                        eyebrow="Popular services"
                        title="Services people"
                        highlight=" love."
                        description="Explore some of the most requested services from our local network."
                        action="Explore all"
                    />

                    <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">

                        {services.map((service) => (
                            <ServiceCard
                                key={service.id}
                                id={service.id}
                                image={service.image}
                                category={service.category}
                                title={service.title}
                                description={service.description}
                                rating={service.rating}
                                location={service.location}
                                price={service.price}
                            />
                        ))}

                    </div>

                </div>
            </section>

            {/* =====================================================
          WHY LOCAL SEVA
      ====================================================== */}
            <section className="bg-white py-24">

                <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

                    <div className="grid items-center gap-14 lg:grid-cols-2">

                        {/* Image */}
                        <div className="relative">

                            <div className="overflow-hidden rounded-[2rem]">
                                <img
                                    src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=85"
                                    alt="Wedding celebration"
                                    className="h-[500px] w-full object-cover"
                                />
                            </div>

                            {/* Floating card */}
                            <div className="absolute -bottom-6 -right-4 hidden w-64 rounded-2xl border border-slate-100 bg-white p-5 shadow-xl sm:block">

                                <div className="flex items-center gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                                        <ShieldCheck className="h-5 w-5" />
                                    </div>

                                    <div>
                                        <p className="font-semibold text-slate-900">
                                            Trusted locally
                                        </p>

                                        <p className="text-xs text-slate-500">
                                            Services reviewed by our team
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* Content */}
                        <div>

                            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-indigo-600">
                                Why LocalSeva
                            </span>

                            <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                                Local service,
                                <span className="block text-indigo-600">
                                    made simpler.
                                </span>
                            </h2>

                            <p className="mt-6 max-w-xl text-base leading-7 text-slate-500">
                                Finding reliable local help shouldn't be complicated.
                                LocalSeva brings services, availability and booking requests
                                together in one simple platform.
                            </p>

                            <div className="mt-9 space-y-6">

                                <Feature
                                    icon={ShieldCheck}
                                    title="Trusted local services"
                                    description="We focus on services and professionals from your local area."
                                />

                                <Feature
                                    icon={CalendarCheck}
                                    title="Booking requests, not blind confirmations"
                                    description="We check availability before confirming your request."
                                />

                                <Feature
                                    icon={MessageCircle}
                                    title="Real people, real communication"
                                    description="Need help? Connect with the business directly through WhatsApp."
                                />

                                <Feature
                                    icon={Clock3}
                                    title="Simple and convenient"
                                    description="Find a service, send your requirements and let us handle the rest."
                                />

                            </div>

                            <Link to="/services">
                                <Button className="mt-9 rounded-xl bg-indigo-600 px-6 hover:bg-indigo-700 cursor-pointer">
                                Explore Local Services
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                            </Link>

                        </div>
                    </div>

                </div>
            </section>

            {/* =====================================================
          HOW IT WORKS
      ====================================================== */}
            <HowItWorks />

            {/* =====================================================
          WHATSAPP
      ====================================================== */}
            <WhatsAppCTA />

        </main>
    );
}


/* ============================================================
   SMALL REUSABLE UI COMPONENTS
============================================================ */

function SectionHeading({
    eyebrow,
    title,
    highlight,
    description,
    action,
}) {
    return (
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">

            <div className="max-w-2xl">

                <span className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">
                    {eyebrow}
                </span>

                <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                    {title}
                    <span className="text-indigo-600">
                        {highlight}
                    </span>
                </h2>

                <p className="mt-4 max-w-xl text-base leading-7 text-slate-500">
                    {description}
                </p>

            </div>

            <button className="group flex shrink-0 items-center gap-1 text-sm font-semibold text-indigo-600 cursor-pointer">
                {action}

                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>

        </div>
    );
}

function Feature({ icon: Icon, title, description }) {
    return (
        <div className="flex gap-4">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <Icon className="h-5 w-5" />
            </div>

            <div>
                <h3 className="font-semibold text-slate-900">
                    {title}
                </h3>

                <p className="mt-1 text-sm leading-6 text-slate-500">
                    {description}
                </p>
            </div>

        </div>
    );
}

export default Home;