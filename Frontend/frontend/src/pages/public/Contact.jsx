import { Link } from "react-router-dom";
import { useState } from "react";
import {
    Mail,
    Phone,
    MapPin,
    Clock,
    Send,
    MessageCircle,
} from "lucide-react";

function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));

        setSubmitted(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Frontend demo: connect this to your backend later.
        setSubmitted(true);
        setFormData({
            name: "",
            email: "",
            subject: "",
            message: "",
        });
    };

    return (
        <main className="min-h-screen bg-slate-50">
            {/* Hero */}
            <section className="bg-gradient-to-br from-indigo-700 via-indigo-600 to-violet-600 px-5 py-16 text-white sm:py-20">
                <div className="mx-auto max-w-7xl text-center">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium">
                        <MessageCircle className="h-4 w-4" />
                        We're here to help
                    </span>

                    <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
                        Contact Us
                    </h1>

                    <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-indigo-100 sm:text-lg">
                        Have a question about booking a service? Need help with your
                        request? Send us a message and we'll be happy to help.
                    </p>
                </div>
            </section>

            {/* Contact Content */}
            <section className="px-5 py-14 sm:py-20">
                <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-5">
                    {/* Contact Information */}
                    <div className="lg:col-span-2">
                        <div className="rounded-3xl bg-indigo-700 p-7 text-white shadow-lg sm:p-9">
                            <h2 className="text-2xl font-bold">Get in touch</h2>

                            <p className="mt-3 leading-7 text-indigo-100">
                                We're here to make finding trusted local services easier.
                                Contact us if you need assistance with LocalSeva.
                            </p>

                            <div className="mt-9 space-y-7">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10">
                                        <Mail className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">Email Us</h3>
                                        <p className="mt-1 text-sm leading-6 text-indigo-100">
                                            Add your official support email here.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10">
                                        <Phone className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">Call Us</h3>
                                        <p className="mt-1 text-sm leading-6 text-indigo-100">
                                            Add your official contact number here.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10">
                                        <MapPin className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">Our Location</h3>
                                        <p className="mt-1 text-sm leading-6 text-indigo-100">
                                            Serving your local community.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10">
                                        <Clock className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">Support Hours</h3>
                                        <p className="mt-1 text-sm leading-6 text-indigo-100">
                                            Add your business support hours here.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-9 rounded-2xl border border-white/15 bg-white/10 p-5">
                                <p className="text-sm leading-6 text-indigo-50">
                                    Looking for a service? Browse our services and submit a
                                    booking request directly through LocalSeva.
                                </p>

                                <Link
                                    to="/services"
                                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white transition hover:text-indigo-200"
                                >
                                    Explore Services
                                    <span aria-hidden="true">→</span>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-3">
                        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-9">
                            <h2 className="text-2xl font-bold text-slate-900">
                                Send us a message
                            </h2>

                            <p className="mt-2 text-sm leading-6 text-slate-500">
                                Fill out the form below with your question or feedback.
                            </p>

                            {submitted && (
                                <div
                                    role="status"
                                    className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4 text-sm font-medium text-green-700"
                                >
                                    Your form was submitted successfully in this demo.
                                    Messages are not sent to a support team until a backend
                                    is connected.
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                                <div className="grid gap-5 sm:grid-cols-2">
                                    <div>
                                        <label
                                            htmlFor="name"
                                            className="mb-2 block text-sm font-semibold text-slate-700"
                                        >
                                            Full Name
                                        </label>
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            autoComplete="name"
                                            required
                                            minLength={2}
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Enter your name"
                                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="mb-2 block text-sm font-semibold text-slate-700"
                                        >
                                            Email Address
                                        </label>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="you@example.com"
                                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="subject"
                                        className="mb-2 block text-sm font-semibold text-slate-700"
                                    >
                                        Subject
                                    </label>
                                    <input
                                        id="subject"
                                        name="subject"
                                        type="text"
                                        required
                                        minLength={3}
                                        value={formData.subject}
                                        onChange={handleChange}
                                        placeholder="How can we help you?"
                                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="message"
                                        className="mb-2 block text-sm font-semibold text-slate-700"
                                    >
                                        Your Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        minLength={10}
                                        rows={5}
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Tell us how we can help..."
                                        className="w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200 sm:w-auto"
                                >
                                    <Send className="h-4 w-4" />
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Contact;
