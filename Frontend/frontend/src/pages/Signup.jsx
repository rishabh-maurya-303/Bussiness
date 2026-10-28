
import { useState } from "react";
import { Link } from "react-router-dom";
import {
    UserRound,
    Mail,
    Phone,
    LockKeyhole,
    Eye,
    EyeOff,
    UserPlus,
    ArrowRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";

function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [form, setForm] = useState({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });

    const [message, setMessage] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;

        setForm((current) => ({
            ...current,
            [name]: value,
        }));

        setMessage("");
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (form.password.length < 8) {
            setMessage("Your password must contain at least 8 characters.");
            return;
        }

        if (form.password !== form.confirmPassword) {
            setMessage("Your passwords do not match. Please try again.");
            return;
        }

        setMessage(
            "Your form is valid. Account creation will be enabled after backend integration."
        );
    };

    return (
        <main className="flex min-h-[80vh] items-center justify-center bg-slate-50 px-4 py-12">
            <div className="w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
                <Link
                    to="/"
                    className="text-sm font-medium text-slate-500 hover:text-indigo-600"
                >
                    ← Back to Home
                </Link>

                <div className="mt-7 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                    <UserPlus className="h-6 w-6" />
                </div>

                <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-900">
                    Create your account
                </h1>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                    Join LocalSeva to request services and keep track of your
                    bookings.
                </p>

                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                    <div>
                        <label
                            htmlFor="fullName"
                            className="mb-2 block text-sm font-medium text-slate-700"
                        >
                            Full name
                        </label>

                        <div className="relative">
                            <UserRound className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                            <input
                                id="fullName"
                                name="fullName"
                                value={form.fullName}
                                onChange={handleChange}
                                required
                                autoComplete="name"
                                placeholder="Enter your full name"
                                className="w-full rounded-xl border border-slate-200 py-3 pl-12 pr-4 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                            />
                        </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                            <label
                                htmlFor="email"
                                className="mb-2 block text-sm font-medium text-slate-700"
                            >
                                Email address
                            </label>

                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                    autoComplete="email"
                                    placeholder="you@example.com"
                                    className="w-full rounded-xl border border-slate-200 py-3 pl-12 pr-4 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="phone"
                                className="mb-2 block text-sm font-medium text-slate-700"
                            >
                                Mobile number
                            </label>

                            <div className="relative">
                                <Phone className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                                <input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    value={form.phone}
                                    onChange={handleChange}
                                    required
                                    autoComplete="tel"
                                    inputMode="tel"
                                    pattern="[0-9+\-\s()]{10,18}"
                                    title="Enter a valid phone number"
                                    placeholder="Your phone number"
                                    className="w-full rounded-xl border border-slate-200 py-3 pl-12 pr-4 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="mb-2 block text-sm font-medium text-slate-700"
                        >
                            Password
                        </label>

                        <div className="relative">
                            <LockKeyhole className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                value={form.password}
                                onChange={handleChange}
                                required
                                minLength={8}
                                autoComplete="new-password"
                                placeholder="At least 8 characters"
                                className="w-full rounded-xl border border-slate-200 py-3 pl-12 pr-12 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowPassword((current) => !current)
                                }
                                aria-label={
                                    showPassword
                                        ? "Hide password"
                                        : "Show password"
                                }
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                            >
                                {showPassword ? (
                                    <EyeOff className="h-5 w-5" />
                                ) : (
                                    <Eye className="h-5 w-5" />
                                )}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor="confirmPassword"
                            className="mb-2 block text-sm font-medium text-slate-700"
                        >
                            Confirm password
                        </label>

                        <div className="relative">
                            <LockKeyhole className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type={
                                    showConfirmPassword ? "text" : "password"
                                }
                                value={form.confirmPassword}
                                onChange={handleChange}
                                required
                                minLength={8}
                                autoComplete="new-password"
                                placeholder="Re-enter your password"
                                className="w-full rounded-xl border border-slate-200 py-3 pl-12 pr-12 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowConfirmPassword(
                                        (current) => !current
                                    )
                                }
                                aria-label={
                                    showConfirmPassword
                                        ? "Hide confirmation password"
                                        : "Show confirmation password"
                                }
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                            >
                                {showConfirmPassword ? (
                                    <EyeOff className="h-5 w-5" />
                                ) : (
                                    <Eye className="h-5 w-5" />
                                )}
                            </button>
                        </div>
                    </div>

                    {message && (
                        <p
                            role="status"
                            className="rounded-xl bg-indigo-50 p-3 text-sm leading-6 text-indigo-700"
                        >
                            {message}
                        </p>
                    )}

                    <Button
                        type="submit"
                        className="h-12 w-full rounded-xl bg-indigo-600 hover:bg-indigo-700"
                    >
                        Create Account
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </form>

                <p className="mt-7 text-center text-sm text-slate-500">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="font-semibold text-indigo-600 hover:text-indigo-700"
                    >
                        Sign in
                    </Link>
                </p>
            </div>
        </main>
    );
}

export default Signup;
