import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, BadgeCheck } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export interface PricingFeature {
  text: string;
  highlight: boolean;
}

export interface BonusFeature {
  text: string;
  value: string;
}

export interface PricingPlan {
  name: string;
  price: string;
  period: "month" | "year";
  yearlyPrice: string;
  yearlyPeriod: "month" | "year";
  description: string;
  features: PricingFeature[];
  cta: string;
  popular: boolean;
  yearlyTotal?: string;
  savings?: string;
  badge?: string;
  bonusFeature?: BonusFeature;
}

const pricingPlans: PricingPlan[] = [
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
    name: "Plus",
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
  },
  {
    name: "Pro",
    price: "$49",
    period: "month",
    yearlyPrice: "$39",
    yearlyPeriod: "month",
    yearlyTotal: "$468/year",
    savings: "Save 20%",
    description: "For power users and teams",
    features: [
      { text: "AI Story Co-Writer", highlight: true },
      { text: "Advanced analytics & insights", highlight: true },
      { text: "Team collaboration (up to 5)", highlight: false },
      { text: "White-label exports", highlight: false },
      { text: "API access", highlight: false },
      { text: "Dedicated account manager", highlight: false },
      { text: "Custom integrations", highlight: false },
    ],
    cta: "Upgrade to Pro",
    popular: false,
  },
];

const getFeaturesTitle = (planName: string) => {
  if (planName === "Free") return "Key Features";
  if (planName === "Plus") return "Everything in Free and:";
  if (planName === "Pro") return "Everything in Plus and:";
  return "Key Features";
};

export function PricingSection() {
  return (
    <section className="px-4 pt-28 pb-16 sm:pt-32 sm:pb-20 md:pt-36 md:pb-24 relative">
      {/* Top Fade Gradient */}
      <div className="absolute top-0 left-0 right-0 h-[30%] bg-gradient-to-b from-[#8F00FF]/20 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 max-w-5xl mx-auto mb-20 sm:mb-24">
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-5 sm:p-6 border transition-all duration-300 ${
                plan.popular
                  ? "bg-card/50 backdrop-blur-sm border-[#8F00FF]/40 shadow-sm hover:shadow-md hover:border-[#8F00FF]/50"
                  : "bg-card/30 backdrop-blur-sm border-border/40 hover:border-border/60 hover:bg-card/40"
              }`}
            >
              {/* Plan Name with Badge */}
              <div className="flex items-center justify-between mb-1.5">
                <h3 className="text-base sm:text-lg font-bold">{plan.name}</h3>
                {plan.popular && (
                  <Badge className="bg-[#8F00FF] text-foreground text-[10px]">
                    <BadgeCheck />
                    Most Preferred
                  </Badge>
                )}
              </div>

              {/* Description */}
              <p className="text-[10px] sm:text-xs text-foreground/60 mb-3 sm:mb-4">
                {plan.description}
              </p>

              {/* Price */}
              <div className="mb-4 sm:mb-5">
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-2xl sm:text-3xl font-bold">
                    {plan.price}
                  </span>
                  {plan.price !== "Custom" && (
                    <>
                      <span className="text-xs text-foreground/60 font-medium">
                        /{plan.period}
                      </span>
                      {plan.price !== "$0" && (
                        <span className="text-[10px] text-foreground/50">
                          +TAX
                        </span>
                      )}
                    </>
                  )}
                </div>
                {plan.yearlyPrice !== plan.price &&
                  plan.price !== "$0" &&
                  plan.price !== "Custom" && (
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xs text-foreground/50 line-through">
                        {plan.yearlyTotal}
                      </span>
                      <span className="text-[10px] font-semibold text-foreground/70">
                        {plan.yearlyPrice}/{plan.yearlyPeriod} +TAX
                      </span>
                    </div>
                  )}
                {plan.savings && (
                  <span className="inline-block mt-1 text-[10px] font-semibold text-[#8F00FF] bg-[#8F00FF]/10 px-1.5 py-0.5 rounded-full">
                    {plan.savings}
                  </span>
                )}
              </div>

              {/* CTA Button */}
              <Button
                className={`w-full text-xs font-semibold mb-4 sm:mb-5 transition-all duration-300 ${
                  plan.popular
                    ? "bg-[#8F00FF] hover:bg-[#7A00E0] text-foreground shadow-sm hover:shadow-md"
                    : "border hover:bg-foreground/5"
                }`}
                size="lg"
                variant={
                  plan.popular
                    ? "default"
                    : plan.price === "$0"
                    ? "outline"
                    : "secondary"
                }
              >
                {plan.cta}
              </Button>

              {/* Divider */}
              <div className="h-px bg-border/30 mb-3 sm:mb-4" />

              {/* Features List */}
              <div>
                <p className="text-[9px] sm:text-[10px] font-semibold text-foreground/50 tracking-wider mb-2.5">
                  {getFeaturesTitle(plan.name)}
                </p>
                <ul className="space-y-1.5">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-1.5">
                      <div
                        className={`mt-0.5 rounded-full p-0.5 ${
                          plan.popular ? "bg-[#8F00FF]/15" : "bg-foreground/8"
                        }`}
                      >
                        <Check
                          className={`w-2.5 h-2.5 ${
                            plan.popular
                              ? "text-[#8F00FF]"
                              : "text-foreground/60"
                          }`}
                        />
                      </div>
                      <span
                        className={`text-[10px] sm:text-xs leading-relaxed ${
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

        {/* FAQ Section with Accordion */}
        <div className="max-w-lg mx-auto mb-20 sm:mb-24">
          <h3 className="text-lg sm:text-xl font-bold text-center mb-5 sm:mb-6">
            Frequently Asked Questions
          </h3>
          <Accordion type="single" collapsible className="w-full space-y-3">
            <AccordionItem value="item-1">
              <AccordionTrigger className="hover:no-underline">
                Can I switch plans anytime?
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-foreground/60 text-balance">
                <p>
                  Yes! You can upgrade or downgrade your plan at any time.
                  Changes are prorated automatically, so you&apos;ll only pay
                  the difference.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="hover:no-underline">
                What payment methods do you accept?
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-foreground/60 text-balance">
                We accept all major credit cards, PayPal, and wire transfers for
                annual plans. All payments are processed securely through our
                payment provider.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="hover:no-underline">
                Is there a long-term commitment?
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-foreground/60 text-balance">
                No commitment required. You can choose month-to-month billing or
                save with annual billing. Cancel anytime with no penalties.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger className="hover:no-underline">
                Do you offer refunds?
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-foreground/60 text-balance">
                Yes, we offer a 14-day money-back guarantee on all paid plans.
                If you&apos;re not satisfied, contact us for a full refund, no
                questions asked.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Money-back Guarantee - Clean Inline */}
        <div className="text-center mb-2 sm:mb-4">
          <div className="inline-flex items-center gap-2 px-4 py-2">
            <div className="w-5 h-5 rounded-full bg-[#8F00FF]/10 flex items-center justify-center flex-shrink-0">
              <Check className="w-3 h-3 text-[#8F00FF]" />
            </div>
            <p className="text-xs sm:text-sm font-semibold">
              14-day money-back guarantee
            </p>
            <span className="text-[10px] sm:text-xs text-foreground/60">
              • No questions asked
            </span>
          </div>
        </div>

        {/* Footer Info */}
        <div className="text-center">
          <p className="text-[10px] sm:text-xs text-foreground/50">
            Cancel anytime • No hidden fees • Instant activation • Questions?
            sales@weava.ai
          </p>
        </div>
      </div>
    </section>
  );
}
