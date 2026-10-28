
import { useEffect, useMemo, useState } from "react";
import {
    Search,
    CalendarDays,
    MapPin,
    Phone,
    CheckCircle2,
    XCircle,
    Clock3,
    IndianRupee,
    UserRound,
    ChevronDown,
    RefreshCw,
} from "lucide-react";

const STORAGE_KEY = "localSevaBookings";


const VENDORS_STORAGE_KEY = "localSevaVendors";

function readVendors() {
    try {
        const saved = localStorage.getItem(VENDORS_STORAGE_KEY);

        if (saved !== null) {
            const parsed = JSON.parse(saved);
            return Array.isArray(parsed) ? parsed : [];
        }

        return [
            {
                id: "vendor-1",
                name: "LocalSeva Vendor 1",
                services: ["DJ & Sound System"],
                active: true,
            },
            {
                id: "vendor-2",
                name: "LocalSeva Vendor 2",
                services: ["Wedding Decoration", "Stage & Mandap Setup"],
                active: true,
            },
            {
                id: "vendor-3",
                name: "LocalSeva Vendor 3",
                services: ["Electrical Services"],
                active: true,
            },
        ];
    } catch {
        return [];
    }
}


const vendors = [
    { id: "vendor-1", name: "LocalSeva Vendor 1" },
    { id: "vendor-2", name: "LocalSeva Vendor 2" },
    { id: "vendor-3", name: "LocalSeva Vendor 3" },
];

const filters = [
    "All",
    "Pending",
    "Confirmed",
    "Completed",
    "Rejected",
];

function readBookings() {
    try {
        const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
        return Array.isArray(data) ? data : [];
    } catch {
        return [];
    }
}

function saveBookings(bookings) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
    window.dispatchEvent(new Event("localSevaBookingsUpdated"));
}

