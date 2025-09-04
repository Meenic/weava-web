export interface Choice {
  id: string;
  text: string;
  consequence?: string;
}

export interface StorySegment {
  id: string;
  text: string;
  choices?: Choice[];
  isEnd?: boolean;
  choiceMade?: string; // For history tracking
}

export interface StoryMetadata {
  id: string;
  title: string;
  author: string;
  genre: string;
  estimatedTime: string;
  description: string;
}

export interface StoryData {
  metadata: StoryMetadata;
  currentSegment: StorySegment;
  history: StorySegment[];
}