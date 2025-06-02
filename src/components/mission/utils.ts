"use client";
import { Achievement, Mission } from "@/types/common-types";
import { CardState } from "./types";

/**
 * Determines the card state based on the mission/achievement data
 */
export const getCardState = (data: Mission | Achievement): CardState => {
  if (data.currentProgress !== undefined) {
    return CardState.IN_PROGRESS;
  } else if (data.isClaim === false) {
    return CardState.COMPLETED;
  } else {
    return CardState.CLAIMED;
  }
};

/**
 * Extracts plain text from HTML content
 */
export const extractTextFromHtml = (html: string): string => {
  if (typeof window === "undefined" || !html) return "";

  // Create a temporary div to parse HTML
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+=/gi, "");

  // Get text content
  return tempDiv.textContent || tempDiv.innerText || "";
};
