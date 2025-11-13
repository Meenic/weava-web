import { createId } from "@paralleldrive/cuid2";

type ResourceType = "story" | "chapter" | "scene";

export function generateId(type: ResourceType): string {
  const prefix = type.substring(0, 3);
  return `${prefix}_${createId()}`;
}
