import {
  Check,
  ChevronDown,
  Filter,
  MapPin,
} from "lucide-react";

import PriceOption from "@/components/services/PriceFilter";

const priceOptions = [
  {
    label: "Under ₹2,000",
    min: 0,
    max: 1999,
  },
  {
    label: "₹2,000 – ₹5,000",
    min: 2000,
    max: 5000,
  },
  {
    label: "₹5,000 – ₹10,000",
    min: 5001,
    max: 10000,
  },
  {
    label: "₹10,000+",
    min: 10001,
    max: Infinity,
  },
];

function ServiceFilters({
  categories,
  selectedCategory,
  onCategoryChange,
  selectedPrices,
  onPriceChange,
  onReset,
}) {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-5">

        {/* Header */}
        <div className="flex items-center justify-between">

          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-indigo-600" />

            <h2 className="font-semibold text-slate-900">
              Filters
            </h2>
          </div>

          <button
            type="button"
            onClick={onReset}
            className="text-xs font-medium text-indigo-600 hover:text-indigo-700"
          >
            Reset
          </button>

        </div>

        {/* Category */}
        <div className="mt-7">

          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Category
          </h3>

          <div className="mt-4 space-y-1">

            {categories.map((category) => {
              const active = selectedCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => onCategoryChange(category)}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition ${
                    active
                      ? "bg-indigo-50 font-semibold text-indigo-600"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <span>{category}</span>

                  {active && (
                    <Check className="h-4 w-4" />
                  )}
                </button>
              );
            })}

          </div>

        </div>

        {/* Location */}
        <div className="mt-8 border-t border-slate-100 pt-7">

          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Service Area
          </h3>

          <button
            type="button"
            className="mt-4 flex w-full items-center justify-between rounded-xl border border-slate-200 px-3 py-3 text-left text-sm text-slate-600 hover:border-indigo-200"
          >
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-indigo-500" />
              Local Area
            </span>

            <ChevronDown className="h-4 w-4" />
          </button>

        </div>

        {/* Price */}
        <div className="mt-8 border-t border-slate-100 pt-7">

          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Price
          </h3>

          <div className="mt-4 space-y-3">

            {priceOptions.map((option) => (
              <PriceOption
                key={option.label}
                label={option.label}
                checked={selectedPrices.includes(option.label)}
                onChange={() => onPriceChange(option.label)}
              />
            ))}

          </div>

        </div>

      </div>
    </aside>
  );
}

export default ServiceFilters;