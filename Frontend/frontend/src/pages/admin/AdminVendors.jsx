
import { useEffect, useState } from "react";
import {
  Users,
  Plus,
  Search,
  Phone,
  MapPin,
  Pencil,
  Trash2,
  X,
  CheckCircle2,
  Wrench,
} from "lucide-react";

const STORAGE_KEY = "localSevaVendors";

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

const emptyForm = {
  name: "",
  phone: "",
  area: "",
  services: [],
};

const sampleVendors = [
  {
    id: "vendor-1",
    name: "LocalSeva Vendor 1",
    phone: "",
    area: "",
    services: ["DJ & Sound System"],
    active: true,
  },
  {
    id: "vendor-2",
    name: "LocalSeva Vendor 2",
    phone: "",
    area: "",
    services: ["Wedding Decoration", "Stage & Mandap Setup"],
    active: true,
  },
  {
    id: "vendor-3",
    name: "LocalSeva Vendor 3",
    phone: "",
    area: "",
    services: ["Electrical Services"],
    active: true,
  },
];

function readVendors() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved !== null) {
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed : [];
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleVendors));
    return sampleVendors;
  } catch {
    return [];
  }
}

function saveVendors(vendors) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(vendors));
  window.dispatchEvent(new Event("localSevaVendorsUpdated"));
}

