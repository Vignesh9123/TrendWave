import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertHtmlTextToPlainText(htmlText: string): string {
  const doc = new DOMParser().parseFromString(htmlText, 'text/html');
  return doc.body.textContent || "Unknown Title";
}