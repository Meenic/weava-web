import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Check, Info, BadgeCheck, Gem } from "lucide-react";

const pricingPlans = [
  {
    name: "Free",
    price: "$0",
    period: "month",
    yearlyPrice: "$0",
    yearlyPeriod: "year",
    description: "Get started with basic storytelling",
    features: [
      { text: "5 stories per month", highlight: false },
      { text: "Basic templates", highlight: false },
      { text: "Community support", highlight: false },
      { text: "Export to PDF", highlight: false },
    ],
    cta: "Get Started Free",
    popular: false,
  },
  {
    name: "Pro",
    price: "$19",
    period: "month",
    yearlyPrice: "$15",
    yearlyPeriod: "month",
    yearlyTotal: "$180/year",
    savings: "Save 21%",
    description: "Everything you need to scale",
    features: [
      { text: "Unlimited stories", highlight: true },
      { text: "Advanced AI templates", highlight: true },
      { text: "Priority support (24/7)", highlight: false },
      { text: "Export to multiple formats", highlight: false },
      { text: "Custom branding", highlight: false },
      { text: "Analytics dashboard", highlight: false },
    ],
    cta: "Start Creating",
    popular: true,
    badge: "Most Preferred",
    bonusFeature: {
      text: "$100 worth of credits as gift",
      value: "$100",
    },
  },
];

export function PricingSection() {
  return (
    <section className="px-4 pt-28 pb-16 sm:pt-32 sm:pb-20 md:pt-36 md:pb-24 relative">
      {/* Top Fade Gradient */}
      <div className="absolute top-0 left-0 right-0 h-[30%] bg-gradient-to-b from-[#8F00FF]/20 to-transparent" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2.5 sm:mb-3">
            Pricing
          </h2>
          <p className="text-sm sm:text-base md:text-lg font-medium text-foreground/70 max-w-xl mx-auto">
            Start free, upgrade when you&apos;re ready
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 max-w-3xl mx-auto">
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-6 sm:p-8 border transition-all duration-300 ${
                plan.popular
                  ? "bg-card/50 backdrop-blur-sm border-[#8F00FF]/40 shadow-sm hover:shadow-md hover:border-[#8F00FF]/50"
                  : "bg-card/30 backdrop-blur-sm border-border/40 hover:border-border/60 hover:bg-card/40"
              }`}
            >
              {/* Plan Name with Badge */}
              <div className="flex items-center justify-between mb-1.5">
                <h3 className="text-lg sm:text-xl font-bold">{plan.name}</h3>
                {plan.popular && (
                  <Badge className="bg-[#8F00FF] text-foreground">
                    <BadgeCheck />
                    Most Preferred
                  </Badge>
                )}
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-foreground/60 mb-4 sm:mb-5">
                {plan.description}
              </p>

              {/* Price */}
              <div className="mb-5 sm:mb-6">
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-3xl sm:text-4xl font-bold">
                    {plan.price}
                  </span>
                  <span className="text-sm text-foreground/60 font-medium">
                    /{plan.period}
                  </span>
                  {plan.price !== "$0" && (
                    <span className="text-xs text-foreground/50">+TAX</span>
                  )}
                </div>
                {plan.yearlyPrice !== plan.price && plan.price !== "$0" && (
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-sm text-foreground/50 line-through">
                      {plan.yearlyTotal}
                    </span>
                    <span className="text-xs font-semibold text-foreground/70">
                      {plan.yearlyPrice}/{plan.yearlyPeriod} +TAX
                    </span>
                  </div>
                )}
                {plan.savings && (
                  <span className="inline-block mt-1 text-xs font-semibold text-[#8F00FF] bg-[#8F00FF]/10 px-2 py-0.5 rounded-full">
                    {plan.savings}
                  </span>
                )}
              </div>

              {/* CTA Button */}
              <Button
                className={`w-full text-xs sm:text-sm font-semibold py-4 sm:py-5 mb-5 sm:mb-6 transition-all duration-300 ${
                  plan.popular
                    ? "bg-[#8F00FF] hover:bg-[#7A00E0] text-foreground shadow-sm hover:shadow-md"
                    : "border hover:bg-foreground/5"
                }`}
                size="lg"
                variant={plan.popular ? "default" : "outline"}
              >
                {plan.cta}
              </Button>

              {/* Bonus Feature */}
              {plan.bonusFeature && (
                <div className="mb-5 p-3 rounded-md bg-[#8F00FF]/5 border border-[#8F00FF]/20">
                  <div className="flex items-start gap-2">
                    <Gem className="w-4 h-4 text-[#8F00FF] flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-foreground/90">
                        {plan.bonusFeature.value} Credit Gift
                      </p>
                      <p className="text-[10px] sm:text-xs text-foreground/60">
                        {plan.bonusFeature.text}
                      </p>
                    </div>
                    <Info className="w-3.5 h-3.5 text-foreground/40 flex-shrink-0 mt-0.5" />
                  </div>
                </div>
              )}

              {/* Divider */}
              <div className="h-px bg-border/30 mb-4 sm:mb-5" />

              {/* Features List */}
              <div>
                <p className="text-[10px] sm:text-xs font-semibold text-foreground/50 uppercase tracking-wider mb-3">
                  {plan.name} Package Includes
                </p>
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div
                        className={`mt-0.5 rounded-full p-0.5 ${
                          plan.popular ? "bg-[#8F00FF]/15" : "bg-foreground/8"
                        }`}
                      >
                        <Check
                          className={`w-3 h-3 ${
                            plan.popular
                              ? "text-[#8F00FF]"
                              : "text-foreground/60"
                          }`}
                        />
                      </div>
                      <span
                        className={`text-xs sm:text-sm leading-relaxed ${
                          feature.highlight
                            ? "font-semibold text-foreground/90"
                            : "font-medium text-foreground/70"
                        }`}
                      >
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-6 sm:mt-8 space-y-2">
          <p className="text-xs sm:text-sm font-medium text-foreground/70">
            All plans include 14-day money-back guarantee
          </p>
          <p className="text-[10px] sm:text-xs text-foreground/50">
            Cancel anytime • No hidden fees • Instant activation
          </p>
        </div>
      </div>
    </section>
  );
}
