import {
  Check,
  Filter,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import PriceOption from "@/components/services/PriceFilter";

const priceOptions = [
  {
    label: "Under ₹2,000",
  },
  {
    label: "₹2,000 – ₹5,000",
  },
  {
    label: "₹5,000 – ₹10,000",
  },
  {
    label: "₹10,000+",
  },
];

function MobileFilters({
  open,
  onClose,
  categories,
  selectedCategory,
  onCategoryChange,
  selectedPrices,
  onPriceChange,
  onReset,
}) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] lg:hidden">

      {/* Overlay */}
      <div
        className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="absolute bottom-0 left-0 right-0 max-h-[90vh] overflow-y-auto rounded-t-3xl bg-white p-6 shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between">

          <div className="flex items-center gap-2">

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <Filter className="h-4 w-4" />
            </div>

            <h2 className="text-lg font-bold text-slate-900">
              Filters
            </h2>

          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-slate-500 hover:bg-slate-100"
          >
            <X className="h-5 w-5" />
          </button>

        </div>

        {/* Categories */}
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
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm ${
                    active
                      ? "bg-indigo-50 font-semibold text-indigo-600"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {category}

                  {active && (
                    <Check className="h-4 w-4" />
                  )}
                </button>
              );
            })}

          </div>

        </div>

        {/* Price */}
        <div className="mt-7 border-t border-slate-100 pt-7">

          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Price
          </h3>

          <div className="mt-4 space-y-4">

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

        {/* Actions */}
        <div className="mt-8 flex gap-3 border-t border-slate-100 pt-5">

          <Button
            type="button"
            variant="outline"
            onClick={onReset}
            className="flex-1 rounded-xl"
          >
            Reset
          </Button>

          <Button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-xl bg-indigo-600 hover:bg-indigo-700"
          >
            Apply Filters
          </Button>

        </div>

      </div>
    </div>
  );
}

export default MobileFilters;