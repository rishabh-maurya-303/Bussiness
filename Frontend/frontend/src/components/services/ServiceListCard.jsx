import { ArrowRight, MapPin, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function ServiceListCard({ service }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-100 hover:shadow-xl">

      {/* Image */}
      <div className="relative h-56 overflow-hidden">

        <img
          src={service.image}
          alt={service.title}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        <span className="absolute left-4 top-4 rounded-full border border-white/30 bg-white/90 px-3 py-1.5 text-xs font-semibold text-indigo-600 backdrop-blur">
          {service.category}
        </span>

      </div>

      {/* Content */}
      <div className="p-5">

        <div className="flex items-start justify-between gap-4">

          <div>

            <h3 className="text-lg font-bold text-slate-900">
              {service.title}
            </h3>

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

            <p className="text-[10px] text-slate-400">
              Starting
            </p>

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

          <Button className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 cursor-pointer p-0">
            <Link
              to={`/services/${service.id}`}
              className="flex w-full items-center justify-center px-4 py-2"
            >
              View Service
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>

        </div>

      </div>

    </article>
  );
}

export default ServiceListCard;