import "../styles/CategoryIconConfig.css";
import {
  Utensils,
  Bus,
  ShoppingCart,
  Film,
  Receipt,
  HeartPulse,
  MoreHorizontal,
} from "lucide-react";

export const CATEGORY_CONFIG = {
  Food: {
    icon: Utensils,
    color: "#EF4444",
  },
  Transport: {
    icon: Bus,
    color: "#A855F7",
  },
  Shopping: {
    icon: ShoppingCart,
    color: "#3B82F6",
  },
  Entertainment: {
    icon: Film,
    color: "#22C55E",
  },
  Bills: {
    icon: Receipt,
    color: "#F97316",
  },
  Health: {
    icon: HeartPulse,
    color: "#06B6D4",
  },
  Other: {
    icon: MoreHorizontal,
    color: "#6B7280",
  },
};
