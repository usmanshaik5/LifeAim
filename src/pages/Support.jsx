import { useState } from "react";

export default function Support() {
  const [submitted, setSubmitted] = useState(false);
  const [openFAQ, setOpenFAQ] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const faqs = [
    {
      q: "How do I withdraw funds?",
      a: "Navigate to Wallet → Withdraw Funds and complete the withdrawal form.",
    },
    {
      q: "How are commissions calculated?",
      a: "Commissions are calculated based on your referral network, team performance, and rank level.",
    },
    {
      q: "When do I receive payments?",
      a: "All eligible payments are processed every Friday.",
    },
  ];

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Support Center
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Get assistance, raise a ticket, or explore frequently asked questions.
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* CONTACT CARD */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 shadow-sm hover:shadow-md transition">

          <div className="mb-6">
            <h2 className="text-lg font-semibold">
              Contact Support
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Submit your issue and our team will respond shortly.
            </p>
          </div>

          {submitted ? (
            <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 text-sm">
              ✅ Your message has been successfully submitted.
              Our support team will contact you soon.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">

              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-gray-500 dark:text-gray-400">
                  SUBJECT
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter issue subject"
                  className="w-full px-4 py-2 rounded-xl border 
                  border-gray-300 dark:border-gray-700
                  bg-white dark:bg-gray-800
                  text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-gray-500 dark:text-gray-400">
                  MESSAGE
                </label>
                <textarea
                  rows={5}
                  required
                  placeholder="Describe your issue in detail..."
                  className="w-full px-4 py-2 rounded-xl border 
                  border-gray-300 dark:border-gray-700
                  bg-white dark:bg-gray-800
                  text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
              >
                Submit Ticket
              </button>

            </form>
          )}
        </div>

        {/* FAQ CARD */}
        {/* FAQ CARD */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 shadow-sm">

          <div className="mb-8">
            <h2 className="text-xl font-semibold tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Everything you need to know about withdrawals, commissions, and payments.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden transition-all duration-300"
              >
                {/* Question */}
                <button
                  onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                  className="w-full flex justify-between items-center px-6 py-4 text-left 
          hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                  <span className="text-sm font-medium">
                    {faq.q}
                  </span>

                  <span
                    className={`text-blue-600 transition-transform duration-300 ${openFAQ === i ? "rotate-180" : ""
                      }`}
                  >
                    ▼
                  </span>
                </button>

                {/* Animated Answer */}
                <div
                  className={`grid transition-all duration-300 ${openFAQ === i
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                    }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-5 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                      {faq.a}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>


      </div>
    </div>
  );
}
