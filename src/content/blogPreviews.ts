export type BlogPreviewBlock =
  | {
      type: "heading";
      content: string;
    }
  | {
      type: "paragraph";
      content: string;
    }
  | {
      type: "code";
      content: string;
    };

export const BLOG_PREVIEWS = {
  closures: [
    {
      type: "paragraph",
      content:
        "Closures and hoisting are two of the most common JavaScript topics in technical interviews. They can feel confusing because they describe how JavaScript manages scope, memory, and execution—not just what appears in the source code.",
    },
    {
      type: "paragraph",
      content:
        "Both concepts become easier to understand once we have a clear mental model of scope and execution context. Let’s build that foundation step by step.",
    },

    {
      type: "heading",
      content: "Start with scope",
    },

    {
      type: "paragraph",
      content:
        "Scope determines where a variable can be accessed in your program. JavaScript primarily works with global scope, function scope, and block scope. Variables declared with let and const are block-scoped, while var is function-scoped.",
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

  // console.log(role);
  // ReferenceError: role is not defined
}`,
    },

    {
      type: "heading",
      content: "What is lexical scope?",
    },

    {
      type: "paragraph",
      content:
        "Lexical scope means a function can access variables based on where that function was defined in the source code. An inner function can access its own scope, the scope of its parent functions, and the global scope. This chain of accessible scopes is the foundation of closures.",
    },

    {
      type: "heading",
      content: "What is a closure?",
    },

    {
      type: "paragraph",
      content:
        "A closure is created when a function continues to access variables from its lexical scope even after the outer function that created those variables has finished executing.",
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
      content:
        "Even after createCounter() has finished executing, the returned increment function still references count. Because that variable is still being used, JavaScript keeps the relevant lexical environment available.",
    },

    {
      type: "heading",
      content: "Why closures matter",
    },

    {
      type: "paragraph",
      content:
        "Closures are not just an interview concept. They are commonly used for encapsulation, state preservation, callbacks, event handlers, factory functions, and many patterns found throughout modern JavaScript applications.",
    },
  ],

  reactArchitecture: [
    {
      type: "paragraph",
      content:
        "Building the first version of a React application is usually straightforward. The harder part comes later: new workflows overlap with existing ones, state starts moving between unrelated components, and changes that should be simple begin affecting several parts of the application.",
    },

    {
      type: "paragraph",
      content:
        "This is rarely a React problem by itself. It is usually a boundaries problem. One of the questions I use when evaluating an architecture is: how safely can the next developer understand and change this code?",
    },

    {
      type: "heading",
      content: "Organize around product responsibilities",
    },

    {
      type: "paragraph",
      content:
        "I avoid organizing an entire application around broad technical categories such as components, hooks, and utils. Those folders often begin clean but gradually become large collections of unrelated files. Instead, I prefer grouping most application code around product responsibilities.",
    },

    {
      type: "code",
      content: `src/
  features/
    authentication/
      components/
      hooks/
      services/
      types/

    projects/
      components/
      hooks/
      services/
      types/

    billing/
      components/
      services/

  components/
    ui/

  services/
  routes/`,
    },

    {
      type: "paragraph",
      content:
        "A feature can own the components, hooks, API functions, types, and tests that belong to its workflow. Shared UI primitives remain outside feature folders because they describe the application's reusable design system rather than one specific business capability.",
    },

    {
      type: "heading",
      content: "Keep state close to its owner",
    },

    {
      type: "paragraph",
      content:
        "Not every piece of state belongs in a global store. I separate local interface state, server state, and genuinely shared client state. Local state should usually remain close to the component that owns it, while server data should be managed as server state instead of being copied into multiple components.",
    },

    {
      type: "paragraph",
      content:
        "The goal is not to minimize the amount of state in an application. The goal is to give each piece of state one clear owner. That decision alone prevents a significant amount of accidental complexity as a product grows.",
    },

    {
      type: "heading",
      content: "Prefer clear boundaries over clever abstractions",
    },

    {
      type: "paragraph",
      content:
        "An abstraction should remove meaningful repetition or protect an important boundary. Creating abstractions too early can make a codebase harder to understand rather than easier. I prefer simple implementations first, then extracting patterns once the duplication and responsibilities are clear.",
    },
  ],
} satisfies Record<string, BlogPreviewBlock[]>;

export type BlogPreviewId = keyof typeof BLOG_PREVIEWS;