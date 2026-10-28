import {
  CalendarCheck,
  Home,
  Menu,
  UserRound,
  Info,
  LogIn,
} from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Home", to: "/", icon: Home, end: true },
  { label: "Services", to: "/services", icon: Menu },
  { label: "Bookings", to: "/bookings", icon: CalendarCheck },
  { label: "About", to: "/about", icon: Info },
  { label: "Profile", to: "/profile", icon: UserRound },
];

const Navbar = () => {
  return (
    <>
      {/* ================= DESKTOP NAVBAR ================= */}
      <header className="sticky top-0 z-50 hidden border-b border-slate-200 bg-white md:block">
        <div className="mx-auto flex h-[74px] max-w-7xl items-center px-6 lg:px-8">

          {/* Logo + Navigation */}
          <div className="flex items-center gap-10">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-sm font-bold text-white">
                LS
              </div>

              <span className="text-xl font-bold tracking-tight text-slate-900">
                Local<span className="text-indigo-600">Seva</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="flex items-center gap-7">

              {/* Home */}
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `relative py-2 text-sm font-medium transition-colors ${isActive
                    ? "text-indigo-600"
                    : "text-slate-500 hover:text-indigo-600"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    Home

                    <span
                      className={`absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-indigo-600 transition-all duration-200 ${isActive
                        ? "scale-x-100 opacity-100"
                        : "scale-x-0 opacity-0"
                        }`}
                    />
                  </>
                )}
              </NavLink>

              {/* Services */}
              <NavLink
                to="/services"
                className={({ isActive }) =>
                  `relative py-2 text-sm font-medium transition-colors ${isActive
                    ? "text-indigo-600"
                    : "text-slate-500 hover:text-indigo-600"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    Services

                    <span
                      className={`absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-indigo-600 transition-all duration-200 ${isActive
                        ? "scale-x-100 opacity-100"
                        : "scale-x-0 opacity-0"
                        }`}
                    />
                  </>
                )}
              </NavLink>

              {/* Elevated Bookings */}
              <NavLink
                to="/bookings"
                className={({ isActive }) =>
                  `group relative flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${isActive
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
                    : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
                  }`
                }
              >
                <CalendarCheck className="h-4 w-4 transition-transform group-hover:scale-110" />

                <span>Bookings</span>
              </NavLink>

              {/* About */}
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `relative py-2 text-sm font-medium transition-colors ${isActive
                    ? "text-indigo-600"
                    : "text-slate-500 hover:text-indigo-600"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    About

                    <span
                      className={`absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-indigo-600 transition-all duration-200 ${isActive
                        ? "scale-x-100 opacity-100"
                        : "scale-x-0 opacity-0"
                        }`}
                    />
                  </>
                )}
              </NavLink>

              {/* Contact */}
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `relative py-2 text-sm font-medium transition-colors ${isActive
                    ? "text-indigo-600"
                    : "text-slate-500 hover:text-indigo-600"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    Contact

                    <span
                      className={`absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-indigo-600 transition-all duration-200 ${isActive
                        ? "scale-x-100 opacity-100"
                        : "scale-x-0 opacity-0"
                        }`}
                    />
                  </>
                )}
              </NavLink>

              {/* FAQ */}
              <NavLink
                to="/faq"
                className={({ isActive }) =>
                  `relative py-2 text-sm font-medium transition-colors ${isActive
                    ? "text-indigo-600"
                    : "text-slate-500 hover:text-indigo-600"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    FAQ

                    <span
                      className={`absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-indigo-600 transition-all duration-200 ${isActive
                        ? "scale-x-100 opacity-100"
                        : "scale-x-0 opacity-0"
                        }`}
                    />
                  </>
                )}
              </NavLink>
            </nav>
          </div>

          {/* Right Side */}
          <div className="ml-auto flex items-center gap-3">

            {/* Login */}
            <Link to="/login">
              <Button
                variant="ghost"
                className="gap-2 text-sm font-medium text-slate-600 hover:bg-indigo-50 hover:text-indigo-600"
              >
                <LogIn className="h-4 w-4" />
                Login
              </Button>
            </Link>

            {/* Sign Up */}
            <Link to="/signup">
              <Button className="rounded-lg bg-indigo-600 px-5 hover:bg-indigo-700">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* ================= MOBILE TOP BAR ================= */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white md:hidden">
        <div className="flex h-[64px] items-center justify-between px-5">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-xs font-bold text-white">
              LS
            </div>

            <span className="text-lg font-bold tracking-tight text-slate-900">
              Local<span className="text-indigo-600">Seva</span>
            </span>
          </Link>

          {/* Login */}
          <Link to="/login" aria-label="Login">
            <Button
              variant="ghost"
              className="h-9 w-9 rounded-full p-0 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600"
            >
              <LogIn className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </header>

      {/* ================= MOBILE BOTTOM NAV ================= */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white/95 px-2 pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_20px_rgba(15,23,42,0.08)] backdrop-blur md:hidden">
        <div className="mx-auto flex h-[72px] max-w-md items-center justify-around">

          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className="flex h-full flex-1 items-center justify-center"
              >
                {({ isActive }) => {

                  const isBookings = item.to === "/bookings";

                  return (
                    <div
                      className={`relative flex flex-col items-center justify-center transition-all duration-200 ${isBookings
                        ? "-translate-y-3"
                        : ""
                        }`}
                    >

                      {/* Elevated Bookings Circle */}
                      <div
                        className={`flex items-center justify-center transition-all duration-200 ${isBookings
                          ? "h-14 w-14 rounded-full border-4 border-white bg-indigo-600 text-white shadow-xl shadow-indigo-200"
                          : `h-9 w-9 rounded-full ${isActive
                            ? "bg-indigo-50 text-indigo-600"
                            : "text-slate-400"
                          }`
                          }`}
                      >
                        <Icon
                          className={`transition-transform ${isBookings
                            ? "h-6 w-6"
                            : isActive
                              ? "h-5 w-5 scale-110"
                              : "h-5 w-5"
                            }`}
                        />
                      </div>

                      {/* Label */}
                      <span
                        className={`mt-1 text-[11px] ${isBookings
                          ? "font-semibold text-indigo-600"
                          : isActive
                            ? "font-semibold text-indigo-600"
                            : "font-medium text-slate-400"
                          }`}
                      >
                        {item.label}
                      </span>

                      {/* Active dot for normal items */}
                      {isActive && !isBookings && (
                        <span className="absolute -bottom-1 h-1 w-1 rounded-full bg-indigo-600" />
                      )}
                    </div>
                  );
                }}
              </NavLink>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default Navbar;