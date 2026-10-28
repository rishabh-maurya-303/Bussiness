
import { ArrowRight, MapPin, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

function ServiceListCard({ service }) {
  const detailsUrl = `/services/${service.id}`;

  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-100 hover:shadow-xl">
      {/* Image */}
      <Link
        to={detailsUrl}
        aria-label={`View ${service.title} details`}
        className="relative block h-56 overflow-hidden"
      >
        <img
          src={service.image}
          alt={service.title}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        <span className="pointer-events-none absolute left-4 top-4 rounded-full border border-white/30 bg-white/90 px-3 py-1.5 text-xs font-semibold text-indigo-600 backdrop-blur">
          {service.category}
        </span>
      </Link>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Link
              to={detailsUrl}
              className="text-lg font-bold text-slate-900 hover:text-indigo-600"
            >
              {service.title}
            </Link>

            <div className="mt-2 flex items-center gap-1 text-sm">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="font-semibold text-slate-800">
                {service.rating}
              </span>
              <span className="text-slate-400">
                ({service.reviews})
              </span>
            </div>
          </div>

          <div className="shrink-0 rounded-xl bg-indigo-50 px-3 py-2 text-right">
            <p className="text-[10px] text-slate-400">Starting</p>
            <p className="text-sm font-bold text-indigo-600">
              {service.price}
            </p>
          </div>
        </div>

        <p className="mt-4 line-clamp-2 text-sm leading-6 text-slate-500">
          {service.description}
        </p>

        <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
          <MapPin className="h-3.5 w-3.5 text-indigo-500" />
          {service.location}
        </div>

        <div className="mt-5 border-t border-slate-100 pt-4">
          <Link to={detailsUrl} className="block">
            <Button className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-700">
              View Service
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </article>
  );
}

export default ServiceListCard;
