import { Link } from "react-router-dom";
import {
    Heart,
    ShieldCheck,
    Users,
    Target,
    Sparkles,
    Search,
    CalendarCheck,
    Handshake,
    ArrowRight,
    CheckCircle2,
} from "lucide-react";

const values = [
    {
        icon: ShieldCheck,
        title: "Trust & Reliability",
        description:
            "We aim to help customers discover dependable local service providers for their important needs.",
    },
    {
        icon: Users,
        title: "Community First",
        description:
            "We connect customers with local professionals and help small service businesses reach more people.",
    },
    {
        icon: Heart,
        title: "Customer Focus",
        description:
            "We want every customer to have a straightforward way to explore services and request a booking.",
    },
    {
        icon: Sparkles,
        title: "Simple Experience",
        description:
            "We make it easier to browse service categories, compare options, and submit service requests in one place.",
    },
];

const steps = [
    {
        number: "01",
        icon: Search,
        title: "Explore Services",
        description:
            "Browse services for weddings, events, tailoring, electrical work, decoration, and more.",
    },
    {
        number: "02",
        icon: CalendarCheck,
        title: "Request a Booking",
        description:
            "Choose a service, provide your preferred date and details, and submit your booking request.",
    },
    {
        number: "03",
        icon: Handshake,
        title: "Get Your Booking Update",
        description:
            "Check your booking status and review your request details through your LocalSeva account.",
    },
];

function About() {
    return (
        <main className="min-h-screen bg-white">
            {/* Hero */}
            <section className="relative overflow-hidden bg-gradient-to-br from-indigo-700 via-indigo-600 to-violet-600 px-5 py-20 text-white sm:py-28">
                <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-violet-300/20 blur-3xl" />

                <div className="relative mx-auto max-w-4xl text-center">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium">
                        <Heart className="h-4 w-4" />
                        About LocalSeva
                    </span>

                    <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                        Local Services,
                        <br />
                        <span className="text-indigo-200">Made Simple.</span>
                    </h1>

                    <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-indigo-100 sm:text-lg">
                        LocalSeva is designed to make discovering local services easier.
                        From special celebrations to everyday needs, our goal is to bring
                        customers and service providers closer together.
                    </p>

                    <Link
                        to="/services"
                        className="mt-9 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-indigo-700 shadow-lg transition hover:bg-indigo-50"
                    >
                        Explore Our Services
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </section>

            {/* Mission */}
            <section className="px-5 py-16 sm:py-20">
                <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
                    <div>
                        <span className="text-sm font-bold uppercase tracking-widest text-indigo-600">
                            Our Mission
                        </span>

                        <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl">
                            Helping local talent connect with local needs.
                        </h2>

                        <p className="mt-6 leading-8 text-slate-600">
                            Finding the right service provider can take time. LocalSeva aims
                            to simplify that process by bringing different service categories
                            together in one convenient place.
                        </p>

                        <p className="mt-4 leading-8 text-slate-600">
                            Whether you're planning a wedding, organizing an event, looking
                            for tailoring, or arranging electrical work, you can explore
                            available services and submit your request through our platform.
                        </p>

                        <div className="mt-7 space-y-4">
                            {[
                                "Discover a variety of local service categories",
                                "Review service information before booking",
                                "Keep track of your booking requests",
                            ].map((item) => (
                                <div key={item} className="flex items-start gap-3">
                                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-indigo-600" />
                                    <span className="text-sm leading-6 text-slate-700">
                                        {item}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative">
                        <div className="rounded-3xl bg-gradient-to-br from-indigo-100 via-violet-50 to-slate-100 p-6 sm:p-10">
                            <div className="rounded-2xl border border-white bg-white p-6 shadow-sm sm:p-8">
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 text-white">
                                    <Target className="h-7 w-7" />
                                </div>

                                <h3 className="mt-6 text-2xl font-bold text-slate-900">
                                    Our Purpose
                                </h3>

                                <p className="mt-3 leading-7 text-slate-600">
                                    Build a convenient local service marketplace where
                                    customers can explore options and service providers can
                                    connect with potential customers.
                                </p>

                                <div className="mt-7 grid grid-cols-2 gap-4">
                                    <div className="rounded-xl bg-indigo-50 p-4">
                                        <Users className="h-6 w-6 text-indigo-600" />
                                        <p className="mt-3 text-sm font-semibold text-slate-800">
                                            Customers
                                        </p>
                                        <p className="mt-1 text-xs leading-5 text-slate-500">
                                            Explore local services
                                        </p>
                                    </div>

                                    <div className="rounded-xl bg-violet-50 p-4">
                                        <Handshake className="h-6 w-6 text-violet-600" />
                                        <p className="mt-3 text-sm font-semibold text-slate-800">
                                            Providers
                                        </p>
                                        <p className="mt-1 text-xs leading-5 text-slate-500">
                                            Reach local customers
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="bg-slate-50 px-5 py-16 sm:py-20">
                <div className="mx-auto max-w-7xl">
                    <div className="mx-auto max-w-2xl text-center">
                        <span className="text-sm font-bold uppercase tracking-widest text-indigo-600">
                            What Matters to Us
                        </span>

                        <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                            The values behind LocalSeva
                        </h2>

                        <p className="mt-4 leading-7 text-slate-500">
                            We want to make finding and requesting local services a more
                            convenient, transparent, and approachable experience.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {values.map((value) => {
                            const Icon = value.icon;

                            return (
                                <div
                                    key={value.title}
                                    className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg"
                                >
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                                        <Icon className="h-6 w-6" />
                                    </div>

                                    <h3 className="mt-5 text-lg font-bold text-slate-900">
                                        {value.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-7 text-slate-500">
                                        {value.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section className="px-5 py-16 sm:py-20">
                <div className="mx-auto max-w-7xl">
                    <div className="mx-auto max-w-2xl text-center">
                        <span className="text-sm font-bold uppercase tracking-widest text-indigo-600">
                            How It Works
                        </span>

                        <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                            Three simple steps
                        </h2>

                        <p className="mt-4 leading-7 text-slate-500">
                            Start exploring local services and manage your booking requests
                            through LocalSeva.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-8 md:grid-cols-3">
                        {steps.map((step) => {
                            const Icon = step.icon;

                            return (
                                <div key={step.number} className="relative">
                                    <div className="rounded-2xl border border-slate-200 bg-white p-7">
                                        <div className="flex items-center justify-between">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                                                <Icon className="h-6 w-6" />
                                            </div>

                                            <span className="text-3xl font-bold text-slate-100">
                                                {step.number}
                                            </span>
                                        </div>

                                        <h3 className="mt-6 text-xl font-bold text-slate-900">
                                            {step.title}
                                        </h3>

                                        <p className="mt-3 text-sm leading-7 text-slate-500">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="px-5 pb-16 sm:pb-20">
                <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-indigo-700 px-6 py-12 text-center text-white sm:px-12 sm:py-16">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        Ready to find your next service?
                    </h2>

                    <p className="mx-auto mt-4 max-w-xl leading-7 text-indigo-100">
                        Explore service categories, discover options, and start your
                        booking request with LocalSeva.
                    </p>

                    <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                        <Link
                            to="/services"
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-50"
                        >
                            Browse Services
                            <ArrowRight className="h-4 w-4" />
                        </Link>

                        <Link
                            to="/contact"
                            className="inline-flex items-center justify-center rounded-xl border border-white/30 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default About;
