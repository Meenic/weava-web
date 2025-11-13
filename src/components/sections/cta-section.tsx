import { createStoryAction } from "@/app/actions/story";
import { StoryPromptForm } from "../forms/story-prompt-form";

export function CtaSection() {
  return (
    <section className="w-full px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
      <div className="max-w-5xl mx-auto">
        {/* Gradient/Border Box Container */}
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl">
          {/* Background Gradient */}
          <div
            className="absolute inset-0 rounded-xl sm:rounded-2xl bg-linear-to-t from-primary/20 via-primary/10 to-transparent"
            aria-hidden="true"
          />

          {/* Content */}
          <div className="relative flex flex-col items-center justify-center gap-5 sm:gap-6 text-center rounded-xl sm:rounded-2xl p-8 sm:p-12 lg:p-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight max-w-2xl">
              What Story Will You Create?
            </h2>
            <p className="sm:text-lg md:text-xl font-medium text-foreground/90 max-w-lg leading-relaxed">
              Your next adventure is just a prompt away. Begin your epic now and
              see where the narrative takes you.
            </p>

            {/* Re-using the same form from the Hero section */}
            <div className="w-full max-w-[600px] mt-4 sm:mt-6">
              <StoryPromptForm
                action={createStoryAction}
                placeholder="A lost kingdom hidden in the clouds..."
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