function StatusBadge({ status }) {
    const styles = {
        Pending: "bg-amber-50 text-amber-700 ring-amber-200",
        Confirmed: "bg-emerald-50 text-emerald-700 ring-emerald-200",
        Completed: "bg-blue-50 text-blue-700 ring-blue-200",
        Rejected: "bg-red-50 text-red-700 ring-red-200",
    };

    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${styles[status] || "bg-slate-100 text-slate-600 ring-slate-200"
                }`}
        >
            {status === "Pending" && <Clock3 size={13} />}
            {status === "Confirmed" && <CheckCircle2 size={13} />}
            {status === "Rejected" && <XCircle size={13} />}
            {status || "Pending"}
        </span>
    );
}

function formatPrice(value) {
    if (value === "" || value == null) return "Not set";

    const number = Number(String(value).replace(/[₹,\s]/g, ""));
    if (!Number.isFinite(number)) return String(value);

    return `₹${number.toLocaleString("en-IN")}`;
}

function getInitialPrice(booking) {
    if (booking.finalPrice != null && booking.finalPrice !== "") {
        return String(booking.finalPrice).replace(/[₹,\s]/g, "");
    }

    if (booking.price != null) {
        return String(booking.price).replace(/[₹,\s]/g, "");
    }

    return "";
}

export default function AdminBookings() {
    const [bookings, setBookings] = useState([]);
    const [activeFilter, setActiveFilter] = useState("All");
    const [search, setSearch] = useState("");
    const [expandedId, setExpandedId] = useState(null);
    const [editing, setEditing] = useState({});
    const [notice, setNotice] = useState("");
    const [vendors, setVendors] = useState([]);

    useEffect(() => {
        const refresh = () => {
            setBookings(readBookings());
            setVendors(readVendors());
        };

        refresh();
        window.addEventListener("storage", refresh);
        window.addEventListener("localSevaBookingsUpdated", refresh);
        window.addEventListener("localSevaVendorsUpdated", refresh);

        return () => {
            window.removeEventListener("storage", refresh);
            window.removeEventListener("localSevaBookingsUpdated", refresh);
            window.removeEventListener("localSevaVendorsUpdated", refresh);
        };
    }, []);

    const counts = useMemo(() => {
        return {
            All: bookings.length,
            Pending: bookings.filter((b) => b.status === "Pending").length,
            Confirmed: bookings.filter((b) => b.status === "Confirmed").length,
            Completed: bookings.filter((b) => b.status === "Completed").length,
            Rejected: bookings.filter((b) => b.status === "Rejected").length,
        };
    }, [bookings]);

    const filteredBookings = useMemo(() => {
        const term = search.trim().toLowerCase();

        return bookings.filter((booking) => {
            const matchesStatus =
                activeFilter === "All" || (booking.status || "Pending") === activeFilter;

            const searchable = [
                booking.id,
                booking.serviceTitle,
                booking.customerName,
                booking.phone,
                booking.location,
                booking.address,
            ]
                .filter(Boolean)
                .join(" ")
                .toLowerCase();

            return matchesStatus && (!term || searchable.includes(term));
        });
    }, [bookings, activeFilter, search]);

    function updateBooking(id, changes) {
        const updated = bookings.map((booking) =>
            booking.id === id ? { ...booking, ...changes } : booking
        );

        saveBookings(updated);
        setBookings(updated);
    }

    function updateDraft(id, field, value) {
        setEditing((current) => ({
            ...current,
            [id]: {
                ...(current[id] || {}),
                [field]: value,
            },
        }));
    }


    function approveBooking(booking) {
        const draft = editing[booking.id] || {};
        const price = draft.finalPrice ?? getInitialPrice(booking);
        const vendorName =
            draft.assignedVendor ?? booking.assignedVendor ?? "";

        if (!vendorName) {
            setNotice(
                `Select a vendor for ${booking.serviceTitle || "this booking"} first.`
            );
            setExpandedId(booking.id);
            return;
        }

        if (
            price === "" ||
            !Number.isFinite(Number(price)) ||
            Number(price) < 0
        ) {
            setNotice("Enter a valid final price before confirming this booking.");
            setExpandedId(booking.id);
            return;
        }

        // Find the selected active vendor.
        const vendor = vendors.find(
            (item) => item.name === vendorName && item.active
        );

        if (!vendor) {
            setNotice("The selected vendor is unavailable or inactive.");
            setExpandedId(booking.id);
            return;
        }

        // Check that this vendor provides the requested service.
        if (!vendorSupportsBooking(vendor, booking)) {
            setNotice(
                `${vendor.name} does not provide ${booking.serviceTitle || "this service"}.`
            );
            setExpandedId(booking.id);
            return;
        }

        // Check that the customer's location is within the vendor's service area.
        if (!vendorCoversBooking(vendor, booking)) {
            setNotice(
                `The customer's location does not match ${vendor.name}'s service area.`
            );
            setExpandedId(booking.id);
            return;
        }

        // Prevent the same vendor from having two confirmed bookings
        // at the same date and exact time.
        const conflict = getBookingConflict(bookings, booking, vendor);

        if (conflict) {
            setNotice(
                `${vendor.name} already has a confirmed booking on ` +
                `${conflict.date} at ${conflict.time}. Please choose another vendor or time.`
            );
            setExpandedId(booking.id);
            return;
        }

        updateBooking(booking.id, {
            status: "Confirmed",
            finalPrice: Number(price),
            assignedVendor: vendor.name,
            reviewedAt: new Date().toISOString(),
        });

        setNotice("Booking confirmed and vendor assigned.");

        setEditing((current) => {
            const next = { ...current };
            delete next[booking.id];
            return next;
        });
    }


    function rejectBooking(booking) {
        const confirmed = window.confirm(
            `Reject the booking for ${booking.serviceTitle || "this service"}?`
        );

        if (!confirmed) return;

        updateBooking(booking.id, {
            status: "Rejected",
            reviewedAt: new Date().toISOString(),
        });

        setNotice("Booking rejected.");
    }

    function saveBookingDetails(booking) {
        const draft = editing[booking.id] || {};
        const price = draft.finalPrice ?? getInitialPrice(booking);
        const vendor = draft.assignedVendor ?? booking.assignedVendor ?? "";

        if (price !== "" && (!Number.isFinite(Number(price)) || Number(price) < 0)) {
            setNotice("Enter a valid price.");
            return;
        }

        updateBooking(booking.id, {
            ...(price !== "" ? { finalPrice: Number(price) } : {}),
            assignedVendor: vendor,
        });

        setEditing((current) => {
            const next = { ...current };
            delete next[booking.id];
            return next;
        });

        setNotice("Booking details saved.");
    }



    function normalizeText(value = "") {
        return String(value).trim().toLowerCase().replace(/\s+/g, " ");
    }

    function getServiceGroup(serviceName = "") {
        const name = normalizeText(serviceName);

        if (name.includes("electrical") || name.includes("electric") ||
            name.includes("wiring") || name.includes("repair")) {
            return "electrical";
        }

        if (name.includes("boutique") || name.includes("tailor") ||
            name.includes("stitch") || name.includes("alteration")) {
            return "tailoring";
        }

        if (name.includes("lighting") || name.includes("light")) {
            return "lighting";
        }

        if (name.includes("tent") || name.includes("event setup")) {
            return "tent";
        }

        if (name.includes("stage") || name.includes("mandap")) {
            return "stage";
        }

        if (name.includes("decoration") || name.includes("decor")) {
            return "decoration";
        }

        if (name.includes("band")) {
            return "band";
        }

        if (name.includes("dj") || name.includes("sound")) {
            return "dj";
        }

        return null;
    }

    function vendorSupportsBooking(vendor, booking) {
        const bookingGroup = getServiceGroup(booking.serviceTitle);

        if (!bookingGroup) return false;

        return (vendor.services || []).some(
            (service) => getServiceGroup(service) === bookingGroup
        );
    }

    function vendorCoversBooking(vendor, booking) {
        if (!vendor.area?.trim()) return false;

        const customerAddress = normalizeText(
            `${booking.location || ""} ${booking.address || ""}`
        );

        if (!customerAddress) return false;

        // Vendor areas can be entered as: "Gomti Nagar, Lucknow"
        const areas = vendor.area
            .split(",")
            .map(normalizeText)
            .filter((area) => area.length >= 3);

        return areas.some((area) => customerAddress.includes(area));
    }

    function getBookingConflict(bookings, booking, vendor) {
        return bookings.find((other) =>
            other.id !== booking.id &&
            other.status === "Confirmed" &&
            other.assignedVendor === vendor.name &&
            other.date === booking.date &&
            other.time === booking.time
        );
    }


    return (
        <div className="space-y-6">
            <div>
                <p className="text-sm font-medium text-indigo-600">Administration</p>
                <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
                    Manage Bookings
                </h1>
                <p className="mt-2 text-sm text-slate-500">
                    Review requests, set final prices, and assign service vendors.
                </p>
            </div>

            {notice && (
                <div
                    role="status"
                    className="flex items-start justify-between gap-3 rounded-xl border border-indigo-100 bg-indigo-50 px-4 py-3 text-sm text-indigo-800"
                >
                    <span>{notice}</span>
                    <button
                        type="button"
                        aria-label="Dismiss message"
                        onClick={() => setNotice("")}
                        className="font-semibold"
                    >
                        ×
                    </button>
                </div>
            )}

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                {filters.map((filter) => (
                    <button
                        key={filter}
                        type="button"
                        onClick={() => setActiveFilter(filter)}
                        className={`rounded-xl border p-4 text-left transition ${activeFilter === filter
                            ? "border-indigo-600 bg-indigo-50 ring-1 ring-indigo-600"
                            : "border-slate-200 bg-white hover:border-slate-300"
                            }`}
                    >
                        <p className="text-sm text-slate-500">{filter}</p>
                        <p className="mt-2 text-2xl font-bold">{counts[filter]}</p>
                    </button>
                ))}
            </div>

            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="flex flex-col gap-4 border-b border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
                    <div>
                        <h2 className="font-bold">Booking Requests</h2>
                        <p className="mt-1 text-sm text-slate-500">
                            {filteredBookings.length} request
                            {filteredBookings.length === 1 ? "" : "s"} found
                        </p>
                    </div>

                    <div className="relative w-full sm:max-w-xs">
                        <Search
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                        <input
                            type="search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search customer or service..."
                            className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                        />
                    </div>
                </div>

                {filteredBookings.length === 0 ? (
                    <div className="px-6 py-16 text-center">
                        <CalendarDays className="mx-auto text-slate-300" size={36} />
                        <h3 className="mt-4 font-semibold">No bookings found</h3>
                        <p className="mt-2 text-sm text-slate-500">
                            Try another filter, or submit a booking from the customer website.
                        </p>
                        <button
                            type="button"
                            onClick={() => {
                                setActiveFilter("All");
                                setSearch("");
                                setBookings(readBookings());
                            }}
                            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600"
                        >
                            <RefreshCw size={15} /> Reset filters
                        </button>
                    </div>
                ) : (
                    <div className="divide-y divide-slate-100">
                        {filteredBookings.map((booking, index) => {
                            const id = booking.id ?? `booking-${index}`;
                            const isExpanded = expandedId === id;
                            const draft = editing[id] || {};
                            const currentVendor =
                                draft.assignedVendor ?? booking.assignedVendor ?? "";
                            const currentPrice =
                                draft.finalPrice ?? getInitialPrice(booking);
                            const status = booking.status || "Pending";

                            return (
                                <article key={id} className="p-4 sm:p-5">
                                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                                        <div className="min-w-0 flex-1">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <h3 className="font-semibold">
                                                    {booking.serviceTitle || "Service booking"}
                                                </h3>
                                                <StatusBadge status={status} />
                                            </div>

                                            <p className="mt-1 break-all text-xs text-slate-400">
                                                Request ID: {booking.id || "Not available"}
                                            </p>

                                            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500">
                                                <span className="inline-flex items-center gap-1.5">
                                                    <UserRound size={15} />
                                                    {booking.customerName || "Customer"}
                                                </span>
                                                <span className="inline-flex items-center gap-1.5">
                                                    <CalendarDays size={15} />
                                                    {booking.date || "Date not set"}
                                                </span>
                                                <span className="inline-flex items-center gap-1.5">
                                                    <IndianRupee size={15} />
                                                    {formatPrice(booking.finalPrice ?? booking.price)}
                                                </span>
                                            </div>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setExpandedId(isExpanded ? null : id)
                                            }
                                            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold hover:bg-slate-50"
                                        >
                                            {isExpanded ? "Hide details" : "Review booking"}
                                            <ChevronDown
                                                size={16}
                                                className={`transition ${isExpanded ? "rotate-180" : ""}`}
                                            />
                                        </button>
                                    </div>

                                    {isExpanded && (
                                        <div className="mt-5 rounded-xl bg-slate-50 p-4 sm:p-5">
                                            <div className="grid gap-5 md:grid-cols-2">
                                                <div className="space-y-3">
                                                    <h4 className="text-sm font-bold">Customer details</h4>

                                                    <p className="flex items-start gap-2 text-sm text-slate-600">
                                                        <Phone size={16} className="mt-0.5 shrink-0" />
                                                        {booking.phone || "Phone not provided"}
                                                    </p>

                                                    <p className="flex items-start gap-2 text-sm text-slate-600">
                                                        <MapPin size={16} className="mt-0.5 shrink-0" />
                                                        {booking.address || booking.location || "Address not provided"}
                                                    </p>

                                                    <p className="text-sm text-slate-600">
                                                        <span className="font-medium">Time:</span>{" "}
                                                        {booking.time || "Not specified"}
                                                    </p>

                                                    {booking.notes && (
                                                        <p className="text-sm text-slate-600">
                                                            <span className="font-medium">Notes:</span>{" "}
                                                            {booking.notes}
                                                        </p>
                                                    )}
                                                </div>

                                                <div className="space-y-4">
                                                    <div>
                                                        <label
                                                            htmlFor={`price-${index}`}
                                                            className="mb-1.5 block text-sm font-semibold"
                                                        >
                                                            Final price (₹)
                                                        </label>
                                                        <input
                                                            id={`price-${index}`}
                                                            type="number"
                                                            min="0"
                                                            step="1"
                                                            value={currentPrice}
                                                            onChange={(e) =>
                                                                updateDraft(id, "finalPrice", e.target.value)
                                                            }
                                                            placeholder="Enter final price"
                                                            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                                        />
                                                    </div>

                                                    <div>
                                                        <label
                                                            htmlFor={`vendor-${index}`}
                                                            className="mb-1.5 block text-sm font-semibold"
                                                        >
                                                            Assign vendor
                                                        </label>
                                                        <select
                                                            id={`vendor-${index}`}
                                                            value={currentVendor}
                                                            onChange={(e) =>
                                                                updateDraft(id, "assignedVendor", e.target.value)
                                                            }
                                                            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                                        >
                                                            <option value="">Select a vendor</option>
                                                            {vendors
                                                                .filter((vendor) => vendor.active)
                                                                .map((vendor) => (
                                                                    <option key={vendor.id} value={vendor.name}>
                                                                        {vendor.name} — {(vendor.services || []).join(", ")}
                                                                    </option>
                                                                ))}
                                                        </select>
                                                    </div>

                                                    <button
                                                        type="button"
                                                        onClick={() => saveBookingDetails(booking)}
                                                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold hover:bg-slate-100"
                                                    >
                                                        Save details
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="mt-5 flex flex-col gap-3 border-t border-slate-200 pt-4 sm:flex-row">
                                                {status === "Pending" ? (
                                                    <>
                                                        <button
                                                            type="button"
                                                            onClick={() => approveBooking(booking)}
                                                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
                                                        >
                                                            <CheckCircle2 size={17} />
                                                            Approve & Confirm
                                                        </button>

                                                        <button
                                                            type="button"
                                                            onClick={() => rejectBooking(booking)}
                                                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-3 text-sm font-semibold text-red-600 hover:bg-red-50"
                                                        >
                                                            <XCircle size={17} />
                                                            Reject Request
                                                        </button>
                                                    </>
                                                ) : (
                                                    <p className="text-sm text-slate-500">
                                                        This booking is {status.toLowerCase()}. You can still
                                                        edit and save its price or vendor assignment.
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </article>
                            );
                        })}
                    </div>
                )}
            </section>

            <p className="text-xs leading-5 text-slate-400">
                Prototype only: vendors are sample entries, and booking updates are stored
                in this browser. Vendor availability and scheduling conflicts are not
                checked yet. Add server-side authorization before using real bookings.
            </p>
        </div>
    );
}
