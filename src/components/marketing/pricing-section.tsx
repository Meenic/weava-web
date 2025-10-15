import { Button } from "../ui/button";
import { Check } from "lucide-react";

const pricingPlans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    features: ["5 stories per month", "Basic templates", "Community support"],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: "$19",
    period: "month",
    features: ["Unlimited stories", "Advanced templates", "Priority support"],
    cta: "Start Creating",
    popular: true,
  },
];

export function PricingSection() {
  return (
    <section className="py-32 lg:py-36 px-4 sm:px-6 relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 -top-40 -z-10 blur-3xl sm:-top-80">
        <div
          className="left-1/2 relative aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-[#8F00FF]/80 opacity-30 sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>

      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.18),hsl(var(--primary)/0.08)_70%,transparent_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)/0.22),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,hsl(var(--primary)/0.13),transparent_60%)]" />
      </div>

      <div className="max-w-sm md:max-w-4xl lg:max-w-6xl mx-auto relative z-10">
        <div className="text-center lg:text-left mb-12">
          <h2 className="scroll-m-20 text-4xl md:text-5xl lg:text-6xl [font-family:var(--font-geist-mono)] font-bold tracking-tight mb-4">
            Pricing
          </h2>
          <p className="text-xl md:text-2xl font-semibold text-foreground/90 max-w-md mx-auto lg:mx-0">
            Choose the plan that fits your storytelling needs
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-3xl mx-auto">
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-3xl p-6 md:p-10 border ${
                plan.popular
                  ? "bg-card/90 backdrop-blur-md border-[#8F00FF]"
                  : "bg-card/60 backdrop-blur-md border-border"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="bg-[#8F00FF] text-white px-4 py-1.5 rounded-full text-sm font-bold">
                    POPULAR
                  </div>
                </div>
              )}

              <div className="text-center mb-8 md:mb-12">
                <h3 className="text-2xl md:text-3xl font-bold mb-3">
                  {plan.name}
                </h3>
                <div className="mb-6">
                  <span className="text-4xl md:text-6xl font-bold">
                    {plan.price}
                  </span>
                  {plan.price !== "$0" && (
                    <span className="text-lg text-muted-foreground">
                      /{plan.period}
                    </span>
                  )}
                </div>
              </div>

              <div className="mb-8 sm:mb-10 md:mb-12">
                <ul className="space-y-3 sm:space-y-4">
                  {plan.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-3 sm:gap-4"
                    >
                      <Check className="w-5 h-5 sm:w-6 sm:h-6 text-[#8F00FF] flex-shrink-0" />
                      <span className="text-base sm:text-lg font-medium">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <Button
                className={`w-full rounded-full text-base sm:text-lg font-bold py-4 sm:py-6 ${
                  plan.popular &&
                  "bg-[#8F00FF] hover:bg-[#8F00FF]/90 text-white"
                }`}
                size="lg"
                variant={plan.popular ? "default" : "outline"}
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
