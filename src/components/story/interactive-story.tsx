"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, BookOpen, Clock, User } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { getStoryData, makeChoice } from "@/lib/mock-story-data";
import type { StorySegment, Choice, StoryMetadata } from "@/types/story-types";

interface InteractiveStoryProps {
  storyId: string;
}

export function InteractiveStory({ storyId }: InteractiveStoryProps) {
  const [storyMetadata, setStoryMetadata] = useState<StoryMetadata | null>(null);
  const [currentSegment, setCurrentSegment] = useState<StorySegment | null>(null);
  const [storyHistory, setStoryHistory] = useState<StorySegment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize story
  useEffect(() => {
    const initializeStory = async () => {
      setIsLoading(true);
      try {
        const data = await getStoryData(storyId);
        setStoryMetadata(data.metadata);
        setCurrentSegment(data.currentSegment);
        setStoryHistory(data.history);
      } catch (err) {
        setError("Failed to load story. Please try again.");
        console.error("Story loading error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    initializeStory();
  }, [storyId]);

  const handleChoice = async (choice: Choice) => {
    setIsLoading(true);
    setError(null);

    try {
      // Add current segment to history before making choice
      if (currentSegment) {
        setStoryHistory(prev => [...prev, currentSegment]);
      }

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const nextSegment = await makeChoice(storyId, choice.id);
      setCurrentSegment(nextSegment);
    } catch (err) {
      setError("Failed to process your choice. Please try again.");
      console.error("Choice processing error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const restartStory = async () => {
    setIsLoading(true);
    try {
      const data = await getStoryData(storyId, true); // Reset flag
      setCurrentSegment(data.currentSegment);
      setStoryHistory([]);
    } catch (err) {
      setError("Failed to restart story. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && !currentSegment) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-2 border-[#8F00FF] border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-lg font-medium">Loading your story...</p>
        </div>
      </div>
    );
  }

  if (error && !currentSegment) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md mx-4">
          <CardContent className="text-center py-8">
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-[#8F00FF]/5">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          
          {storyMetadata && (
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="flex items-center gap-1">
                <BookOpen className="w-3 h-3" />
                {storyMetadata.genre}
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {storyMetadata.estimatedTime}
              </Badge>
            </div>
          )}
        </div>

        {/* Story Title */}
        {storyMetadata && (
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {storyMetadata.title}
            </h1>
            <p className="text-muted-foreground flex items-center justify-center gap-1">
              <User className="w-4 h-4" />
              by {storyMetadata.author}
            </p>
          </div>
        )}

        {/* Story Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Story History (Hidden on mobile, sidebar on desktop) */}
          <div className="hidden lg:block">
            <Card className="sticky top-8">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Story Progress
                </h3>
                <ScrollArea className="h-[400px]">
                  <div className="space-y-3">
                    {storyHistory.map((segment, index) => (
                      <div key={index} className="text-sm p-3 bg-muted/50 rounded-lg">
                        <p className="line-clamp-3">{segment.text}</p>
                        {segment.choiceMade && (
                          <p className="text-[#8F00FF] font-medium mt-2 text-xs">
                            → {segment.choiceMade}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={restartStory}
                  className="w-full mt-4"
                  disabled={isLoading}
                >
                  Restart Story
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Story Content */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {currentSegment && (
                <motion.div
                  key={currentSegment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="mb-6">
                    <CardContent className="p-6 md:p-8">
                      <div className="prose prose-lg max-w-none">
                        <p className="text-lg leading-relaxed whitespace-pre-wrap">
                          {currentSegment.text}
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Choices */}
                  {currentSegment.choices && currentSegment.choices.length > 0 && (
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-semibold mb-4">
                          What do you choose?
                        </h3>
                        <div className="space-y-3">
                          {currentSegment.choices.map((choice, index) => (
                            <motion.div
                              key={choice.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                            >
                              <Button
                                variant="outline"
                                className="w-full text-left justify-start h-auto p-4 hover:bg-[#8F00FF]/5 hover:border-[#8F00FF]/30"
                                onClick={() => handleChoice(choice)}
                                disabled={isLoading}
                              >
                                <div>
                                  <div className="font-medium mb-1">
                                    {choice.text}
                                  </div>
                                  {choice.consequence && (
                                    <div className="text-sm text-muted-foreground">
                                      {choice.consequence}
                                    </div>
                                  )}
                                </div>
                              </Button>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Story End */}
                  {currentSegment.isEnd && (
                    <Card className="mt-6 border-[#8F00FF]/20">
                      <CardContent className="p-6 text-center">
                        <h3 className="text-2xl font-bold mb-4 text-[#8F00FF]">
                          The End
                        </h3>
                        <p className="text-muted-foreground mb-6">
                          Thank you for experiencing this interactive story!
                        </p>
                        <div className="flex gap-4 justify-center">
                          <Button onClick={restartStory} disabled={isLoading}>
                            Play Again
                          </Button>
                          <Button variant="outline" asChild>
                            <Link href="/">
                              Explore More Stories
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Loading State */}
            {isLoading && currentSegment && (
              <div className="text-center py-8">
                <div className="animate-spin h-6 w-6 border-2 border-[#8F00FF] border-t-transparent rounded-full mx-auto mb-3" />
                <p className="text-muted-foreground">Processing your choice...</p>
              </div>
            )}

            {/* Error State */}
            {error && (
              <Card className="mt-4 border-red-200">
                <CardContent className="p-4 text-center">
                  <p className="text-red-600 mb-3">{error}</p>
                  <Button variant="outline" onClick={() => setError(null)}>
                    Dismiss
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}