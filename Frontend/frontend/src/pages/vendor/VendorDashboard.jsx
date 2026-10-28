
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    CalendarCheck,
    Clock,
    CheckCircle2,
    ArrowRight,
    ClipboardList,
} from "lucide-react";

const BOOKINGS_KEY = "localSevaBookings";
const CURRENT_VENDOR_KEY = "localSevaCurrentVendor";

function readArray(key) {
    try {
        const data = JSON.parse(localStorage.getItem(key) || "[]");
        return Array.isArray(data) ? data : [];
    } catch {
        return [];
    }
}

export default function VendorDashboard() {
    const [vendorName, setVendorName] = useState("");
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        function load() {
            setVendorName(localStorage.getItem(CURRENT_VENDOR_KEY) || "");
            setBookings(readArray(BOOKINGS_KEY));
        }

        load();
        window.addEventListener("localSevaBookingsUpdated", load);
        window.addEventListener("localSevaCurrentVendorUpdated", load);

        return () => {
            window.removeEventListener("localSevaBookingsUpdated", load);
            window.removeEventListener("localSevaCurrentVendorUpdated", load);
        };
    }, []);

    const mine = bookings.filter((b) => b.assignedVendor === vendorName);
    const pending = mine.filter((b) => b.status === "Pending");
    const confirmed = mine.filter((b) => b.status === "Confirmed");
    const completed = mine.filter((b) => b.status === "Completed");

    const stats = [
        { label: "Assigned bookings", value: mine.length, icon: ClipboardList },
        { label: "Pending", value: pending.length, icon: Clock },
        { label: "Confirmed", value: confirmed.length, icon: CalendarCheck },
        { label: "Completed", value: completed.length, icon: CheckCircle2 },
    ];

    const recent = [...mine]
        .sort((a, b) =>
            `${b.createdAt || b.date || ""}`.localeCompare(
                `${a.createdAt || a.date || ""}`
            )
        )
        .slice(0, 5);

    return (
        <main className="mx-auto max-w-7xl space-y-7 p-4 sm:p-6 lg:p-8">
            <div>
                <p className="text-sm font-medium text-orange-600">Overview</p>
                <h1 className="mt-1 text-3xl font-bold">
                    Welcome{vendorName ? `, ${vendorName}` : ""}
                </h1>
                <p className="mt-2 text-sm text-slate-600">
                    Here is an overview of your assigned service bookings.
                </p>
            </div>

            {!vendorName && (
                <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                    No active vendor is selected. Add and activate a vendor from the admin portal first.
                </div>
            )}

            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map(({ label, value, icon: Icon }) => (
                    <div
                        key={label}
                        className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
                    >
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-slate-600">{label}</p>
                            <span className="rounded-lg bg-orange-50 p-2 text-orange-700">
                                <Icon size={20} />
                            </span>
                        </div>
                        <p className="mt-4 text-3xl font-bold">{value}</p>
                    </div>
                ))}
            </section>

            <section className="rounded-xl border border-slate-200 bg-white">
                <div className="flex flex-col gap-3 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="text-lg font-semibold">Recent bookings</h2>
                        <p className="mt-1 text-sm text-slate-500">
                            The latest bookings assigned to this vendor.
                        </p>
                    </div>
                    <Link
                        to="/vendor/bookings"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-orange-700 hover:text-orange-800"
                    >
                        View all <ArrowRight size={16} />
                    </Link>
                </div>

                {recent.length === 0 ? (
                    <div className="p-10 text-center">
                        <ClipboardList className="mx-auto h-9 w-9 text-slate-400" />
                        <p className="mt-3 font-medium">No bookings yet</p>
                        <p className="mt-1 text-sm text-slate-500">
                            Once the admin assigns you a booking, it will appear here.
                        </p>
                    </div>
                ) : (
                    <div className="divide-y divide-slate-100">
                        {recent.map((booking) => (
                            <div
                                key={booking.id}
                                className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between"
                            >
                                <div>
                                    <p className="text-xs text-slate-500">
                                        {booking.id}
                                    </p>
                                    <p className="mt-1 font-semibold">
                                        {booking.serviceTitle || "Service booking"}
                                    </p>
                                    <p className="mt-1 text-sm text-slate-500">
                                        {booking.customerName || "Customer"} · {booking.date || "Date pending"}
                                    </p>
                                </div>
                                <span className="w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                                    {booking.status || "Pending"}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            <div className="rounded-xl border border-orange-100 bg-orange-50 p-5">
                <h2 className="font-semibold text-slate-900">Keep your profile up to date</h2>
                <p className="mt-1 text-sm text-slate-600">
                    Accurate contact details, services and coverage areas help the admin assign suitable jobs.
                </p>
                <Link
                    to="/vendor/profile"
                    className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-orange-700"
                >
                    Manage profile <ArrowRight size={16} />
                </Link>
            </div>
        </main>
    );
}
