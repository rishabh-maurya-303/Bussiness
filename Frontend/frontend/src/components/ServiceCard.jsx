import {
  ArrowRight,
  MapPin,
  Star,
} from "lucide-react";

import { Button } from "@/components/ui/button";

function ServiceCard({
  image,
  category,
  title,
  description,
  rating,
  location,
  price,
}) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-indigo-100 hover:shadow-2xl">

      {/* Image */}
      <div className="relative h-60 overflow-hidden">

        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />

        {/* Category */}
        <span className="absolute left-4 top-4 rounded-full border border-white/40 bg-white/90 px-3 py-1.5 text-xs font-semibold text-indigo-600 shadow-sm backdrop-blur">
          {category}
        </span>

        {/* Rating */}
        <div className="absolute bottom-4 right-4 flex items-center gap-1 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-slate-800 shadow-lg">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          {rating}
        </div>

      </div>

      {/* Content */}
      <div className="p-5">

        <h3 className="text-xl font-bold text-slate-900">
          {title}
        </h3>

        <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
          {description}
        </p>

        <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
          <MapPin className="h-4 w-4 text-indigo-500" />
          {location}
        </div>

        <div className="mt-5 flex items-end justify-between border-t border-slate-100 pt-5">

          <div>
            <p className="text-xs text-slate-400">
              Starting from
            </p>

            <p className="mt-0.5 text-xl font-bold text-slate-900">
              {price}
            </p>
          </div>

          <Button
            variant="outline"
            className="group/button rounded-xl border-indigo-200 px-4 text-indigo-600 hover:bg-indigo-600 hover:text-white cursor-pointer"
          >
            View Details
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/button:translate-x-1" />
          </Button>

        </div>

      </div>
    </article>
  );
}

export default ServiceCard;