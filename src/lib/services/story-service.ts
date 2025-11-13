import { StoryGeneratorService } from "@/lib/ai/services/story-generator";
import { StoryRepository } from "@/drizzle/repositories/story-repository";

export class StoryService {
  private aiService: StoryGeneratorService;
  private repository: StoryRepository;

  constructor() {
    this.aiService = new StoryGeneratorService();
    this.repository = new StoryRepository();
  }

  async createStoryFromSeed(userId: string, seed: string) {
    // Generate title and synopsis using AI
    const generated = await this.aiService.generateStorySetup(seed);

    // Save to database
    const story = await this.repository.create({
      userId,
      seed,
      title: generated.title,
      synopsis: generated.synopsis,
    });

    return story;
  }

  async getStory(storyId: string) {
    return this.repository.findById(storyId);
  }

  async getUserStories(userId: string) {
    return this.repository.findByUserId(userId);
  }
}
