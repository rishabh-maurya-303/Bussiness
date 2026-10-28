import {
  Heart,
  Music2,
  Shirt,
  Sparkles,
  Tent,
  Zap,
  ArrowUpRight,
} from "lucide-react";

const iconMap = {
  wedding: Heart,
  dj: Music2,
  decoration: Sparkles,
  tailoring: Shirt,
  electrical: Zap,
  tent: Tent,
};

function ServiceCategoryCard({
  icon,
  title,
  description,
  serviceCount,
}) {
  const Icon = iconMap[icon];

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl">

      {/* Decorative background */}
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-indigo-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative">

        <div className="flex items-start justify-between">

          <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 transition-all duration-300 group-hover:bg-indigo-600 group-hover:text-white">
            <Icon className="h-6 w-6" />
          </div>

          <span className="rounded-full bg-slate-50 px-3 py-1 text-xs font-medium text-slate-400">
            {serviceCount} services
          </span>

        </div>

        <h3 className="mt-7 text-lg font-bold text-slate-900">
          {title}
        </h3>

        <p className="mt-2 min-h-12 text-sm leading-6 text-slate-500">
          {description}
        </p>

        <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">

          <span className="text-sm font-semibold text-indigo-600">
            Explore services
          </span>

          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition-all group-hover:border-indigo-200 group-hover:bg-indigo-50 group-hover:text-indigo-600">
            <ArrowUpRight className="h-4 w-4 cursor-pointer" />
          </div>

        </div>

      </div>
    </div>
  );
}

export default ServiceCategoryCard;