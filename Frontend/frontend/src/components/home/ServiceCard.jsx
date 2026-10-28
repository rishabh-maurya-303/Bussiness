
import {
  ArrowRight,
  MapPin,
  Star,
} from "lucide-react";

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

function ServiceCard({
  id,
  image,
  category,
  title,
  description,
  rating,
  location,
  price,
}) {
  const detailsUrl = `/services/${id}`;

  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-indigo-100 hover:shadow-2xl">

      {/* Image */}
      <Link
        to={detailsUrl}
        aria-label={`View details for ${title}`}
        className="relative block h-60 overflow-hidden"
      >
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />

        {/* Overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />

        {/* Category */}
        <span className="pointer-events-none absolute left-4 top-4 rounded-full border border-white/40 bg-white/90 px-3 py-1.5 text-xs font-semibold text-indigo-600 shadow-sm backdrop-blur">
          {category}
        </span>

        {/* Rating */}
        <div className="pointer-events-none absolute bottom-4 right-4 flex items-center gap-1 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-slate-800 shadow-lg">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          {rating}
        </div>
      </Link>

      {/* Content */}
      <div className="p-5">
        <Link
          to={detailsUrl}
          className="text-xl font-bold text-slate-900 hover:text-indigo-600"
        >
          {title}
        </Link>

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


          <Link to={`/services/${id}`}>
            <Button
              variant="outline"
              className="cursor-pointer rounded-xl border-indigo-200 px-4 text-indigo-600 hover:bg-indigo-600 hover:text-white"
            >
              View Details
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>

        </div>
      </div>
    </article>
  );
}

export default ServiceCard;
