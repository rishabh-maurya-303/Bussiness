
import { useEffect, useState } from "react";
import { Save, UserRound, MapPin, Phone, Wrench } from "lucide-react";

const VENDORS_KEY = "localSevaVendors";
const CURRENT_VENDOR_KEY = "localSevaCurrentVendor";

const serviceOptions = [
    "DJ & Sound System",
    "Wedding Decoration",
    "Stage & Mandap Setup",
    "Tent & Event Setup",
    "Wedding Band",
    "Event Lighting",
    "Boutique & Tailoring",
    "Electrical Services",
];

function readVendors() {
    try {
        const data = JSON.parse(localStorage.getItem(VENDORS_KEY) || "[]");
        return Array.isArray(data) ? data : [];
    } catch {
        return [];
    }
}

export default function VendorProfile() {
    const [vendors, setVendors] = useState([]);
    const [vendorName, setVendorName] = useState("");
    const [form, setForm] = useState({
        name: "",
        phone: "",
        area: "",
        services: [],
    });
    const [notice, setNotice] = useState("");

    useEffect(() => {
        function load() {
            const list = readVendors();
            const currentName = localStorage.getItem(CURRENT_VENDOR_KEY) || "";
            const vendor = list.find((item) => item.name === currentName);

            setVendors(list);
            setVendorName(currentName);

            if (vendor) {
                setForm({
                    name: vendor.name || "",
                    phone: vendor.phone || "",
                    area: vendor.area || "",
                    services: vendor.services || [],
                });
            } else {
                setForm({ name: "", phone: "", area: "", services: [] });
            }
        }

        load();
        window.addEventListener("localSevaCurrentVendorUpdated", load);
        window.addEventListener("localSevaVendorsUpdated", load);

        return () => {
            window.removeEventListener("localSevaCurrentVendorUpdated", load);
            window.removeEventListener("localSevaVendorsUpdated", load);
        };
    }, []);

    function updateField(field, value) {
        setForm((current) => ({ ...current, [field]: value }));
    }

    function toggleService(service) {
        setForm((current) => ({
            ...current,
            services: current.services.includes(service)
                ? current.services.filter((item) => item !== service)
                : [...current.services, service],
        }));
    }

    function saveProfile(event) {
        event.preventDefault();

        const original = vendors.find((item) => item.name === vendorName);

        if (!original) {
            setNotice("No vendor is selected. Choose an existing vendor in the sidebar.");
            return;
        }

        if (!form.name.trim()) {
            setNotice("Please enter a vendor name.");
            return;
        }

        if (!form.phone.trim()) {
            setNotice("Please enter a contact phone number.");
            return;
        }

        if (!form.area.trim()) {
            setNotice("Please enter at least one service area.");
            return;
        }

        if (form.services.length === 0) {
            setNotice("Select at least one service.");
            return;
        }

        const duplicate = vendors.some(
            (item) =>
                item.id !== original.id &&
                item.name.trim().toLowerCase() === form.name.trim().toLowerCase()
        );

        if (duplicate) {
            setNotice("Another vendor already uses that name. Please choose a different name.");
            return;
        }

        const updated = vendors.map((item) =>
            item.id === original.id
                ? {
                    ...item,
                    name: form.name.trim(),
                    phone: form.phone.trim(),
                    area: form.area.trim(),
                    services: form.services,
                }
                : item
        );

        // Keep existing booking assignments consistent when the name changes.
        const oldName = original.name;
        const newName = form.name.trim();

        const bookings = (() => {
            try {
                const data = JSON.parse(localStorage.getItem("localSevaBookings") || "[]");
                return Array.isArray(data) ? data : [];
            } catch {
                return [];
            }
        })();

        if (oldName !== newName) {
            const updatedBookings = bookings.map((booking) =>
                booking.assignedVendor === oldName
                    ? { ...booking, assignedVendor: newName }
                    : booking
            );

            localStorage.setItem(
                "localSevaBookings",
                JSON.stringify(updatedBookings)
            );
            window.dispatchEvent(new Event("localSevaBookingsUpdated"));
            localStorage.setItem(CURRENT_VENDOR_KEY, newName);
            setVendorName(newName);
        }

        localStorage.setItem(VENDORS_KEY, JSON.stringify(updated));
        setVendors(updated);
        window.dispatchEvent(new Event("localSevaVendorsUpdated"));
        setNotice("Vendor profile saved successfully.");
    }

    if (!vendorName || !vendors.some((item) => item.name === vendorName)) {
        return (
            <main className="mx-auto max-w-3xl p-6 lg:p-8">
                <h1 className="text-2xl font-bold">My profile</h1>
                <p className="mt-3 text-sm text-slate-600">
                    Select an existing vendor in the portal sidebar. If no vendor exists yet,
                    create one from Admin → Vendors.
                </p>
            </main>
        );
    }

    return (
        <main className="mx-auto max-w-3xl space-y-6 p-4 sm:p-6 lg:p-8">
            <div>
                <p className="text-sm font-medium text-orange-600">Account settings</p>
                <h1 className="mt-1 text-3xl font-bold">My profile</h1>
                <p className="mt-2 text-sm text-slate-600">
                    Maintain your contact details and service coverage.
                </p>
            </div>

            {notice && (
                <div role="status" className="rounded-lg border border-slate-200 bg-white p-3 text-sm">
                    {notice}
                </div>
            )}

            <form onSubmit={saveProfile} className="space-y-6 rounded-xl border border-slate-200 bg-white p-5 sm:p-7">
                <div>
                    <label className="mb-2 flex items-center gap-2 text-sm font-medium">
                        <UserRound size={17} /> Vendor name
                    </label>
                    <input
                        value={form.name}
                        onChange={(e) => updateField("name", e.target.value)}
                        className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-orange-500"
                        required
                    />
                </div>

                <div>
                    <label className="mb-2 flex items-center gap-2 text-sm font-medium">
                        <Phone size={17} /> Contact phone
                    </label>
                    <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => updateField("phone", e.target.value)}
                        className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-orange-500"
                        required
                    />
                </div>

                <div>
                    <label className="mb-2 flex items-center gap-2 text-sm font-medium">
                        <MapPin size={17} /> Service area
                    </label>
                    <input
                        value={form.area}
                        onChange={(e) => updateField("area", e.target.value)}
                        placeholder="e.g. Gomti Nagar, Lucknow"
                        className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-orange-500"
                        required
                    />
                    <p className="mt-1 text-xs text-slate-500">
                        Separate multiple areas with commas.
                    </p>
                </div>

                <div>
                    <p className="mb-3 flex items-center gap-2 text-sm font-medium">
                        <Wrench size={17} /> Services you provide
                    </p>
                    <div className="grid gap-3 sm:grid-cols-2">
                        {serviceOptions.map((service) => (
                            <label key={service} className="flex items-start gap-3 rounded-lg border border-slate-200 p-3 text-sm">
                                <input
                                    type="checkbox"
                                    checked={form.services.includes(service)}
                                    onChange={() => toggleService(service)}
                                    className="mt-0.5 accent-orange-600"
                                />
                                <span>{service}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-orange-600 px-5 py-3 text-sm font-semibold text-white hover:bg-orange-700"
                >
                    <Save size={17} /> Save profile
                </button>
            </form>
        </main>
    );
}
