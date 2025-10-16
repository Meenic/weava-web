import { StyledTextarea } from "../common/styled-textarea";

export function HeroSection() {
  return (
    <section className="min-h-[600px] max-h-[910px] h-screen flex items-center justify-center relative overflow-hidden">
      {/* Top Gradient Blob */}
      <div className="pointer-events-none absolute inset-x-0 -top-40 -z-10 blur-3xl sm:-top-80">
        <div
          className="left-1/2 relative aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-[#8F00FF]/80 opacity-30 sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>

      {/* Gradient Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(143,0,255,0.18),rgba(143,0,255,0.08)_70%,transparent_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(143,0,255,0.22),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(143,0,255,0.13),transparent_60%)]" />
      </div>

      {/* Bottom Fade Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-[30%] bg-gradient-to-t from-background to-transparent" />

      {/* Content */}
      <div className="flex flex-col items-center justify-center max-w-5xl px-4 text-center relative z-10">
        <h1 className="scroll-m-20 text-4xl md:text-6xl lg:text-7xl [font-family:var(--font-geist-mono)] font-bold tracking-tight text-balance mb-6 md:mb-8">
          AI Interactive Storytelling
        </h1>
        <p className="md:text-xl lg:text-2xl font-semibold max-w-md lg:max-w-lg leading-relaxed text-foreground/90 mb-8">
          Create dynamic, choice-driven narratives that evolve through your
          decisions.
        </p>
        <StyledTextarea />
      </div>
    </section>
  );
}
