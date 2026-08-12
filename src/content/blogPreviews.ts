export type BlogPreviewBlock = {
  type: "heading" | "paragraph" | "code";
  content: string;
};

export const BLOG_PREVIEWS = {
  closures: [
    {
      type: "paragraph",
      content: "Closures and hoisting are two of the most frequently discussed JavaScript concepts in frontend interviews. They can feel confusing because they describe what JavaScript does before and while our code runs—not just what we see written on the screen.",
    },
    {
      type: "paragraph",
      content: "Both concepts become much easier once we understand scope and execution context. Let’s build that foundation step by step.",
    },
    { type: "heading", content: "Start with scope" },
    {
      type: "paragraph",
      content: "Scope determines where a variable can be accessed. JavaScript mainly uses global scope, function scope, and block scope. Variables declared with let and const are block-scoped, while var is function-scoped.",
    },
    {
      type: "code",
      content: `const appName = "Learning App";

function showUser() {
  const userName = "Vinay";

  if (true) {
    const role = "Developer";
    console.log(appName, userName, role);
  }

  // console.log(role); // ReferenceError
}`,
    },
    { type: "heading", content: "What is lexical scope?" },
    {
      type: "paragraph",
      content: "Lexical scope means that a function can access variables based on where the function was written, not where it is called. An inner function can access its own scope, its outer function’s scope, and the global scope. This scope chain is the foundation of closures.",
    },
    { type: "heading", content: "What is a closure?" },
    {
      type: "paragraph",
      content: "A closure is created when a function remembers and continues to access variables from its lexical scope, even after the outer function has finished running.",
    },
    {
      type: "code",
      content: `function createCounter() {
  let count = 0;

  return function increment() {
    count += 1;
    return count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3`,
    },
    {
      type: "paragraph",
      content: "When createCounter finishes, the returned function still references count. JavaScript keeps that lexical environment available, allowing the counter to preserve its state.",
    },
  ],
  reactArchitecture: [
    {
      type: "paragraph",
      content: "Building the first version of a React application is usually straightforward. The difficult part begins later: a new workflow overlaps with an old one, state starts moving across unrelated components, and a change that should take an hour takes an afternoon.",
    },
    {
      type: "paragraph",
      content: "This is rarely a React problem. It is usually a boundaries problem. I judge an architecture by one question: how safely can the next developer change it?",
    },
    { type: "heading", content: "Start with product responsibilities" },
    {
      type: "paragraph",
      content: "I avoid organizing an entire application around technical categories such as components, hooks, and utils. Those folders look clean at first, but they become large collections of unrelated files. Instead, I group most code by product responsibility.",
    },
    {
      type: "code",
      content: `src/
  features/
    authentication/
    projects/
    billing/
  components/
    ui/
  services/
  routes/`,
    },
    {
      type: "paragraph",
      content: "A feature can own its components, hooks, API functions, types, and tests. Shared UI primitives remain outside features because they describe the design system rather than one business workflow.",
    },
    { type: "heading", content: "Keep state close to its owner" },
    {
      type: "paragraph",
      content: "Not all state deserves a global store. I separate local interface state, server state, and genuinely shared client state. Local state should remain local, while server data should be managed as server state rather than copied into several components.",
    },
    {
      type: "paragraph",
      content: "The goal is not to minimize state. The goal is to give every piece of state one clear owner. That single decision prevents a large amount of accidental complexity as a product grows.",
    },
  ],
} satisfies Record<string, BlogPreviewBlock[]>;

export type BlogPreviewId = keyof typeof BLOG_PREVIEWS;
