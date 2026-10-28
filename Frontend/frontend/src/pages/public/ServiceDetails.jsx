import { Link, useParams } from "react-router-dom";
import {
    ArrowLeft,
    CheckCircle2,
    Clock,
    MapPin,
    MessageCircle,
    Star,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { services } from "@/data/services";


function ServiceDetails() {

    const { id } = useParams();

    const service = services.find(
        (item) => String(item.id) === String(id)
    );

    // Check first, before accessing service properties
    if (!service) {
        return (
            <section className="flex min-h-[70vh] items-center justify-center px-6">
                <div className="text-center">
                    <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">
                        Service not found
                    </p>

                    <h1 className="mt-3 text-4xl font-bold text-slate-900">
                        We couldn't find this service
                    </h1>

                    <p className="mx-auto mt-4 max-w-lg text-slate-500">
                        The service may have been removed or the link may be incorrect.
                    </p>

                    <Link to="/services" className="mt-7 inline-block">
                        <Button className="rounded-xl bg-indigo-600 hover:bg-indigo-700">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Services
                        </Button>
                    </Link>
                </div>
            </section>
        );
    }

    // Safe to access service properties after the check
    const whatsappMessage = encodeURIComponent(
        `Hello LocalSeva! I am interested in ${service.title}.
Starting price: ${service.price}
Location: ${service.location}

Please share more details and availability.`
    );

    const whatsappUrl =
        `https://wa.me/919795297758?text=${whatsappMessage}`;

    // Keep your existing return (...) for the service details page below



    return (
        <div className="bg-white">
            {/* Breadcrumb */}
            <section className="border-b border-slate-100 bg-slate-50">
                <div className="mx-auto max-w-7xl px-6 py-5 lg:px-8">
                    <Link
                        to="/services"
                        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-indigo-600"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Services
                    </Link>
                </div>
            </section>

            {/* Main */}
            <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
                <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">

                    {/* Image */}
                    <div className="overflow-hidden rounded-3xl">
                        <img
                            src={service.image}
                            alt={service.title}
                            className="h-[420px] w-full object-cover lg:h-[560px]"
                        />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col justify-center">
                        <span className="w-fit rounded-full bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-600">
                            {service.category}
                        </span>

                        <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                            {service.title}
                        </h1>

                        <div className="mt-5 flex flex-wrap items-center gap-5">
                            <div className="flex items-center gap-2">
                                <Star className="h-5 w-5 fill-amber-400 text-amber-400" />

                                <span className="font-bold text-slate-900">
                                    {service.rating}
                                </span>

                                <span className="text-slate-500">
                                    ({service.reviews} reviews)
                                </span>
                            </div>

                            <div className="flex items-center gap-2 text-slate-500">
                                <MapPin className="h-5 w-5 text-indigo-500" />
                                {service.location}
                            </div>
                        </div>

                        <p className="mt-7 text-lg leading-8 text-slate-500">
                            {service.description}
                        </p>

                        {/* Price */}
                        <div className="mt-8 rounded-2xl border border-indigo-100 bg-indigo-50 p-5">
                            <p className="text-sm text-slate-500">
                                Starting price
                            </p>

                            <p className="mt-1 text-3xl font-bold text-indigo-600">
                                {service.price}
                            </p>

                            <p className="mt-1 text-sm text-slate-500">
                                Final price may vary depending on your requirements.
                            </p>
                        </div>

                        {/* Info */}
                        <div className="mt-7 grid gap-4 sm:grid-cols-2">
                            <div className="flex items-center gap-3 rounded-xl border border-slate-200 p-4">
                                <Clock className="h-5 w-5 text-indigo-600" />

                                <div>
                                    <p className="text-sm font-semibold text-slate-900">
                                        Flexible Timing
                                    </p>

                                    <p className="text-xs text-slate-500">
                                        Based on availability
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 rounded-xl border border-slate-200 p-4">
                                <MapPin className="h-5 w-5 text-indigo-600" />

                                <div>
                                    <p className="text-sm font-semibold text-slate-900">
                                        Local Service
                                    </p>

                                    <p className="text-xs text-slate-500">
                                        Serving nearby areas
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            {/* Book This Service */}
                            <Link
                                to={`/book?service=${service.id}`}
                                className="flex-1"
                            >
                                <Button
                                    size="lg"
                                    className="h-12 w-full rounded-xl bg-indigo-600 px-7 hover:bg-indigo-700"
                                >
                                    Book This Service
                                </Button>
                            </Link>

                            {/* WhatsApp */}
                            <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1"
                            >
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="h-12 w-full rounded-xl border-slate-200 px-7"
                                >
                                    <MessageCircle className="mr-2 h-5 w-5" />
                                    WhatsApp Enquiry
                                </Button>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="bg-slate-50">
                <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
                    <div className="max-w-2xl">
                        <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">
                            What's included
                        </p>

                        <h2 className="mt-3 text-3xl font-bold text-slate-900">
                            Everything you need
                        </h2>
                    </div>

                    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {service.features?.length > 0 ? (
                            service.features.map((feature) => (
                                <div
                                    key={feature}
                                    className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-5"
                                >
                                    <CheckCircle2 className="h-5 w-5 shrink-0 text-indigo-600" />
                                    <span className="font-medium text-slate-700">
                                        {feature}
                                    </span>
                                </div>
                            ))
                        ) : (
                            <p className="text-slate-500">
                                Contact us to learn more about what's included in this service.
                            </p>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ServiceDetails;