// PUBLIC PAGE
import PublicLayout from "@/layouts/PublicLayout";
import Home from "@/pages/public/Home";
import Services from "@/pages/public/Services";
import ServiceDetails from "@/pages/public/ServiceDetails";
import { createBrowserRouter } from "react-router-dom";
import Booking from "@/pages/public/Booking";
import Bookings from "@/pages/public/Bookings";
import Login from "@/pages/public/Login";
import Signup from "@/pages/public/Signup";
import Contact from "@/pages/public/Contact";

// ADMIN
import AdminLayout from "@/layouts/AdminLayout";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminBookings from "@/pages/admin/AdminBookings";
import AdminVendors from "@/pages/admin/AdminVendors";

// Vendor
import VendorBookings from "@/pages/vendor/VendorBookings";
import VendorLayout from "@/layouts/VendorLayout";
import VendorDashboard from "@/pages/vendor/VendorDashboard";
import VendorProfile from "@/pages/vendor/VendorProfile";
import BookingDetails from "@/pages/public/BookingDetails";
import About from "@/pages/public/About";
import FAQ from "@/pages/public/FAQ";


const router = createBrowserRouter([

  // PublicLayout
  {
    element: <PublicLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/services", element: <Services /> },
      { path: "/services/:id", element: <ServiceDetails /> },
      { path: "/book", element: <Booking /> },
      { path: "/bookings", element: <Bookings /> },
      { path: "/bookings/:id", element: <BookingDetails /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/contact", element: <Contact /> },
      { path: "/about", element: <About /> },
      { path: "/faq", element: <FAQ /> },
    ],
  },

  // AdminLayout
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "bookings", element: <AdminBookings /> },
      { path: "vendors", element: <AdminVendors /> },

    ],
  },

  // Vendor portal
  {
    path: "/vendor",
    element: <VendorLayout />,
    children: [
      {
        index: true,
        element: <VendorDashboard />,
      },
      {
        path: "bookings",
        element: <VendorBookings />,
      },
      {
        path: "profile",
        element: <VendorProfile />,
      },
    ],
  },

]);

export default router;