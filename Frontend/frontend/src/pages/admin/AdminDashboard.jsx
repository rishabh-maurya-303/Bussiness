
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  CalendarDays,
  Clock3,
  CheckCircle2,
  XCircle,
  ArrowUpRight,
  ClipboardList,
} from "lucide-react";

const STORAGE_KEY = "localSevaBookings";

function readBookings() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function StatCard({ title, value, icon: Icon, color, description }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-3 text-3xl font-bold tracking-tight">{value}</p>
          <p className="mt-2 text-xs text-slate-500">{description}</p>
        </div>
        <div className={`rounded-xl p-3 ${color}`}>
          <Icon size={22} />
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    Pending: "bg-amber-50 text-amber-700",
    Confirmed: "bg-emerald-50 text-emerald-700",
    Completed: "bg-blue-50 text-blue-700",
    Rejected: "bg-red-50 text-red-700",
  };

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
        styles[status] || "bg-slate-100 text-slate-600"
      }`}
    >
      {status || "Pending"}
    </span>
  );
}

export default function AdminDashboard() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    setBookings(readBookings());
  }, []);

  const pending = bookings.filter((b) => b.status === "Pending").length;
  const confirmed = bookings.filter((b) => b.status === "Confirmed").length;
  const completed = bookings.filter((b) => b.status === "Completed").length;
  const rejected = bookings.filter((b) => b.status === "Rejected").length;

  const stats = [
    {
      title: "Total Bookings",
      value: bookings.length,
      icon: CalendarDays,
      color: "bg-indigo-50 text-indigo-600",
      description: "All service requests",
    },
    {
      title: "Pending Requests",
      value: pending,
      icon: Clock3,
      color: "bg-amber-50 text-amber-600",
      description: "Awaiting admin review",
    },
    {
      title: "Confirmed",
      value: confirmed,
      icon: CheckCircle2,
      color: "bg-emerald-50 text-emerald-600",
      description: "Approved bookings",
    },
    {
      title: "Rejected",
      value: rejected,
      icon: XCircle,
      color: "bg-red-50 text-red-600",
      description: `${completed} completed bookings`,
    },
  ];

  const recentBookings = [...bookings]
    .sort(
      (a, b) =>
        Number(b.createdAt || 0) - Number(a.createdAt || 0)
    )
    .slice(0, 5);

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-medium text-indigo-600">
            Overview
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
            Admin Dashboard
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Manage LocalSeva service requests and bookings.
          </p>
        </div>

        <Link
          to="/admin/bookings"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
        >
          <ClipboardList size={18} />
          Manage Bookings
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <h2 className="text-lg font-bold">Recent Bookings</h2>
            <p className="mt-1 text-sm text-slate-500">
              The latest service requests from customers
            </p>
          </div>

          <Link
            to="/admin/bookings"
            className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
          >
            View all <ArrowUpRight size={16} />
          </Link>
        </div>

        {recentBookings.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
              <CalendarDays size={26} />
            </div>
            <h3 className="mt-4 font-semibold">No bookings yet</h3>
            <p className="mt-2 text-sm text-slate-500">
              Customer requests will appear here when they submit a booking.
            </p>
          </div>
        ) : (
          <>
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Booking</th>
                    <th className="px-6 py-4 font-semibold">Customer</th>
                    <th className="px-6 py-4 font-semibold">Date</th>
                    <th className="px-6 py-4 font-semibold">Price</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentBookings.map((booking, index) => (
                    <tr
                      key={booking.id || index}
                      className="hover:bg-slate-50/70"
                    >
                      <td className="px-6 py-4">
                        <p className="font-semibold text-slate-900">
                          {booking.serviceTitle || "Service booking"}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {booking.id || "—"}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-medium">
                          {booking.customerName || "Customer"}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {booking.phone || "No phone provided"}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {booking.date || "Not set"}
                      </td>
                      <td className="px-6 py-4 font-medium">
                        {booking.price || "To be decided"}
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={booking.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="divide-y divide-slate-100 md:hidden">
              {recentBookings.map((booking, index) => (
                <div
                  key={booking.id || index}
                  className="space-y-3 p-5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold">
                        {booking.serviceTitle || "Service booking"}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {booking.customerName || "Customer"}
                      </p>
                    </div>
                    <StatusBadge status={booking.status} />
                  </div>
                  <div className="flex justify-between text-sm text-slate-500">
                    <span>{booking.date || "Date not set"}</span>
                    <span className="font-medium text-slate-900">
                      {booking.price || "Price pending"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </section>

      <p className="text-xs leading-5 text-slate-400">
        Prototype mode: dashboard data comes from this browser's local storage.
        It is not shared between customers or devices.
      </p>
    </div>
  );
}
