import Image, { StaticImageData } from "next/image";
import { cn } from "@/lib/utils/cn";

interface FeatureCardProps {
  title: string;
  description?: string;
  className?: string;
  image?: StaticImageData | string;
  imagePosition?: "top" | "bottom" | "background";
  imageAlign?: "left" | "right" | "center";
  imageAlt?: string;
  priority?: boolean;
  bodyContent?: React.ReactNode;
}

// import featuresBrain from "@/assets/images/features-brain.png";
import featuresMaze from "@/assets/images/features-maze.png";
import featuresTree from "@/assets/images/features-tree.png";

const GradientBox = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("relative w-full h-full overflow-hidden", className)}>
      <div
        className="absolute inset-0 rounded-xl sm:rounded-2xl bg-linear-to-t from-primary/20 via-primary/10 to-transparent"
        aria-hidden="true"
      />
      <div className="relative h-full border-2 border-primary/20 rounded-xl sm:rounded-2xl p-6 sm:p-8">
        {children}
      </div>
    </div>
  );
};

const FeatureCard = ({
  title,
  description,
  className,
  image,
  imagePosition = "top",
  imageAlign = "center",
  imageAlt = "",
  priority = false,
  bodyContent,
}: FeatureCardProps) => {
  return (
    <GradientBox className={className}>
      <div
        className={cn(
          "flex flex-col h-full relative",
          imagePosition === "background" ? "justify-end" : "justify-between"
        )}
      >
        {image && imagePosition === "background" && (
          <div
            className={cn(
              "absolute inset-0 pointer-events-none",
              "flex justify-center",
              imageAlign === "right" && "sm:justify-end",
              imageAlign === "left" && "sm:justify-start"
            )}
          >
            <div
              className={cn(
                "relative -my-[10%]",
                "w-[80%]", // Responsive width
                "sm:w-[60%]",
                imageAlign === "right" && "sm:left-20",
                imageAlign === "left" && "sm:right-20"
              )}
            >
              <Image
                src={image}
                alt={imageAlt}
                fill
                className="object-cover opacity-25"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 70vw, 50vw"
                priority={priority}
              />
            </div>
          </div>
        )}

        <div
          className={cn(
            "flex flex-col h-full",
            imagePosition === "top" ? "justify-between" : "justify-end"
          )}
        >
          {image && imagePosition === "top" && (
            <div className="relative w-full flex-1 min-h-[180px] sm:min-h-[220px] lg:min-h-60 flex items-center justify-center">
              <Image
                src={image}
                alt={imageAlt}
                fill
                className="object-contain"
                sizes="(max-width: 640px) 85vw, (max-width: 1024px) 40vw, 25vw"
                priority={priority}
              />
            </div>
          )}

          <div
            className={cn(
              "relative z-10 shrink-0",
              "flex flex-col",
              imagePosition === "background" && "max-w-xs sm:max-w-sm"
            )}
          >
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold leading-tight">
              {title}
            </h3>
            {description && (
              <p className="text-base sm:text-lg font-medium mt-2 leading-relaxed">
                {description}
              </p>
            )}
          </div>

          {bodyContent && (
            <div className="flex-1 flex items-center text-primary/60">
              {bodyContent}
            </div>
          )}

          {image && imagePosition === "bottom" && (
            <div className="relative w-full h-40 sm:h-48 lg:h-56 flex items-center justify-center shrink-0 -mb-4">
              <Image
                src={image}
                alt={imageAlt}
                fill
                className="object-contain"
                sizes="(max-width: 640px) 85vw, (max-width: 1024px) 40vw, 25vw"
                priority={priority}
              />
            </div>
          )}
        </div>
      </div>
    </GradientBox>
  );
};

const features: FeatureCardProps[] = [
  {
    title: "Shape a living, evolving story",
    className: "md:col-span-3 lg:col-span-1 lg:row-span-2",
    image: featuresTree,
    imagePosition: "top" as const,
    imageAlt: "Tree illustration representing branching story choices",
  },
  {
    title: "Deeply immersive worlds",
    description:
      "Explore rich environments and meet characters who react to your every move.",
    className: "md:col-span-3 lg:col-span-2",
    image: featuresMaze,
    imagePosition: "background" as const,
    imageAlign: "right" as const,
    imageAlt: "Maze illustration representing immersive world exploration",
  },
  {
    title: "Countless paths to discover",
    description: "Explore thousands of branching storylines.",
    className: "md:col-span-3 lg:col-span-1",
  },
  {
    title: "Your adventure, your rules",
    description: "Your imagination is the only limit.",
    className: "md:col-span-3 lg:col-span-1",
  },
] as const;

export function FeaturesSection() {
  return (
    <section className="w-full px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
      <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8 lg:space-y-10">
        <header className="text-center space-y-2 sm:space-y-3 pb-6 sm:pb-8 lg:pb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Stories for you.
          </h2>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 lg:auto-rows-fr gap-3 sm:gap-4">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} priority={false} />
          ))}
        </div>
      </div>
    </section>
  );
}
