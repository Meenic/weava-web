import React from "react";

// --- DATA & TYPE (Unchanged) ---
interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "This is truly the future of storytelling. The depth of the branching narratives feels limitless, and the AI maintains context across every decision. It's wildly addictive.",
    name: "Alex J.",
    role: "Fantasy Author",
  },
  {
    quote:
      "I've never experienced an interactive story where my choices felt this impactful. It's like having a co-writer who knows exactly what to do next. Highly recommended for any genre fan.",
    name: "Mia C.",
    role: "Game Designer",
  },
  {
    quote:
      "The worlds generated are deeply immersive, surpassing anything I've seen in other AI tools. The character reactions are surprisingly nuanced and realistic.",
    name: "Ethan V.",
    role: "AI Enthusiast",
  },
  {
    quote:
      "As a hobbyist, this tool is incredible. It's easy to get started, but the settings allow for deep, granular control over the narrative AI. A+.",
    name: "Samira L.",
    role: "World-building Hobbyist",
  },
];

// --- 1. UPDATED TESTIMONIAL CARD ---
// Removed `max-w-lg` and `lg:ml-auto` to let the grid control sizing.

const TestimonialCard = ({ quote, name, role }: Testimonial) => {
  return (
    <div className="relative overflow-hidden rounded-xl sm:rounded-2xl">
      <div
        className="absolute inset-0 rounded-xl sm:rounded-2xl bg-linear-to-t from-primary/20 via-primary/10 to-transparent"
        aria-hidden="true"
      />
      {/* --- CHANGES ARE ON THIS LINE ---
        1. Added `h-full` to make the card stretch vertically.
        2. Added `justify-between` to push the author to the bottom.
      */}
      <div className="relative flex flex-col justify-between h-full border-2 border-primary/20 rounded-xl sm:rounded-2xl p-6 sm:p-8">
        <p className="font-semibold">&ldquo;{quote}&rdquo;</p>
        <div className="mt-5">
          <p className="text-sm font-bold text-foreground">{name}</p>
          <p className="text-sm text-primary/80">{role}</p>
        </div>
      </div>
    </div>
  );
};

// --- 2. UPDATED MAIN SECTION COMPONENT ---
// Changed the wrapper div to a responsive grid.

export function TestimonialsSection() {
  return (
    <section className="w-full px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16">
        <header className="lg:w-2/auto shrink-0 lg:sticky lg:top-24 h-fit space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight max-w-md">
            {/* (Bonus: Fixed typo in heading) */}
            Hear What Our Satisfied Creators Have to Say
          </h2>
          <p className="text-3xl sm:text-4xl lg:text-5xl">10.9K+</p>
        </header>

        {/* --- THIS IS THE RESPONSIVE GRID --- */}
        <div className="lg:w-3/5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