export default function AdminVendors() {
  const [vendors, setVendors] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const refresh = () => setVendors(readVendors());

    refresh();
    window.addEventListener("storage", refresh);
    window.addEventListener("localSevaVendorsUpdated", refresh);

    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener("localSevaVendorsUpdated", refresh);
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

  function openAddForm() {
    setEditingId(null);
    setForm(emptyForm);
    setNotice("");
    setShowForm(true);
  }

  function openEditForm(vendor) {
    setEditingId(vendor.id);
    setForm({
      name: vendor.name || "",
      phone: vendor.phone || "",
      area: vendor.area || "",
      services: vendor.services || [],
    });
    setNotice("");
    setShowForm(true);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const phoneDigits = form.phone.replace(/\D/g, "");

    if (phoneDigits.length < 10 || phoneDigits.length > 15) {
      setNotice("Enter a valid contact number.");
      return;
    }

    if (form.services.length === 0) {
      setNotice("Select at least one service.");
      return;
    }

    let updated;

    if (editingId) {
      updated = vendors.map((vendor) =>
        vendor.id === editingId
          ? { ...vendor, ...form }
          : vendor
      );
      setNotice("Vendor details updated.");
    } else {
      const newVendor = {
        id: `vendor-${Date.now()}`,
        ...form,
        active: true,
        createdAt: new Date().toISOString(),
      };

      updated = [newVendor, ...vendors];
      setNotice("Vendor added successfully.");
    }

    saveVendors(updated);
    setVendors(updated);
    setShowForm(false);
    setForm(emptyForm);
    setEditingId(null);
  }

  function toggleActive(vendor) {
    const updated = vendors.map((item) =>
      item.id === vendor.id
        ? { ...item, active: !item.active }
        : item
    );

    saveVendors(updated);
    setVendors(updated);
    setNotice(
      `${vendor.name} ${vendor.active ? "deactivated" : "activated"}.`
    );
  }

  function deleteVendor(vendor) {
    const confirmed = window.confirm(
      `Delete ${vendor.name}? This removes the vendor from this prototype's vendor list.`
    );

    if (!confirmed) return;

    const updated = vendors.filter((item) => item.id !== vendor.id);
    saveVendors(updated);
    setVendors(updated);
    setNotice("Vendor deleted.");
  }

  const filteredVendors = vendors.filter((vendor) => {
    const searchable = [
      vendor.name,
      vendor.phone,
      vendor.area,
      ...(vendor.services || []),
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return searchable.includes(search.trim().toLowerCase());
  });

  const activeCount = vendors.filter((vendor) => vendor.active).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-medium text-indigo-600">
            Administration
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
            Manage Vendors
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Add service providers and manage their coverage areas.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddForm}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          <Plus size={18} />
          Add Vendor
        </button>
      </div>

      {notice && (
        <div
          role="status"
          className="flex items-center justify-between gap-3 rounded-xl border border-indigo-100 bg-indigo-50 px-4 py-3 text-sm text-indigo-800"
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

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Total Vendors</p>
            <Users size={20} className="text-indigo-600" />
          </div>
          <p className="mt-3 text-3xl font-bold">{vendors.length}</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Active Vendors</p>
            <CheckCircle2 size={20} className="text-emerald-600" />
          </div>
          <p className="mt-3 text-3xl font-bold">{activeCount}</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Inactive Vendors</p>
            <Wrench size={20} className="text-amber-600" />
          </div>
          <p className="mt-3 text-3xl font-bold">
            {vendors.length - activeCount}
          </p>
        </div>
      </div>

      <div className="relative max-w-md">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search by name, service, or area..."
          className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />
      </div>

      {showForm && (
        <div className="rounded-2xl border border-indigo-100 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold">
                {editingId ? "Edit Vendor" : "Add New Vendor"}
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Enter contact details and choose the services offered.
              </p>
            </div>

            <button
              type="button"
              aria-label="Close form"
              onClick={() => setShowForm(false)}
              className="rounded-lg p-2 hover:bg-slate-100"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="vendor-name"
                  className="mb-1.5 block text-sm font-semibold"
                >
                  Vendor name *
                </label>
                <input
                  id="vendor-name"
                  required
                  value={form.name}
                  onChange={(event) => updateField("name", event.target.value)}
                  placeholder="Enter full name or business name"
                  className="w-full rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label
                  htmlFor="vendor-phone"
                  className="mb-1.5 block text-sm font-semibold"
                >
                  Contact number *
                </label>
                <input
                  id="vendor-phone"
                  required
                  type="tel"
                  value={form.phone}
                  onChange={(event) => updateField("phone", event.target.value)}
                  placeholder="e.g. 9876543210"
                  className="w-full rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none focus:border-indigo-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="vendor-area"
                  className="mb-1.5 block text-sm font-semibold"
                >
                  Service area *
                </label>
                <input
                  id="vendor-area"
                  required
                  value={form.area}
                  onChange={(event) => updateField("area", event.target.value)}
                  placeholder="e.g. Gomti Nagar, Lucknow"
                  className="w-full rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none focus:border-indigo-500"
                />
                <p className="mt-1.5 text-xs text-slate-500">
                  Enter the areas or localities where this vendor works.
                </p>
              </div>
            </div>

            <fieldset>
              <legend className="mb-3 text-sm font-semibold">
                Services provided *
              </legend>

              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {serviceOptions.map((service) => (
                  <label
                    key={service}
                    className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 text-sm transition ${
                      form.services.includes(service)
                        ? "border-indigo-300 bg-indigo-50 text-indigo-800"
                        : "border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={form.services.includes(service)}
                      onChange={() => toggleService(service)}
                      className="h-4 w-4 accent-indigo-600"
                    />
                    {service}
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
              >
                {editingId ? "Save Changes" : "Add Vendor"}
              </button>
            </div>
          </form>
        </div>
      )}

      {filteredVendors.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center">
          <Users className="mx-auto text-slate-300" size={36} />
          <h3 className="mt-4 font-semibold">No vendors found</h3>
          <p className="mt-2 text-sm text-slate-500">
            Add a vendor or try a different search.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 xl:grid-cols-2">
          {filteredVendors.map((vendor) => (
            <article
              key={vendor.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-lg font-bold text-indigo-700">
                  {(vendor.name || "V").charAt(0).toUpperCase()}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-bold">{vendor.name}</h3>
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                        vendor.active
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {vendor.active ? "Active" : "Inactive"}
                    </span>
                  </div>

                  <p className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                    <Phone size={15} />
                    {vendor.phone || "No contact number"}
                  </p>

                  <p className="mt-1 flex items-start gap-2 text-sm text-slate-500">
                    <MapPin size={15} className="mt-0.5 shrink-0" />
                    {vendor.area || "Service area not set"}
                  </p>
                </div>
              </div>

              <div className="mt-4 border-t border-slate-100 pt-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Services
                </p>
                <div className="flex flex-wrap gap-2">
                  {(vendor.services || []).map((service) => (
                    <span
                      key={service}
                      className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs text-slate-600"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2 border-t border-slate-100 pt-4">
                <button
                  type="button"
                  onClick={() => openEditForm(vendor)}
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium hover:bg-slate-50"
                >
                  <Pencil size={15} /> Edit
                </button>

                <button
                  type="button"
                  onClick={() => toggleActive(vendor)}
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium hover:bg-slate-50"
                >
                  {vendor.active ? "Deactivate" : "Activate"}
                </button>

                <button
                  type="button"
                  onClick={() => deleteVendor(vendor)}
                  className="ml-auto inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                >
                  <Trash2 size={15} /> Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      <p className="text-xs leading-5 text-slate-400">
        Prototype only: vendor information is stored in this browser. Deactivating
        a vendor does not yet check their existing assignments or bookings.
      </p>
    </div>
  );
}
