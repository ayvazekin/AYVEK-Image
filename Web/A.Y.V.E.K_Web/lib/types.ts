export type ModelType = "A1" | "A2" | "A3"
export type AspectRatio = "horizontal" | "vertical"
export type OutputCount = 1 | 2

export const MODEL_COLORS = {
  A1: {
    primary: "#3B82F6",
    secondary: "#1D4ED8",
    glow: "rgba(59, 130, 246, 0.5)",
  },
  A2: {
    primary: "#F59E0B",
    secondary: "#D97706",
    glow: "rgba(245, 158, 11, 0.5)",
  },
  A3: {
    primary: "#8B5CF6",
    secondary: "#7C3AED",
    glow: "rgba(139, 92, 246, 0.5)",
  },
} as const
