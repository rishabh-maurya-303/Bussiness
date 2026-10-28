
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    ArrowRight,
    CalendarDays,
    Clock,
    MapPin,
    ClipboardList,
    RefreshCw,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { services } from "@/data/services";

function formatDate(dateString) {
    if (!dateString) return "Date not specified";

    return new Date(`${dateString}T00:00:00`).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
}

function getStatusStyles(status) {
    switch (status?.toLowerCase()) {
        case "confirmed":
            return "bg-green-50 text-green-700";
        case "rejected":
            return "bg-red-50 text-red-700";
        case "completed":
            return "bg-blue-50 text-blue-700";
        case "pending":
        default:
            return "bg-amber-50 text-amber-700";
    }
}

function Bookings() {
    const [bookings, setBookings] = useState([]);
    const [filter, setFilter] = useState("All");
    const [loadError, setLoadError] = useState(false);

    useEffect(() => {
        try {
            const savedBookings = JSON.parse(
                localStorage.getItem("localSevaBookings") || "[]"
            );

            setBookings(
                Array.isArray(savedBookings) ? savedBookings : []
            );
        } catch {
            setLoadError(true);
        }
    }, []);

    const filteredBookings =
        filter === "All"
            ? bookings
            : bookings.filter(
                (booking) =>
                    booking.status?.toLowerCase() === filter.toLowerCase()
            );

    const filters = ["All", "Pending", "Confirmed", "Completed", "Rejected"];

    return (
        <main className="min-h-screen bg-slate-50">
            {/* Header */}
            <section className="border-b border-slate-200 bg-white">
                <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
                    <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">
                        Your activity
                    </p>

                    <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        My Bookings
                    </h1>

                    <p className="mt-3 max-w-2xl text-slate-500">
                        View your service requests, check their status, and
                        keep track of your upcoming events.
                    </p>

                    <div className="mt-6 flex flex-wrap gap-3">
                        <div className="rounded-xl bg-slate-100 px-4 py-3">
                            <p className="text-xs text-slate-500">
                                Total requests
                            </p>
                            <p className="mt-1 text-xl font-bold text-slate-900">
                                {bookings.length}
                            </p>
                        </div>

                        <div className="rounded-xl bg-amber-50 px-4 py-3">
                            <p className="text-xs text-amber-700">
                                Pending requests
                            </p>
                            <p className="mt-1 text-xl font-bold text-amber-800">
                                {
                                    bookings.filter(
                                        (booking) =>
                                            booking.status?.toLowerCase() ===
                                            "pending"
                                    ).length
                                }
                            </p>
                        </div>

                        <div className="rounded-xl bg-green-50 px-4 py-3">
                            <p className="text-xs text-green-700">
                                Confirmed
                            </p>
                            <p className="mt-1 text-xl font-bold text-green-800">
                                {
                                    bookings.filter(
                                        (booking) =>
                                            booking.status?.toLowerCase() ===
                                            "confirmed"
                                    ).length
                                }
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
                {/* Filters */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <h2 className="text-xl font-bold text-slate-900">
                        Your requests
                    </h2>

                    <div className="flex flex-wrap gap-2">
                        {filters.map((item) => (
                            <button
                                key={item}
                                type="button"
                                onClick={() => setFilter(item)}
                                className={`rounded-full px-4 py-2 text-sm font-medium transition ${filter === item
                                        ? "bg-indigo-600 text-white"
                                        : "border border-slate-200 bg-white text-slate-600 hover:border-indigo-300 hover:text-indigo-600"
                                    }`}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </div>

                {loadError && (
                    <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
                        We couldn't read your saved bookings. Your browser
                        storage may be unavailable or contain invalid data.
                    </div>
                )}

                {/* Empty state */}
                {!loadError && filteredBookings.length === 0 && (
                    <div className="mt-8 rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50">
                            <ClipboardList className="h-8 w-8 text-indigo-600" />
                        </div>

                        <h3 className="mt-5 text-xl font-bold text-slate-900">
                            {bookings.length === 0
                                ? "No bookings yet"
                                : `No ${filter.toLowerCase()} requests`}
                        </h3>

                        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                            {bookings.length === 0
                                ? "Explore local services and submit a booking request. Your saved requests will appear here."
                                : "Try another status filter to see your other booking requests."}
                        </p>

                        {bookings.length === 0 && (
                            <Link to="/services" className="mt-6 inline-block">
                                <Button className="rounded-xl bg-indigo-600 hover:bg-indigo-700">
                                    Explore Services
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        )}
                    </div>
                )}

                {/* Booking cards */}
                <div className="mt-6 grid gap-5">
                    {filteredBookings.map((booking) => {
                        const service = services.find(
                            (item) =>
                                String(item.id) === String(booking.serviceId)
                        );

                        return (
                            <article
                                key={booking.id}
                                className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
                            >
                                <div className="grid md:grid-cols-[220px_1fr]">
                                    <div className="relative h-48 bg-slate-100 md:h-full">
                                        {service?.image ? (
                                            <img
                                                src={service.image}
                                                alt={booking.serviceTitle}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-full min-h-40 items-center justify-center">
                                                <ClipboardList className="h-10 w-10 text-slate-300" />
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-5 sm:p-6">
                                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                            <div>
                                                <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                                                    Request ID: {booking.id}
                                                </p>

                                                <h3 className="mt-2 text-xl font-bold text-slate-900">
                                                    {booking.serviceTitle}
                                                </h3>

                                                <p className="mt-1 text-sm text-slate-500">
                                                    Requested by{" "}
                                                    {booking.customerName}
                                                </p>
                                            </div>

                                            <span
                                                className={`w-fit rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusStyles(
                                                    booking.status
                                                )}`}
                                            >
                                                {booking.status || "Pending"}
                                            </span>
                                        </div>

                                        <div className="mt-5 grid gap-4 text-sm sm:grid-cols-2">
                                            <div className="flex items-start gap-3">
                                                <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-indigo-600" />
                                                <div>
                                                    <p className="text-slate-400">
                                                        Preferred date
                                                    </p>
                                                    <p className="mt-1 font-medium text-slate-700">
                                                        {formatDate(booking.date)}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-3">
                                                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-indigo-600" />
                                                <div>
                                                    <p className="text-slate-400">
                                                        Preferred time
                                                    </p>
                                                    <p className="mt-1 font-medium text-slate-700">
                                                        {booking.time || "Not specified"}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-3 sm:col-span-2">
                                                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-indigo-600" />
                                                <div>
                                                    <p className="text-slate-400">
                                                        Service location
                                                    </p>
                                                    <p className="mt-1 font-medium text-slate-700">
                                                        {booking.location}
                                                    </p>
                                                    {booking.address && (
                                                        <p className="mt-1 text-slate-500">
                                                            {booking.address}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-5 flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
                                            <div>
                                                <p className="text-xs text-slate-400">
                                                    Starting price
                                                </p>
                                                <p className="mt-1 font-bold text-indigo-600">
                                                    {booking.price}
                                                </p>
                                            </div>

                                            <Link
                                                to={`/bookings/${booking.id}`}
                                                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-indigo-300 hover:text-indigo-600"
                                            >
                                                View Details
                                                <ArrowRight className="h-4 w-4" />
                                            </Link>
                                        </div>

                                        {booking.notes && (
                                            <div className="mt-4 rounded-xl bg-slate-50 p-4">
                                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                                    Your requirements
                                                </p>
                                                <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-600">
                                                    {booking.notes}
                                                </p>
                                            </div>
                                        )}

                                        {booking.status?.toLowerCase() ===
                                            "pending" && (
                                                <p className="mt-4 text-sm leading-6 text-amber-700">
                                                    Your request is awaiting review.
                                                    The team will check availability
                                                    before confirming.
                                                </p>
                                            )}
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>

                <div className="mt-8 flex items-center justify-between gap-4 rounded-2xl bg-indigo-50 p-5">
                    <div>
                        <h3 className="font-semibold text-slate-900">
                            Need another service?
                        </h3>
                        <p className="mt-1 text-sm text-slate-600">
                            Discover more services in your local area.
                        </p>
                    </div>

                    <Link to="/services">
                        <Button
                            variant="outline"
                            className="shrink-0 rounded-xl border-indigo-200 bg-white"
                        >
                            Browse
                        </Button>
                    </Link>
                </div>
            </section>
        </main>
    );
}

export default Bookings;
