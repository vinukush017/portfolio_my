# JavaScript Closures and Hoisting: From Fundamentals to Interview Questions

## Subtitle

Understand scope, lexical environments, closures, and hoisting with clear examples you can use in real projects and technical interviews.

Closures and hoisting are two of the most frequently discussed JavaScript concepts in frontend interviews. They can feel confusing because they describe what JavaScript does before and while our code runs—not just what we see written on the screen.

The good news is that both concepts become much easier once we understand scope and execution context. This guide starts with those foundations, builds the concepts step by step, and finishes with common interview questions.

## 1. Start with scope

Scope determines where a variable can be accessed.

JavaScript mainly uses three kinds of scope:

- **Global scope:** available throughout the program.
- **Function scope:** available only inside a function.
- **Block scope:** available inside a block such as an `if` statement or loop.

```js
const appName = "Learning App"; // Global scope

function showUser() {
  const userName = "Vinay"; // Function scope

  if (true) {
    const role = "Developer"; // Block scope
    console.log(appName, userName, role);
  }

  // console.log(role); // ReferenceError
}
```

Variables declared with `let` and `const` are block-scoped. Variables declared with `var` are function-scoped, which is one reason modern JavaScript generally prefers `let` and `const`.

## 2. What is lexical scope?

Lexical scope means that a function can access variables based on **where the function was written**, not where it is called.

```js
const language = "JavaScript";

function outer() {
  const topic = "Closures";

  function inner() {
    console.log(`${topic} in ${language}`);
  }

  inner();
}

outer(); // Closures in JavaScript
```

The `inner` function can access its own scope, the scope of `outer`, and the global scope. This chain of accessible scopes is called the **scope chain**.

Lexical scope is the foundation of closures.

## 3. What is a closure?

A closure is created when a function remembers and continues to access variables from its lexical scope, even after the outer function has finished running.

```js
function createCounter() {
  let count = 0;

  return function increment() {
    count += 1;
    return count;
  };
}

const counter = createCounter();

console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3
```

When `createCounter()` finishes, we might expect `count` to disappear. However, the returned `increment` function still references it. JavaScript keeps that lexical environment available, allowing the counter to preserve its state.

### Interview-ready definition

> A closure is the combination of a function and the lexical environment in which that function was created. It allows the function to access outer-scope variables even after the outer function has returned.

Try to explain the concept in your own words rather than only memorizing the definition.

## 4. Practical uses of closures

### Data privacy

Closures can keep values private and expose only the operations that should modify them.

```js
function createBankAccount(initialBalance) {
  let balance = initialBalance;

  return {
    deposit(amount) {
      if (amount > 0) balance += amount;
    },
    getBalance() {
      return balance;
    },
  };
}

const account = createBankAccount(1000);
account.deposit(500);

console.log(account.getBalance()); // 1500
// account.balance is not directly available
```

### Function factories

A function factory creates specialized functions.

```js
function multiplyBy(multiplier) {
  return (number) => number * multiplier;
}

const double = multiplyBy(2);
const triple = multiplyBy(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15
```

### Event handlers and callbacks

Callbacks often use values from the scope where they were created.

```js
function createClickHandler(productId) {
  return function handleClick() {
    console.log(`Opening product ${productId}`);
  };
}

const openProduct = createClickHandler(42);
openProduct(); // Opening product 42
```

Closures also appear in timers, memoization, React hooks, and module patterns.

## 5. A classic closure interview question

What does this code print?

```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
```

It prints:

```text
3
3
3
```

`var` creates one function-scoped variable shared by all three callbacks. The callbacks run after the loop has finished, when `i` is already `3`.

Using `let` fixes it:

```js
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
```

This prints `0`, `1`, and `2` because `let` creates a new block-scoped binding for each loop iteration.

Before `let` existed, an immediately invoked function expression was a common solution:

```js
for (var i = 0; i < 3; i++) {
  ((currentIndex) => {
    setTimeout(() => console.log(currentIndex), 0);
  })(i);
}
```

## 6. What is hoisting?

Hoisting describes how JavaScript processes declarations before executing code in a scope.

It is often explained as “JavaScript moves declarations to the top,” but the code is not physically moved. A more accurate explanation is that bindings are created during the creation phase of the execution context.

