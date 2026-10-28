import {
  ArrowRight,
  MessageCircle,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";

function WhatsAppCTA() {
  return (
    <section className="bg-white px-5 py-24 sm:px-8 lg:px-10">

      <div className="mx-auto max-w-7xl">

        <div className="relative overflow-hidden rounded-[2rem] bg-indigo-600 px-7 py-14 sm:px-12 lg:px-16">

          {/* Background shapes */}
          <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/10" />

          <div className="absolute -bottom-40 left-1/3 h-96 w-96 rounded-full bg-indigo-500/50" />

          <div className="relative z-10 grid items-center gap-10 lg:grid-cols-[1fr_auto]">

            <div className="max-w-2xl">

              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-white">
                <MessageCircle className="h-6 w-6" />
              </div>

              <p className="text-sm font-semibold text-indigo-200">
                NEED HELP?
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Let's find the right service for you.
              </h2>

              <p className="mt-4 text-base leading-7 text-indigo-100">
                Not sure what you need? Talk directly with our team on
                WhatsApp and tell us about your requirement.
              </p>

            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">

              <a
                href="https://wa.me/YOUR_PHONE_NUMBER"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex"
              >
                <Button
                  size="lg"
                  className="h-13 rounded-xl bg-white px-7 text-indigo-600 hover:bg-indigo-50"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Chat on WhatsApp
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>

              <div className="flex items-center justify-center gap-2 text-xs text-indigo-200">
                <Sparkles className="h-3.5 w-3.5" />
                Quick response from our team
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default WhatsAppCTA;