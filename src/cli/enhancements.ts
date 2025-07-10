import type { PossibleEnhancements } from "@/types/enhancement";

export const enhancements: Record<PossibleEnhancements, any> = {
  tailwind: () => {
    console.log("installing tailwind....");
  },
  shacn: () => {
    console.log("installing shadcn....");
  },
  biome: () => {
    console.log("installing biome....");
  },
  query: () => {
    console.log("installing query....");
  },
};
