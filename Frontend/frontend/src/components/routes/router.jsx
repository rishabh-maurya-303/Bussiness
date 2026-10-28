// PUBLIC PAGE
import PublicLayout from "@/layouts/PublicLayout";
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import ServiceDetails from "@/pages/ServiceDetails";
import { createBrowserRouter } from "react-router-dom";
import Booking from "@/pages/Booking";
import Bookings from "@/pages/Bookings";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";

// ADMIN
import AdminLayout from "@/layouts/AdminLayout";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminBookings from "@/pages/admin/AdminBookings";
import AdminVendors from "@/pages/admin/AdminVendors";

const router = createBrowserRouter([
    {
    element: <PublicLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/services", element: <Services /> },
      { path: "/services/:id", element: <ServiceDetails /> },
      { path: "/book", element: <Booking /> },
      { path: "/bookings", element: <Bookings /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
    ],
  },

  // Separate from PublicLayout
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "bookings", element: <AdminBookings /> },
      { path: "vendors", element: <AdminVendors /> },
    ],
  },
]);

export default router;