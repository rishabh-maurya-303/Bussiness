import {
  CalendarCheck,
  CheckCircle2,
  ClipboardList,
  Search,
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Choose a service",
    description:
      "Find the service that matches what you need.",
  },
  {
    number: "02",
    icon: ClipboardList,
    title: "Send your request",
    description:
      "Choose your date, time, location and requirements.",
  },
  {
    number: "03",
    icon: CalendarCheck,
    title: "We check availability",
    description:
      "Our team verifies the schedule and available vendor.",
  },
  {
    number: "04",
    icon: CheckCircle2,
    title: "Get confirmed",
    description:
      "Once approved, we'll confirm your booking with you.",
  },
];

function HowItWorks() {
  return (
    <section className="bg-slate-950 py-24">

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">

          <span className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-400">
            Simple process
          </span>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Booking made
            <span className="text-indigo-400"> simple.</span>
          </h2>

          <p className="mt-4 text-base leading-7 text-slate-400">
            No complicated process. Tell us what you need and we'll
            help coordinate the rest.
          </p>

        </div>

        {/* Steps */}
        <div className="relative mt-16 grid gap-10 md:grid-cols-4">

          {/* Connecting line */}
          <div className="absolute left-[12%] right-[12%] top-7 hidden h-px bg-white/10 md:block" />

          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="relative z-10 text-center"
              >

                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-indigo-400/20 bg-indigo-500/10 text-indigo-400 ring-8 ring-slate-950">
                  <Icon className="h-6 w-6" />
                </div>

                <p className="mt-7 text-xs font-bold tracking-[0.18em] text-indigo-400">
                  STEP {step.number}
                </p>

                <h3 className="mt-2 text-lg font-semibold text-white">
                  {step.title}
                </h3>

                <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-slate-400">
                  {step.description}
                </p>

              </div>
            );
          })}

        </div>

        {/* Notice */}
        <div className="mx-auto mt-16 max-w-3xl rounded-2xl border border-white/10 bg-white/5 px-6 py-5 text-center">

          <p className="text-sm leading-6 text-slate-300">
            <span className="font-semibold text-white">
              Your request isn't automatically confirmed.
            </span>{" "}
            We first check availability and coordinate with the appropriate
            service provider before confirming your booking.
          </p>

        </div>

      </div>
    </section>
  );
}

export default HowItWorks;