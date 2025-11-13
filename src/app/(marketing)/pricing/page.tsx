export default function PricingPage() {
  return (
    <section className="relative flex items-center justify-center px-6 pt-32 pb-20 overflow-hidden">
      {/* top gradient */}
      <div className="absolute top-0 left-0 w-full h-64 bg-linear-to-b from-primary/20 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl md:text-5xl mb-6">
            A Plan for Every Creator
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-foreground/90 max-w-md md:max-w-xl mx-auto leading-relaxed">
            Start creating for free, no credit card required. Upgrade when
            you&apos;re ready to unlock advanced features for your growing
            audience.
          </p>
        </div>
      </div>
    </section>
  );
}
