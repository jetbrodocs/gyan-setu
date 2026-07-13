import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Check, X, Star, CreditCard, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

export default async function MembershipPage() {
  const session = await getSession();
  const user = session!.user;

  const plans = await prisma.membershipPlan.findMany({
    orderBy: { price: "asc" },
  });

  // Features that are NOT included per plan tier (shown with X)
  const excludedFeatures: Record<string, string[]> = {
    BASIC: [
      "Audiobook Library",
      "Unlimited Mock Tests",
      "AI Book Summaries",
      "Priority Support",
    ],
    STANDARD: ["Priority Support"],
    GOLD: [],
  };

  const planStyles: Record<
    string,
    {
      border: string;
      headerBg: string;
      headerText: string;
      priceBg: string;
      priceText: string;
      buttonBg: string;
      buttonText: string;
      ring: string;
    }
  > = {
    BASIC: {
      border: "border-slate-200",
      headerBg: "",
      headerText: "text-navy",
      priceBg: "",
      priceText: "text-navy",
      buttonBg: "bg-white border-2 border-slate-300 hover:bg-slate-50",
      buttonText: "text-slate-700",
      ring: "",
    },
    STANDARD: {
      border: "border-blue-200",
      headerBg: "",
      headerText: "text-blue-700",
      priceBg: "",
      priceText: "text-blue-700",
      buttonBg: "bg-blue-600 hover:bg-blue-700",
      buttonText: "text-white",
      ring: "",
    },
    GOLD: {
      border: "border-amber-300",
      headerBg: "bg-gradient-to-b from-amber-50 to-white",
      headerText: "text-amber-700",
      priceBg: "",
      priceText: "text-amber-700",
      buttonBg: "bg-amber-500 hover:bg-amber-600",
      buttonText: "text-white",
      ring: "ring-2 ring-amber-300",
    },
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-navy">
          Choose Your Knowledge Plan
        </h1>
        <p className="text-sm text-slate-500 mt-2 max-w-lg mx-auto">
          Unlock unlimited learning with flexible membership options designed
          for everyone.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {plans.map((plan) => {
          const style = planStyles[plan.tier] || planStyles.BASIC;
          const isCurrentPlan = user.membershipTier === plan.tier;
          const excluded = excludedFeatures[plan.tier] || [];
          const features = plan.features as string[];

          return (
            <div
              key={plan.id}
              className={cn(
                "relative bg-white rounded-2xl border-2 overflow-hidden shadow-sm transition-shadow hover:shadow-md flex flex-col",
                style.border,
                style.ring,
                plan.isPopular && "scale-[1.02]"
              )}
            >
              {/* Popular Badge */}
              {plan.isPopular && (
                <div className="absolute top-0 left-0 right-0 bg-amber-500 text-white text-xs font-bold text-center py-1.5 uppercase tracking-wider flex items-center justify-center gap-1">
                  <Star className="h-3 w-3 fill-white" />
                  Most Popular
                </div>
              )}

              {/* Plan Header */}
              <div
                className={cn(
                  "p-6 text-center",
                  style.headerBg,
                  plan.isPopular && "pt-10"
                )}
              >
                <h2
                  className={cn(
                    "text-lg font-bold uppercase tracking-wide",
                    style.headerText
                  )}
                >
                  {plan.name}
                </h2>

                {/* Price */}
                <div className="mt-3 flex items-baseline justify-center gap-1">
                  <span className={cn("text-4xl font-extrabold", style.priceText)}>
                    &#8377;{plan.price}
                  </span>
                  <span className="text-sm text-slate-400">/ month</span>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-500 mt-2">
                  {plan.tier === "BASIC" &&
                    "Essential access for casual readers and students."}
                  {plan.tier === "STANDARD" &&
                    "Perfect for avid readers and audio learners."}
                  {plan.tier === "GOLD" &&
                    "Ultimate access for serious test preppers & researchers."}
                </p>
              </div>

              {/* Features */}
              <div className="flex-1 px-6 pb-4">
                <div className="space-y-3">
                  {features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-700">{feature}</span>
                    </div>
                  ))}
                  {excluded.map((feature, i) => (
                    <div key={`ex-${i}`} className="flex items-start gap-2">
                      <X className="h-4 w-4 text-slate-300 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-400 line-through">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Button */}
              <div className="px-6 pb-6">
                {isCurrentPlan ? (
                  <div className="w-full py-2.5 rounded-lg text-center text-sm font-semibold bg-slate-100 text-slate-500 border-2 border-slate-200">
                    Current Plan
                  </div>
                ) : (
                  <button
                    className={cn(
                      "w-full py-2.5 rounded-lg text-sm font-semibold transition-colors cursor-pointer",
                      style.buttonBg,
                      style.buttonText
                    )}
                  >
                    {plan.price > (plans.find((p) => p.tier === user.membershipTier)?.price ?? 0)
                      ? `Choose ${plan.name}`
                      : `Choose ${plan.name}`}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Discount Note */}
      <div className="max-w-5xl mx-auto bg-blue-50 rounded-xl p-5 text-center">
        <p className="text-sm font-semibold text-blue-700">
          50% Discount for Students &amp; Senior Citizens
        </p>
        <p className="text-xs text-blue-500 mt-1">
          Verify your status through DigiLocker or institution ID to unlock
          discounted rates.
        </p>
      </div>

      {/* Payment Methods & Verification */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Payment Methods */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <CreditCard className="h-5 w-5 text-slate-600" />
            <h3 className="text-sm font-semibold text-navy">
              Accepted Payment Methods
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { name: "UPI", desc: "GPay, PhonePe, BHIM" },
              { name: "Net Banking", desc: "All major banks" },
              { name: "Cards", desc: "Visa, Mastercard, RuPay" },
              { name: "BBPS", desc: "Bharat Bill Payment" },
            ].map((method) => (
              <div
                key={method.name}
                className="bg-slate-50 rounded-lg p-3 text-center"
              >
                <p className="text-sm font-medium text-navy">{method.name}</p>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  {method.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Identity Verification */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="h-5 w-5 text-slate-600" />
            <h3 className="text-sm font-semibold text-navy">
              Identity Verification
            </h3>
          </div>
          <div className="space-y-3">
            <div className="bg-slate-50 rounded-lg p-4">
              <p className="text-sm font-medium text-navy">
                DigiLocker Integration
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Verify your identity seamlessly through DigiLocker for instant
                membership activation and student/senior discount eligibility.
              </p>
            </div>
            <div className="bg-slate-50 rounded-lg p-4">
              <p className="text-sm font-medium text-navy">
                Aadhaar Verification
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Optional Aadhaar-based verification for enhanced security and
                access to government-linked digital library benefits.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
