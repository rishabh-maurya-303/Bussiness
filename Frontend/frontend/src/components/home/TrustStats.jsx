function TrustStat({ icon: Icon, value, label }) {
    return (
        <div className="flex items-center justify-center gap-3 px-4 py-7 sm:py-8">

            <div className="hidden h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 sm:flex">
                <Icon className="h-5 w-5" />
            </div>

            <div>
                <p className="text-xl font-bold text-slate-900">
                    {value}
                </p>

                <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">
                    {label}
                </p>
            </div>

        </div>
    );
}

export default TrustStat;