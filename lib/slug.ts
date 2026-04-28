export function getHabitSlug(name: string): string {
  return name
    .toLowerCase() // [cite: 115]
    .trim() // [cite: 116]
    .replace(/[^a-z0-9\s-]/g, '') // Remove non-alphanumeric characters except hyphens and spaces [cite: 118]
    .replace(/\s+/g, '-'); // Replace one or more spaces with a single hyphen [cite: 117]
}