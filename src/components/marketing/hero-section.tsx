import { StyledTextarea } from "../common/styled-textarea";

export function HeroSection() {
  return (
    <section className="flex items-center justify-center px-4 pt-28 pb-16 sm:pt-32 sm:pb-20 md:pt-36 md:pb-24">
      {/* Top Fade Gradient */}
      <div className="absolute top-0 left-0 right-0 h-[30%] bg-gradient-to-b from-[#8F00FF]/20 to-transparent" />

      <div className="max-w-4xl mx-auto w-full">
        <div className="flex flex-col items-center text-center gap-5 sm:gap-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl max-w-3xl [font-family:var(--font-geist-mono)] font-bold leading-[1.1]">
            AI Interactive Storytelling
          </h1>

          <p className="sm:text-lg md:text-xl font-medium text-foreground/90 max-w-sm leading-relaxed">
            Create dynamic, choice-driven narratives that evolve through your
            decisions.
          </p>

          <div className="w-full max-w-[650px] mt-4 sm:mt-6">
            <StyledTextarea
              placeholder="Describe your story idea..."
              className="w-full h-[200px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