Different declarations are initialized differently, so they behave differently before their written line.

## 7. Function declaration hoisting

Function declarations are fully available before the line where they appear.

```js
greet(); // Hello!

function greet() {
  console.log("Hello!");
}
```

The function binding is created and initialized with the function during the creation phase.

## 8. `var` hoisting

A `var` declaration is hoisted and initialized with `undefined`.

```js
console.log(score); // undefined
var score = 10;
console.log(score); // 10
```

Conceptually, it behaves somewhat like this:

```js
var score;
console.log(score);
score = 10;
```

Only the declaration receives this treatment, not the assignment.

This behavior can hide bugs, which is another reason to prefer `const` by default and `let` when reassignment is required.

## 9. `let`, `const`, and the Temporal Dead Zone

Bindings for `let` and `const` are created when the scope begins, but they are not initialized until execution reaches their declaration.

```js
console.log(userName); // ReferenceError
const userName = "Vinay";
```

The period between entering the scope and reaching the declaration is called the **Temporal Dead Zone**, or TDZ.

The variable exists, but it cannot be accessed yet. This prevents code from silently receiving `undefined` before initialization.

`const` must also receive a value at declaration time and cannot later be reassigned. It does not make an object immutable; it prevents the variable from pointing to a different value.

## 10. Function expressions and arrow functions

Function expressions follow the hoisting behavior of the variable holding them.

```js
sayHello(); // TypeError: sayHello is not a function

var sayHello = function () {
  console.log("Hello");
};
```

Here, `sayHello` is initially `undefined`, so calling it fails.

With `const`, accessing it before declaration produces a `ReferenceError` because of the TDZ:

```js
sayHello(); // ReferenceError

const sayHello = () => {
  console.log("Hello");
};
```

This is different from a function declaration, which can be called before its written definition.

## 11. Compare declarations at a glance

| Declaration | Binding created early? | Initial value before declaration | Accessible before declaration? |
|---|---:|---|---:|
| `function` declaration | Yes | Complete function | Yes |
| `var` | Yes | `undefined` | Yes |
| `let` | Yes | Uninitialized | No — TDZ |
| `const` | Yes | Uninitialized | No — TDZ |

## 12. Common interview questions

### What is the difference between scope and closure?

Scope defines where variables are accessible. A closure is a function retaining access to variables from its lexical scope over time.

### Do closures copy outer variables?

No. A closure keeps access to the variable binding, not a frozen copy of its value. If the binding changes, the closure observes the current value.

### Can closures cause memory problems?

Yes. Variables referenced by a reachable closure cannot be garbage-collected. This is normally useful, but retaining large objects or unnecessary event handlers can increase memory usage.

### Are `let` and `const` hoisted?

Yes, their bindings are created when the scope begins. However, they remain uninitialized in the Temporal Dead Zone and cannot be accessed before their declarations.

### What is the difference between `undefined` and a `ReferenceError` here?

Accessing a hoisted `var` before assignment returns `undefined`. Accessing a `let` or `const` binding inside its TDZ throws a `ReferenceError`.

### What will this print?

```js
var value = 1;

function test() {
  console.log(value);
  var value = 2;
}

test();
```

It prints `undefined`. The local `var value` is hoisted inside `test`, so it shadows the global variable before the assignment runs.

## 13. Key points to remember

- JavaScript uses lexical scope: accessibility depends on where functions are defined.
- A closure lets a function retain access to its outer lexical environment.
- Closures are useful for private state, function factories, callbacks, and memoization.
- Hoisting is the early creation of declarations during execution-context setup.
- Function declarations are fully initialized before execution.
- `var` is initialized with `undefined`.
- `let` and `const` stay uninitialized in the Temporal Dead Zone.
- Prefer `const`, use `let` when reassignment is necessary, and avoid `var` in modern code.

Closures and hoisting are not isolated tricks. They describe the rules JavaScript follows whenever functions and variables are created. Once those rules are clear, many “tricky” interview questions become predictable.

---

Try explaining each example aloud before checking the answer. If you can describe what JavaScript creates, which scope owns each variable, and when each line runs, you are building understanding—not just memorizing output.
