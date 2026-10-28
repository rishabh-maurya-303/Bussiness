
import { useState } from "react";
import { Link } from "react-router-dom";
import {
    Eye,
    EyeOff,
    LockKeyhole,
    Mail,
    ArrowRight,
    ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        setMessage(
            "Login is not connected yet. Your account will be verified after backend integration."
        );
    };

    return (
        <main className="flex min-h-[80vh] items-center justify-center bg-slate-50 px-4 py-12">
            <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm lg:grid-cols-2">
                {/* Left panel */}
                <div className="relative hidden flex-col justify-between overflow-hidden bg-indigo-700 p-10 text-white lg:flex">
                    <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10" />
                    <div className="absolute -bottom-24 -left-20 h-80 w-80 rounded-full bg-indigo-500/40" />

                    <div className="relative">
                        <Link to="/" className="inline-flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-xl font-bold text-indigo-700">
                                L
                            </div>
                            <span className="text-2xl font-bold">
                                LocalSeva
                            </span>
                        </Link>
                    </div>

                    <div className="relative py-12">
                        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
                            <ShieldCheck className="h-8 w-8" />
                        </div>

                        <h1 className="text-4xl font-bold leading-tight">
                            Local services.
                            <br />
                            Trusted connections.
                        </h1>

                        <p className="mt-5 max-w-sm leading-7 text-indigo-100">
                            Find the right local professionals for your
                            celebrations, tailoring needs, and everyday
                            services—all in one place.
                        </p>
                    </div>

                    <p className="relative text-sm text-indigo-200">
                        Your community, connected.
                    </p>
                </div>

                {/* Login form */}
                <div className="p-6 sm:p-10 lg:p-12">
                    <Link
                        to="/"
                        className="text-sm font-medium text-slate-500 hover:text-indigo-600 lg:hidden"
                    >
                        ← Back to Home
                    </Link>

                    <div className="mt-6 lg:mt-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                            <LockKeyhole className="h-6 w-6" />
                        </div>

                        <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-900">
                            Welcome back
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-slate-500">
                            Sign in to manage your service requests and
                            bookings.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
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
                                    type="email"
                                    value={email}
                                    onChange={(event) => {
                                        setEmail(event.target.value);
                                        setMessage("");
                                    }}
                                    required
                                    autoComplete="email"
                                    placeholder="you@example.com"
                                    className="w-full rounded-xl border border-slate-200 py-3 pl-12 pr-4 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                />
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
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(event) => {
                                        setPassword(event.target.value);
                                        setMessage("");
                                    }}
                                    required
                                    autoComplete="current-password"
                                    placeholder="Enter your password"
                                    className="w-full rounded-xl border border-slate-200 py-3 pl-12 pr-12 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
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

                        {message && (
                            <p
                                role="status"
                                className="rounded-xl bg-amber-50 p-3 text-sm leading-6 text-amber-800"
                            >
                                {message}
                            </p>
                        )}

                        <Button
                            type="submit"
                            className="h-12 w-full rounded-xl bg-indigo-600 hover:bg-indigo-700"
                        >
                            Sign In
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </form>

                    <p className="mt-7 text-center text-sm text-slate-500">
                        Don't have an account?{" "}
                        <Link
                            to="/signup"
                            className="font-semibold text-indigo-600 hover:text-indigo-700"
                        >
                            Create an account
                        </Link>
                    </p>

                    <p className="mt-8 text-center text-xs leading-5 text-slate-400">
                        By continuing, you agree to use LocalSeva responsibly.
                    </p>
                </div>
            </div>
        </main>
    );
}

export default Login;
