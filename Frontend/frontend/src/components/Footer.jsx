import {
    MessageCircle,
    Phone,
    MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="border-t border-slate-200 bg-white">

            {/* Main Footer */}
            <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">

                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

                    {/* Brand */}
                    <div className="lg:col-span-2">

                        <div className="flex items-center gap-2">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-sm font-bold text-white">
                                LS
                            </div>

                            <span className="text-lg font-bold tracking-tight text-slate-900">
                                Local<span className="text-indigo-600">Seva</span>
                            </span>
                        </div>

                        <p className="mt-4 max-w-md text-sm leading-6 text-slate-500">
                            Your trusted local service partner for weddings, events,
                            boutique tailoring, electrical work and more.
                        </p>

                        {/* Contact */}
                        <div className="mt-6 space-y-3">

                            <div className="flex items-center gap-3 text-sm text-slate-500">
                                <MapPin className="h-4 w-4 text-indigo-600" />
                                <span>Your Local Area</span>
                            </div>

                            <div className="flex items-center gap-3 text-sm text-slate-500">
                                <Phone className="h-4 w-4 text-indigo-600" />
                                <span>+91 XXXXX XXXXX</span>
                            </div>

                        </div>

                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-slate-900">
                            Quick Links
                        </h3>

                        <ul className="mt-5 space-y-3 text-sm">
                            <li>
                                <Link to="/home"
                                    className="text-slate-500 transition hover:text-indigo-600"
                                >
                                    Home
                                </Link>
                            </li>

                            <li>
                                <Link to="/services"
                                    className="text-slate-500 transition hover:text-indigo-600"
                                >
                                    Services
                                </Link>
                            </li>

                            <li>
                                <Link to="/bookings"
                                    className="text-slate-500 transition hover:text-indigo-600"
                                >
                                    My Bookings
                                </Link>
                            </li>

                            <li>
                                <Link to="/about"
                                    className="text-slate-500 transition hover:text-indigo-600"
                                >
                                    About Us
                                </Link>
                            </li>

                            <li>
                                <Link to="/contact"
                                    className="text-slate-500 transition hover:text-indigo-600"
                                >
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/faq"
                                    className="text-slate-500 transition hover:text-indigo-600"
                                >
                                    FAQs / Help Center
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-sm font-semibold text-slate-900">
                            Services
                        </h3>

                        <ul className="mt-5 space-y-3 text-sm">
                            <li>
                                <a
                                    href="/services"
                                    className="text-slate-500 transition hover:text-indigo-600"
                                >
                                    Wedding & Events
                                </a>
                            </li>

                            <li>
                                <a
                                    href="/services"
                                    className="text-slate-500 transition hover:text-indigo-600"
                                >
                                    DJ & Sound
                                </a>
                            </li>

                            <li>
                                <a
                                    href="/services"
                                    className="text-slate-500 transition hover:text-indigo-600"
                                >
                                    Decoration
                                </a>
                            </li>

                            <li>
                                <a
                                    href="/services"
                                    className="text-slate-500 transition hover:text-indigo-600"
                                >
                                    Boutique & Tailoring
                                </a>
                            </li>

                            <li>
                                <a
                                    href="/services"
                                    className="text-slate-500 transition hover:text-indigo-600"
                                >
                                    Electrical Services
                                </a>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-slate-200">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-5 sm:px-6 md:flex-row lg:px-8">

                    <p className="text-sm text-slate-500">
                        © 2026 LocalSeva. All rights reserved.
                    </p>

                    <div className="flex items-center gap-3">

                        <a
                            href="#"
                            aria-label="WhatsApp"
                            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
                        >
                            <MessageCircle className="h-4 w-4" />
                        </a>

                        <a
                            href="#"
                            aria-label="Instagram"
                            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
                        >
                            I
                        </a>

                        <a
                            href="#"
                            aria-label="Facebook"
                            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
                        >
                            F
                        </a>

                    </div>

                </div>
            </div>

        </footer>
    );
}

export default Footer;