import { createStoryAction } from "@/app/actions/story";
import { StoryPromptForm } from "../forms/story-prompt-form";

export function HeroSection() {
  return (
    <section className="relative flex items-center justify-center px-6 pt-32 pb-20 overflow-hidden">
      {/* top gradient */}
      <div
        className="absolute top-0 left-0 w-full h-64 bg-linear-to-b from-primary/20 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      {/* main content */}
      <div className="relative flex flex-col items-center justify-center gap-5 sm:gap-6 max-w-5xl w-full text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl max-w-3xl font-mono font-bold leading-[1.1]">
          AI Interactive Storytelling
        </h1>
        <p
          className="sm:text-lg md:text-xl font-medium text-foreground/90 max-w-sm leading-relaxed"
        >
          Create dynamic, choice-driven narratives that evolve through your
          decisions.
        </p>

        <div className="w-full max-w-[600px] mt-4 sm:mt-6">
          <StoryPromptForm
            action={createStoryAction}
            placeholder="A cyberpunk detective who finds a mysterious, glowing orb..."
          />
        </div>
      </div>
    </section>
  );
}
