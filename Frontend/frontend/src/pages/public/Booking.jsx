
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
    ArrowLeft,
    CalendarDays,
    CheckCircle2,
    Clock,
    MapPin,
    Send,
    UserRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { services } from "@/data/services";

function getLocalDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

function Booking() {
    const [searchParams] = useSearchParams();
    const serviceId = searchParams.get("service");

    const service = services.find(
        (item) => String(item.id) === String(serviceId)
    );

    const [form, setForm] = useState({
        customerName: "",
        phone: "",
        date: "",
        time: "",
        location: "",
        address: "",
        notes: "",
    });

    const [submittedBooking, setSubmittedBooking] = useState(null);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setForm((current) => ({
            ...current,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!service) return;

        const booking = {
            id: `LS-${Date.now()}`,
            serviceId: service.id,
            serviceTitle: service.title,
            price: service.price,
            ...form,
            status: "Pending",
            createdAt: new Date().toISOString(),
        };

        // Temporary frontend storage until the Django API is connected.
        try {
            const existingBookings = JSON.parse(
                localStorage.getItem("localSevaBookings") || "[]"
            );

            localStorage.setItem(
                "localSevaBookings",
                JSON.stringify([booking, ...existingBookings])
            );

            setSubmittedBooking(booking);
        } catch {
            alert(
                "Your request could not be saved in this browser. Please try again."
            );
        }
    };

    if (!service) {
        return (
            <main className="flex min-h-[70vh] items-center justify-center px-6">
                <div className="max-w-lg text-center">
                    <h1 className="text-3xl font-bold text-slate-900">
                        Select a service first
                    </h1>

                    <p className="mt-3 text-slate-500">
                        Please choose a service before submitting a booking
                        request.
                    </p>

                    <Link to="/services" className="mt-6 inline-block">
                        <Button className="rounded-xl bg-indigo-600 hover:bg-indigo-700">
                            Browse Services
                        </Button>
                    </Link>
                </div>
            </main>
        );
    }

    if (submittedBooking) {
        return (
            <main className="flex min-h-[70vh] items-center justify-center px-6 py-12">
                <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-12">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
                        <CheckCircle2 className="h-9 w-9 text-green-600" />
                    </div>

                    <p className="mt-6 text-sm font-semibold uppercase tracking-widest text-indigo-600">
                        Request submitted
                    </p>

                    <h1 className="mt-3 text-3xl font-bold text-slate-900">
                        Thank you, {submittedBooking.customerName}!
                    </h1>

                    <p className="mt-4 leading-7 text-slate-500">
                        Your request for {service.title} has been saved.
                        Our team needs to review availability before confirming
                        your booking.
                    </p>

                    <div className="mt-7 rounded-2xl bg-amber-50 p-4 text-left">
                        <p className="font-semibold text-amber-800">
                            Status: Pending
                        </p>
                        <p className="mt-1 text-sm text-amber-700">
                            Request ID: {submittedBooking.id}
                        </p>
                    </div>

                    <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
                        <Link to="/services">
                            <Button
                                variant="outline"
                                className="w-full rounded-xl"
                            >
                                Browse More Services
                            </Button>
                        </Link>

                        <Button
                            className="rounded-xl bg-indigo-600 hover:bg-indigo-700"
                            onClick={() => {
                                window.location.href = "/bookings";
                            }}
                        >
                            My Bookings
                        </Button>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-slate-50">
            {/* Page heading */}
            <section className="border-b border-slate-200 bg-white">
                <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
                    <Link
                        to={`/services/${service.id}`}
                        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-indigo-600"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Service
                    </Link>

                    <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        Request a Booking
                    </h1>

                    <p className="mt-3 max-w-2xl text-slate-500">
                        Tell us what you need. Our team will check availability
                        and contact you to confirm the details.
                    </p>
                </div>
            </section>

            <section className="mx-auto grid max-w-7xl gap-8 px-6 py-10 lg:grid-cols-[1fr_360px] lg:px-8">
                {/* Booking form */}
                <form
                    onSubmit={handleSubmit}
                    className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
                >
                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50">
                            <UserRound className="h-5 w-5 text-indigo-600" />
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-slate-900">
                                Your details
                            </h2>
                            <p className="text-sm text-slate-500">
                                How can we reach you?
                            </p>
                        </div>
                    </div>

                    <div className="mt-7 grid gap-5 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                            <label
                                htmlFor="customerName"
                                className="mb-2 block text-sm font-medium text-slate-700"
                            >
                                Full name *
                            </label>

                            <input
                                id="customerName"
                                name="customerName"
                                value={form.customerName}
                                onChange={handleChange}
                                required
                                autoComplete="name"
                                placeholder="Enter your full name"
                                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                            />
                        </div>

                        <div className="sm:col-span-2">
                            <label
                                htmlFor="phone"
                                className="mb-2 block text-sm font-medium text-slate-700"
                            >
                                Mobile number *
                            </label>

                            <input
                                id="phone"
                                name="phone"
                                type="tel"
                                value={form.phone}
                                onChange={handleChange}
                                required
                                autoComplete="tel"
                                inputMode="tel"
                                pattern="[0-9+\-\s()]{10,18}"
                                title="Enter a valid phone number"
                                placeholder="Enter your phone number"
                                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                            />
                        </div>
                    </div>

                    <div className="my-8 border-t border-slate-100" />

                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50">
                            <CalendarDays className="h-5 w-5 text-indigo-600" />
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-slate-900">
                                Event or service details
                            </h2>
                            <p className="text-sm text-slate-500">
                                When do you need this service?
                            </p>
                        </div>
                    </div>

                    <div className="mt-7 grid gap-5 sm:grid-cols-2">
                        <div>
                            <label
                                htmlFor="date"
                                className="mb-2 block text-sm font-medium text-slate-700"
                            >
                                Preferred date *
                            </label>

                            <input
                                id="date"
                                name="date"
                                type="date"
                                min={getLocalDate()}
                                value={form.date}
                                onChange={handleChange}
                                required
                                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="time"
                                className="mb-2 block text-sm font-medium text-slate-700"
                            >
                                Preferred time *
                            </label>

                            <input
                                id="time"
                                name="time"
                                type="time"
                                value={form.time}
                                onChange={handleChange}
                                required
                                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="location"
                                className="mb-2 block text-sm font-medium text-slate-700"
                            >
                                Village / area *
                            </label>

                            <input
                                id="location"
                                name="location"
                                value={form.location}
                                onChange={handleChange}
                                required
                                placeholder="Enter your village or area"
                                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="address"
                                className="mb-2 block text-sm font-medium text-slate-700"
                            >
                                Full address *
                            </label>

                            <input
                                id="address"
                                name="address"
                                value={form.address}
                                onChange={handleChange}
                                required
                                placeholder="Landmark or complete address"
                                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                            />
                        </div>

                        <div className="sm:col-span-2">
                            <label
                                htmlFor="notes"
                                className="mb-2 block text-sm font-medium text-slate-700"
                            >
                                Additional requirements
                            </label>

                            <textarea
                                id="notes"
                                name="notes"
                                value={form.notes}
                                onChange={handleChange}
                                rows={4}
                                placeholder="Tell us about your event, setup, measurements, or other requirements..."
                                className="w-full resize-y rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                            />
                        </div>
                    </div>

                    <div className="mt-7 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                        Submitting this form sends a booking request only.
                        Your booking will remain pending until our team checks
                        availability and confirms the details.
                    </div>

                    <Button
                        type="submit"
                        size="lg"
                        className="mt-6 h-12 w-full rounded-xl bg-indigo-600 hover:bg-indigo-700"
                    >
                        <Send className="mr-2 h-4 w-4" />
                        Submit Booking Request
                    </Button>
                </form>

                {/* Selected service summary */}
                <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h2 className="text-lg font-bold text-slate-900">
                        Your selected service
                    </h2>

                    <img
                        src={service.image}
                        alt={service.title}
                        className="mt-5 h-48 w-full rounded-2xl object-cover"
                    />

                    <span className="mt-5 inline-block rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-600">
                        {service.category}
                    </span>

                    <h3 className="mt-3 text-xl font-bold text-slate-900">
                        {service.title}
                    </h3>

                    <div className="mt-4 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
                        <span className="text-sm text-slate-500">
                            Starting price
                        </span>

                        <span className="text-xl font-bold text-indigo-600">
                            {service.price}
                        </span>
                    </div>

                    <div className="mt-4 space-y-3 text-sm text-slate-500">
                        <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-indigo-600" />
                            Subject to availability
                        </div>

                        <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-indigo-600" />
                            {service.location}
                        </div>
                    </div>

                    <p className="mt-5 text-xs leading-5 text-slate-400">
                        The displayed price is a starting estimate. Final
                        pricing depends on your requirements and will be
                        discussed before confirmation.
                    </p>
                </aside>
            </section>
        </main>
    );
}

export default Booking;
