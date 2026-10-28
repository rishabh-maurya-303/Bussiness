import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  Clock,
  MapPin,
  ClipboardList,
  User,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

function formatDate(dateString) {
  if (!dateString) return "Date not specified";

  return new Date(`${dateString}T00:00:00`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function BookingDetails() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    try {
      const savedBookings = JSON.parse(
        localStorage.getItem("localSevaBookings") || "[]"
      );

      const found = savedBookings.find(
        (item) => String(item.id) === String(id)
      );

      if (found) {
        setBooking(found);
        setNotFound(false);
      } else {
        setNotFound(true);
      }
    } catch {
      setNotFound(true);
    }
  }, [id]);

  const status = booking?.status || "Pending";

  const statusStyles = {
    pending: "bg-amber-50 text-amber-700 border-amber-200",
    confirmed: "bg-green-50 text-green-700 border-green-200",
    completed: "bg-blue-50 text-blue-700 border-blue-200",
    rejected: "bg-red-50 text-red-700 border-red-200",
  };

  if (notFound) {
    return (
      <main className="min-h-screen bg-slate-50 px-5 py-16">
        <div className="mx-auto max-w-2xl rounded-2xl border bg-white p-8 text-center">
          <h1 className="text-2xl font-bold text-slate-900">
            Booking not found
          </h1>
          <p className="mt-3 text-slate-500">
            We couldn't find this booking in your saved requests.
          </p>
          <Link to="/bookings" className="mt-6 inline-block">
            <Button>Back to My Bookings</Button>
          </Link>
        </div>
      </main>
    );
  }

  if (!booking) {
    return (
      <main className="min-h-screen bg-slate-50 px-5 py-16 text-center">
        Loading booking details...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-5 py-10 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <Link
          to="/bookings"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-indigo-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to My Bookings
        </Link>

        <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 p-6 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
              Booking details
            </p>

            <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                  {booking.serviceTitle || "Service booking"}
                </h1>
                <p className="mt-2 text-sm text-slate-500">
                  Booking ID: {booking.id}
                </p>
              </div>

              <span
                className={`w-fit rounded-full border px-4 py-2 text-sm font-semibold ${
                  statusStyles[status.toLowerCase()] ||
                  statusStyles.pending
                }`}
              >
                {status}
              </span>
            </div>
          </div>

          <div className="grid gap-6 p-6 sm:grid-cols-2 sm:p-8">
            <div className="flex gap-3">
              <User className="mt-1 h-5 w-5 shrink-0 text-indigo-600" />
              <div>
                <p className="text-sm text-slate-400">Customer</p>
                <p className="mt-1 font-semibold text-slate-800">
                  {booking.customerName || "Not specified"}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <CalendarDays className="mt-1 h-5 w-5 shrink-0 text-indigo-600" />
              <div>
                <p className="text-sm text-slate-400">Preferred date</p>
                <p className="mt-1 font-semibold text-slate-800">
                  {formatDate(booking.date)}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Clock className="mt-1 h-5 w-5 shrink-0 text-indigo-600" />
              <div>
                <p className="text-sm text-slate-400">Preferred time</p>
                <p className="mt-1 font-semibold text-slate-800">
                  {booking.time || "Not specified"}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-indigo-600" />
              <div>
                <p className="text-sm text-slate-400">Service location</p>
                <p className="mt-1 font-semibold text-slate-800">
                  {booking.location || "Not specified"}
                </p>
                {booking.address && (
                  <p className="mt-1 text-sm text-slate-500">
                    {booking.address}
                  </p>
                )}
              </div>
            </div>

            <div className="flex gap-3">
              <ClipboardList className="mt-1 h-5 w-5 shrink-0 text-indigo-600" />
              <div>
                <p className="text-sm text-slate-400">Starting price</p>
                <p className="mt-1 font-semibold text-indigo-600">
                  {booking.price || "Not specified"}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-indigo-600" />
              <div>
                <p className="text-sm text-slate-400">Current status</p>
                <p className="mt-1 font-semibold capitalize text-slate-800">
                  {status}
                </p>
              </div>
            </div>
          </div>

          {booking.notes && (
            <div className="border-t border-slate-100 p-6 sm:p-8">
              <h2 className="font-bold text-slate-900">
                Your requirements
              </h2>
              <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-600">
                {booking.notes}
              </p>
            </div>
          )}

          <div className="border-t border-slate-100 bg-slate-50 p-6 sm:p-8">
            <h2 className="font-bold text-slate-900">Booking update</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {status.toLowerCase() === "pending"
                ? "Your request is awaiting review. The team will check availability before confirming."
                : status.toLowerCase() === "confirmed"
                ? "Your booking has been confirmed. Keep these details available for your service."
                : status.toLowerCase() === "completed"
                ? "This booking has been marked as completed."
                : status.toLowerCase() === "rejected"
                ? "This booking request was rejected. You can browse other services if needed."
                : "Check this page for the latest status of your booking."}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <Link to="/bookings">
            <Button variant="outline" className="rounded-xl">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to My Bookings
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}

export default BookingDetails;