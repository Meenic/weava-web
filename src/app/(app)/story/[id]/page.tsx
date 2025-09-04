import { InteractiveStory } from "@/components/story/interactive-story";

interface StoryPageProps {
  params: Promise<{ id: string }>;
}

export default async function StoryPage({ params }: StoryPageProps) {
  const { id } = await params;

  return (
    <div className="min-h-screen bg-background">
      <InteractiveStory storyId={id} />
    </div>
  );
}