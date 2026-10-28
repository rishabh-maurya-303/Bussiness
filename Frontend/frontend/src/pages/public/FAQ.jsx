
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronDown,
  Search,
  CalendarCheck,
  CreditCard,
  ShieldCheck,
  MessageCircle,
  ArrowRight,
} from "lucide-react";

const faqs = [
  {
    category: "Bookings",
    question: "How do I book a service?",
    answer:
      "Browse the Services page, select the service you need, and submit the booking form with your preferred date, time, location, and requirements.",
  },
  {
    category: "Bookings",
    question: "How can I check my booking status?",
    answer:
      "Open My Bookings to view your requests. Select View Details on a booking to see its current status and submitted information.",
  },
  {
    category: "Bookings",
    question: "Can I change my booking after submitting it?",
    answer:
      "If you need to change your booking details, contact the LocalSeva support team. Changes depend on the booking status and available options.",
  },
  {
    category: "Bookings",
    question: "What do the booking statuses mean?",
    answer:
      "Pending means your request is awaiting review. Confirmed means it has been accepted. Completed means the service has been marked complete. Rejected means the request was not accepted.",
  },
  {
    category: "Payments",
    question: "How much does a service cost?",
    answer:
      "Each service may display a starting price. The final price can depend on your requirements, event details, location, and the service provider's terms. Confirm the final amount before proceeding.",
  },
  {
    category: "Payments",
    question: "Can I pay online through LocalSeva?",
    answer:
      "Online payment availability depends on the payment features enabled on the platform. Please confirm the payment method and terms before paying a provider.",
  },
  {
    category: "Vendors",
    question: "How can I become a service provider?",
    answer:
      "Contact the LocalSeva team to ask about joining as a service provider. Vendor onboarding and approval depend on the platform's current process.",
  },
  {
    category: "Vendors",
    question: "How do I know whether a booking is confirmed?",
    answer:
      "Check the status shown in My Bookings. Do not assume a request is confirmed until its status has been updated accordingly.",
  },
  {
    category: "Support",
    question: "What should I do if I have a problem?",
    answer:
      "Visit our Contact page and send a message explaining your question or issue. Include your booking details when relevant.",
  },
];

const categories = ["All Questions", "Bookings", "Payments", "Vendors", "Support"];

function FAQ() {
  const [activeCategory, setActiveCategory] = useState("All Questions");
  const [search, setSearch] = useState("");
  const [openQuestion, setOpenQuestion] = useState(null);

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory =
      activeCategory === "All Questions" ||
      faq.category === activeCategory;

    const searchText = `${faq.question} ${faq.answer} ${faq.category}`.toLowerCase();
    const matchesSearch = searchText.includes(search.toLowerCase().trim());

    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-br from-indigo-700 via-indigo-600 to-violet-600 px-5 py-16 text-center text-white sm:py-20">
        <div className="mx-auto max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium">
            <MessageCircle className="h-4 w-4" />
            Help Center
          </span>

          <h1 className="mt-6 text-4xl font-bold sm:text-5xl">
            Frequently Asked Questions
          </h1>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-indigo-100">
            Find answers about service bookings, payments, vendors, and using
            LocalSeva.
          </p>

          <div className="relative mx-auto mt-8 max-w-xl">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setOpenQuestion(null);
              }}
              placeholder="Search your question..."
              aria-label="Search frequently asked questions"
              className="w-full rounded-2xl border border-white/20 bg-white py-4 pl-12 pr-4 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:ring-4 focus:ring-indigo-300/40"
            />
          </div>
        </div>
      </section>

      <section className="px-5 py-12 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 grid gap-4 sm:grid-cols-3">
            {[
              {
                icon: CalendarCheck,
                title: "Booking Help",
                description: "Requests and booking status",
              },
              {
                icon: CreditCard,
                title: "Payment Questions",
                description: "Pricing and payment methods",
              },
              {
                icon: ShieldCheck,
                title: "Using LocalSeva",
                description: "Providers and platform guidance",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-slate-200 bg-white p-5"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h2 className="mt-4 font-bold text-slate-900">
                    {item.title}
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mb-6 flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => {
                  setActiveCategory(category);
                  setOpenQuestion(null);
                }}
                className={`rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                  activeCategory === category
                    ? "bg-indigo-600 text-white"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-indigo-300 hover:text-indigo-600"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {filteredFaqs.map((faq, index) => {
              const isOpen = openQuestion === `${faq.question}-${index}`;

              return (
                <div
                  key={faq.question}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() =>
                      setOpenQuestion(isOpen ? null : `${faq.question}-${index}`)
                    }
                    className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
                  >
                    <span className="font-semibold leading-6 text-slate-800">
                      {faq.question}
                    </span>

                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-indigo-600 transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="border-t border-slate-100 px-5 py-5 sm:px-6">
                      <p className="text-sm leading-7 text-slate-600">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}

            {filteredFaqs.length === 0 && (
              <div className="rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center">
                <Search className="mx-auto h-8 w-8 text-slate-400" />
                <h2 className="mt-4 font-bold text-slate-900">
                  No questions found
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  Try another search term or choose a different category.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setActiveCategory("All Questions");
                    setOpenQuestion(null);
                  }}
                  className="mt-4 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>

          <div className="mt-10 rounded-3xl bg-indigo-50 p-7 text-center sm:p-10">
            <h2 className="text-2xl font-bold text-slate-900">
              Still need help?
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-slate-600">
              If you couldn't find the answer you need, contact us and explain
              how we can help.
            </p>
            <Link
              to="/contact"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              Contact Support
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default FAQ;
