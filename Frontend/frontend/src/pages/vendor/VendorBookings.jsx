
import { useEffect, useMemo, useState } from "react";
import {
    CalendarDays,
    Clock,
    MapPin,
    Phone,
    CheckCircle2,
    ClipboardList,
} from "lucide-react";

const BOOKINGS_KEY = "localSevaBookings";
const VENDORS_KEY = "localSevaVendors";
const CURRENT_VENDOR_KEY = "localSevaCurrentVendor";

function readStorage(key) {
    try {
        const value = JSON.parse(localStorage.getItem(key) || "[]");
        return Array.isArray(value) ? value : [];
    } catch {
        return [];
    }
}

export default function VendorBookings() {
    const [vendors, setVendors] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [selectedVendor, setSelectedVendor] = useState("");
    const [filter, setFilter] = useState("All");
    const [notice, setNotice] = useState("");

    useEffect(() => {
        const loadData = () => {
            const savedVendors = readStorage(VENDORS_KEY);
            setVendors(savedVendors);
            setBookings(readStorage(BOOKINGS_KEY));

            const savedName = localStorage.getItem(CURRENT_VENDOR_KEY);

            setSelectedVendor(
                savedVendors.some((v) => v.name === savedName && v.active)
                    ? savedName
                    : savedVendors.find((v) => v.active)?.name || ""
            );
        };

        loadData();

        window.addEventListener("localSevaBookingsUpdated", loadData);
        window.addEventListener("localSevaVendorsUpdated", loadData);
        window.addEventListener(
            "localSevaCurrentVendorUpdated",
            loadData
        );

        return () => {
            window.removeEventListener("localSevaBookingsUpdated", loadData);
            window.removeEventListener("localSevaVendorsUpdated", loadData);
            window.removeEventListener(
                "localSevaCurrentVendorUpdated",
                loadData
            );
        };
    }, []);

    const vendorBookings = useMemo(() => {
        return bookings
            .filter((booking) => booking.assignedVendor === selectedVendor)
            .filter((booking) => filter === "All" || booking.status === filter)
            .sort((a, b) =>
                `${a.date || ""} ${a.time || ""}`.localeCompare(
                    `${b.date || ""} ${b.time || ""}`
                )
            );
    }, [bookings, selectedVendor, filter]);

    const counts = useMemo(() => ({
        All: bookings.filter((b) => b.assignedVendor === selectedVendor).length,
        Pending: bookings.filter(
            (b) => b.assignedVendor === selectedVendor && b.status === "Pending"
        ).length,
        Confirmed: bookings.filter(
            (b) => b.assignedVendor === selectedVendor && b.status === "Confirmed"
        ).length,
        Completed: bookings.filter(
            (b) => b.assignedVendor === selectedVendor && b.status === "Completed"
        ).length,
        Rejected: bookings.filter(
            (b) => b.assignedVendor === selectedVendor && b.status === "Rejected"
        ).length,
    }), [bookings, selectedVendor]);

    function markCompleted(booking) {
        if (booking.status !== "Confirmed") return;

        const updated = bookings.map((item) =>
            item.id === booking.id
                ? {
                    ...item,
                    status: "Completed",
                    completedAt: new Date().toISOString(),
                }
                : item
        );

        localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updated));
        setBookings(updated);
        window.dispatchEvent(new Event("localSevaBookingsUpdated"));
        setNotice(`Booking ${booking.id} marked as completed.`);
    }

    const filters = ["All", "Pending", "Confirmed", "Completed", "Rejected"];

    return (
        <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl space-y-6">
                <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm font-medium text-orange-600">
                            LocalSeva Partner Portal
                        </p>
                        <h1 className="mt-1 text-3xl font-bold text-slate-900">
                            My Bookings
                        </h1>
                        <p className="mt-2 text-sm text-slate-600">
                            View and manage bookings assigned to your account.
                        </p>
                    </div>

                    <div className="min-w-56">
                        <label
                            htmlFor="vendor-select"
                            className="mb-1 block text-sm font-medium text-slate-700"
                        >
                            Demo vendor
                        </label>
                        <select
                            id="vendor-select"
                            value={selectedVendor}
                            onChange={(e) => {
                                const name = e.target.value;

                                setSelectedVendor(name);
                                localStorage.setItem(CURRENT_VENDOR_KEY, name);
                                window.dispatchEvent(
                                    new Event("localSevaCurrentVendorUpdated")
                                );

                                setFilter("All");
                                setNotice("");
                            }}
                            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
                        >
                            {vendors.filter((v) => v.active).length === 0 && (
                                <option value="">No active vendors</option>
                            )}
                            {vendors.filter((v) => v.active).map((vendor) => (
                                <option key={vendor.id} value={vendor.name}>
                                    {vendor.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </header>

                {notice && (
                    <div
                        role="status"
                        className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800"
                    >
                        {notice}
                    </div>
                )}

                <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                    {filters.map((status) => (
                        <button
                            key={status}
                            type="button"
                            onClick={() => setFilter(status)}
                            className={`rounded-xl border p-4 text-left transition ${filter === status
                                ? "border-orange-500 bg-orange-50"
                                : "border-slate-200 bg-white hover:border-slate-300"
                                }`}
                        >
                            <span className="block text-sm text-slate-600">
                                {status}
                            </span>
                            <span className="mt-1 block text-2xl font-bold text-slate-900">
                                {counts[status]}
                            </span>
                        </button>
                    ))}
                </section>

                <section className="space-y-4">
                    {vendorBookings.length === 0 ? (
                        <div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
                            <ClipboardList className="mx-auto h-10 w-10 text-slate-400" />
                            <h2 className="mt-3 font-semibold text-slate-900">
                                No {filter === "All" ? "" : filter.toLowerCase()} bookings
                            </h2>
                            <p className="mt-1 text-sm text-slate-600">
                                Bookings assigned to this vendor will appear here.
                            </p>
                        </div>
                    ) : (
                        vendorBookings.map((booking) => (
                            <article
                                key={booking.id}
                                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
                            >
                                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                    <div>
                                        <p className="text-xs font-medium text-slate-500">
                                            Booking ID: {booking.id}
                                        </p>
                                        <h2 className="mt-1 text-lg font-semibold text-slate-900">
                                            {booking.serviceTitle || "Service booking"}
                                        </h2>
                                        <p className="mt-1 text-sm text-slate-600">
                                            Customer: {booking.customerName || "Not provided"}
                                        </p>
                                    </div>

                                    <span className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${booking.status === "Confirmed"
                                        ? "bg-blue-100 text-blue-800"
                                        : booking.status === "Completed"
                                            ? "bg-green-100 text-green-800"
                                            : booking.status === "Rejected"
                                                ? "bg-red-100 text-red-800"
                                                : "bg-amber-100 text-amber-800"
                                        }`}>
                                        {booking.status || "Pending"}
                                    </span>
                                </div>

                                <div className="mt-5 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
                                    <p className="flex items-start gap-2">
                                        <CalendarDays className="mt-0.5 h-4 w-4 shrink-0" />
                                        {booking.date || "Date not provided"}
                                    </p>
                                    <p className="flex items-start gap-2">
                                        <Clock className="mt-0.5 h-4 w-4 shrink-0" />
                                        {booking.time || "Time not provided"}
                                    </p>
                                    <p className="flex items-start gap-2">
                                        <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                                        {[
                                            booking.location,
                                            booking.address,
                                        ].filter(Boolean).join(", ") || "Location not provided"}
                                    </p>
                                    <p className="flex items-start gap-2">
                                        <Phone className="mt-0.5 h-4 w-4 shrink-0" />
                                        {booking.phone || "Phone not provided"}
                                    </p>
                                </div>

                                {booking.notes && (
                                    <p className="mt-4 rounded-lg bg-slate-50 p-3 text-sm text-slate-600">
                                        <strong>Customer notes:</strong> {booking.notes}
                                    </p>
                                )}

                                <div className="mt-5 flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
                                    <div>
                                        <p className="text-xs text-slate-500">
                                            Final booking price
                                        </p>
                                        <p className="mt-1 text-xl font-bold text-slate-900">
                                            ₹{Number(
                                                booking.finalPrice ?? booking.priceValue ?? 0
                                            ).toLocaleString("en-IN")}
                                        </p>
                                    </div>

                                    {booking.status === "Confirmed" && (
                                        <button
                                            type="button"
                                            onClick={() => markCompleted(booking)}
                                            className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-700"
                                        >
                                            <CheckCircle2 className="h-4 w-4" />
                                            Mark as completed
                                        </button>
                                    )}
                                </div>
                            </article>
                        ))
                    )}
                </section>

                <p className="text-xs text-slate-500">
                    Prototype only: the vendor selector is for testing, not authentication.
                    Production access must be enforced by the backend.
                </p>
            </div>
        </main>
    );
}
