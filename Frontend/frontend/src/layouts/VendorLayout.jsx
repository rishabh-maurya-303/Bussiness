
import { useEffect, useState } from "react";
import { NavLink, Outlet, Link } from "react-router-dom";
import {
    LayoutDashboard,
    CalendarCheck,
    UserRound,
    Store,
    ExternalLink,
    Menu,
    X,
} from "lucide-react";

const VENDORS_KEY = "localSevaVendors";
const CURRENT_VENDOR_KEY = "localSevaCurrentVendor";

function readVendors() {
    try {
        const saved = JSON.parse(localStorage.getItem(VENDORS_KEY) || "[]");
        return Array.isArray(saved) ? saved : [];
    } catch {
        return [];
    }
}

export default function VendorLayout() {
    const [vendors, setVendors] = useState([]);
    const [selectedVendor, setSelectedVendor] = useState("");
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        function loadVendors() {
            const list = readVendors().filter((vendor) => vendor.active);
            setVendors(list);

            const savedName = localStorage.getItem(CURRENT_VENDOR_KEY);
            const nextName = list.some((v) => v.name === savedName)
                ? savedName
                : list[0]?.name || "";

            setSelectedVendor(nextName);

            if (nextName) {
                localStorage.setItem(CURRENT_VENDOR_KEY, nextName);
            } else {
                localStorage.removeItem(CURRENT_VENDOR_KEY);
            }
        }

        loadVendors();
        window.addEventListener("localSevaVendorsUpdated", loadVendors);

        return () => {
            window.removeEventListener("localSevaVendorsUpdated", loadVendors);
        };
    }, []);

    function changeVendor(name) {
        setSelectedVendor(name);
        localStorage.setItem(CURRENT_VENDOR_KEY, name);
        window.dispatchEvent(new Event("localSevaCurrentVendorUpdated"));
        setMobileOpen(false);
    }

    const navItems = [
        { to: "/vendor", label: "Dashboard", icon: LayoutDashboard, end: true },
        { to: "/vendor/bookings", label: "My bookings", icon: CalendarCheck },
        { to: "/vendor/profile", label: "My profile", icon: UserRound },
    ];

    const navLinkClass = ({ isActive }) =>
        `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
            isActive
                ? "bg-orange-50 text-orange-700"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
        }`;

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            {mobileOpen && (
                <button
                    type="button"
                    aria-label="Close navigation"
                    onClick={() => setMobileOpen(false)}
                    className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden"
                />
            )}

            <aside
                className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform lg:translate-x-0 ${
                    mobileOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div className="flex h-16 items-center justify-between border-b border-slate-200 px-5">
                    <Link to="/vendor" className="flex items-center gap-2 font-bold">
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500 text-white">
                            <Store size={20} />
                        </span>
                        <span className="text-lg">LocalSeva <span className="text-orange-600">Partner</span></span>
                    </Link>

                    <button
                        type="button"
                        aria-label="Close menu"
                        onClick={() => setMobileOpen(false)}
                        className="rounded-lg p-2 hover:bg-slate-100 lg:hidden"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="border-b border-slate-200 p-4">
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Demo vendor account
                    </label>
                    <select
                        value={selectedVendor}
                        onChange={(event) => changeVendor(event.target.value)}
                        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
                    >
                        {vendors.length === 0 && (
                            <option value="">No active vendors</option>
                        )}
                        {vendors.map((vendor) => (
                            <option key={vendor.id} value={vendor.name}>
                                {vendor.name}
                            </option>
                        ))}
                    </select>
                    <p className="mt-2 text-xs text-slate-500">
                        Testing switcher only; login will be added with the backend.
                    </p>
                </div>

                <nav className="flex-1 space-y-1 p-3">
                    <p className="px-3 pb-2 pt-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Workspace
                    </p>
                    {navItems.map(({ to, label, icon: Icon, end }) => (
                        <NavLink
                            key={to}
                            to={to}
                            end={end}
                            className={navLinkClass}
                            onClick={() => setMobileOpen(false)}
                        >
                            <Icon size={19} />
                            {label}
                        </NavLink>
                    ))}
                </nav>

                <div className="border-t border-slate-200 p-3">
                    <Link
                        to="/"
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100"
                    >
                        <ExternalLink size={18} />
                        Back to website
                    </Link>
                </div>
            </aside>

            <div className="min-w-0 lg:pl-64">
                <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-6">
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            aria-label="Open navigation"
                            onClick={() => setMobileOpen(true)}
                            className="rounded-lg p-2 hover:bg-slate-100 lg:hidden"
                        >
                            <Menu size={21} />
                        </button>
                        <div>
                            <p className="text-sm font-semibold">Vendor Portal</p>
                            <p className="hidden text-xs text-slate-500 sm:block">
                                Manage your LocalSeva services
                            </p>
                        </div>
                    </div>

                    <div className="max-w-44 truncate rounded-full bg-orange-50 px-3 py-2 text-sm font-medium text-orange-800">
                        {selectedVendor || "No vendor selected"}
                    </div>
                </header>

                <Outlet />
            </div>
        </div>
    );
}
