import { ID } from "appwrite";
const generateSlug = (title: string): string => {
  if (!title) return ID.unique(); // Fallback to unique ID if title is empty
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with dashes
    .replace(/-+/g, "-") // Replace multiple dashes with a single one
    .slice(0, 36); // Limit to 36 characters
};

export default generateSlug;
