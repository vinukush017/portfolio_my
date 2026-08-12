import type { BlogPreviewId } from "../content/blogPreviews";

export type BlogPost = {
  title: string;
  excerpt: string;
  tags: string[];
  readTime: string;
  publishedAt?: string;
  url?: string;
  previewId?: BlogPreviewId;
};

// After publishing a draft on Medium, paste its URL and publication date here.
// Example: url: "https://medium.com/@your-handle/article-slug"
export const BLOG_POSTS: BlogPost[] = [
  {
    title: "JavaScript Closures and Hoisting: Fundamentals to Interview Questions",
    excerpt:
      "Learn how JavaScript scope, lexical environments, closures, and hoisting work—with clear examples and interview-ready explanations.",
    tags: ["JavaScript", "Closures", "Hoisting"],
    readTime: "10 min read",
    publishedAt: "Published on Medium",
    url: "https://medium.com/@vinukush005/javascript-closures-and-hoisting-a-practical-guide-for-interviews-and-real-projects-b9c86a4d73fe?sharedUserId=vinukush005",
    previewId: "closures",
  },
  {
    title: "How I Structure React Applications That Stay Easy to Change",
    excerpt:
      "A practical approach to component boundaries, state ownership, and feature organization for React products that need to grow.",
    tags: ["React", "Architecture", "TypeScript"],
    readTime: "7 min read",
    publishedAt: "Published on Medium",
    url: "https://medium.com/@vinukush005/how-i-structure-react-applications-that-stay-easy-to-change-f1f9f46b9b47",
    previewId: "reactArchitecture",
  },
  {
    title: "JavaScript Strings and Arrays: A Beginner-to-Interview Guide",
    excerpt:
      "Build strong JavaScript fundamentals with essential string and array operations, practical patterns, and common interview problems.",
    tags: ["JavaScript", "Strings", "Arrays"],
    readTime: "12 min read",
    url: "",
  },
];
