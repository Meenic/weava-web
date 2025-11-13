import { StoryService } from "@/lib/services/story-service";

type StoryPageProps = {
  params: Promise<{ id: string }>;
};

export default async function StoryPage({ params }: StoryPageProps) {
  const storyService = new StoryService();
  const story = await storyService.getStory((await params).id);

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="space-y-6">
        <div>
          <p className="text-sm text-muted-foreground mb-2">
            {story.genre} • {story.tone} • {story.perspective}
          </p>
          <h1 className="scroll-m-20 text-4xl font-bold tracking-tight text-balance">
            {story.title}
          </h1>
        </div>

        <div className="prose prose-lg dark:prose-invert">
          <p className="mt-4 italic text-muted-foreground">
            Based on: &quot;{story.seed}&quot;
          </p>
          <div className="mt-4">
            {story.synopsis.split("\n").map((paragraph, i) => (
              <p key={i} className="leading-7 not-first:mt-6">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="pt-2 ">
          <p className="text-xs text-muted-foreground">
            Ready to begin your adventure? Chapters coming soon...
          </p>
        </div>
      </div>
    </div>
  );
}
