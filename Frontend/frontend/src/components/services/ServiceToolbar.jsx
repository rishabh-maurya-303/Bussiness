import { ChevronDown } from "lucide-react";

function ServiceToolbar({
  count,
  sortBy,
  onSortChange,
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

      <div>
        <h2 className="text-lg font-bold text-slate-900">
          All Services
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Showing {count} {count === 1 ? "service" : "services"}
        </p>
      </div>

      <div className="relative">

        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="cursor-pointer appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-4 pr-10 text-sm font-medium text-slate-600 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
        >
          <option value="popular">
            Popular
          </option>

          <option value="rating">
            Highest Rated
          </option>

          <option value="price-low">
            Price: Low to High
          </option>

          <option value="price-high">
            Price: High to Low
          </option>

          <option value="name">
            Name: A to Z
          </option>
        </select>

        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

      </div>

    </div>
  );
}

export default ServiceToolbar;