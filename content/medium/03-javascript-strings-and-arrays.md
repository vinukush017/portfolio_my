# JavaScript Strings and Arrays: A Beginner-to-Interview Guide

## Subtitle

Learn the essential operations, practical patterns, common mistakes, and interview problems every JavaScript developer should understand.

Strings and arrays appear in almost every JavaScript application. We use strings for names, messages, URLs, and form values. We use arrays for users, products, tasks, search results, and nearly every collection returned by an API.

They are also central to coding interviews. Interviewers often use string and array problems to test whether a candidate understands loops, conditions, data transformation, time complexity, and JavaScript’s built-in methods.

This guide builds those fundamentals from the beginning and connects them to common interview patterns.

## Part 1: JavaScript strings

### What is a string?

A string is a sequence of characters used to represent text.

```js
const firstName = "Vinay";
const role = 'Developer';
const introduction = `${firstName} is a ${role}.`;
```

Template literals use backticks and make interpolation and multi-line text easier.

```js
const itemCount = 3;
console.log(`You have ${itemCount} items.`);
```

### Strings are immutable

JavaScript strings cannot be changed in place.

```js
const language = "javascript";
language[0] = "J";

console.log(language); // javascript
```

String methods return new strings instead of modifying the original value.

```js
const formatted = language[0].toUpperCase() + language.slice(1);
console.log(formatted); // Javascript
```

### Accessing characters

```js
const word = "hello";

console.log(word[0]); // h
console.log(word.at(-1)); // o
console.log(word.length); // 5
```

Indexes start at `0`. The final character is therefore at `length - 1`. The `at()` method also supports negative indexes.

## Essential string methods

### Changing letter case

```js
"JavaScript".toLowerCase(); // javascript
"JavaScript".toUpperCase(); // JAVASCRIPT
```

Case normalization is useful when comparing user input.

```js
const answer = " YES ";
const accepted = answer.trim().toLowerCase() === "yes";
```

### Removing surrounding whitespace

```js
"  hello  ".trim();      // "hello"
"  hello  ".trimStart(); // "hello  "
"  hello  ".trimEnd();   // "  hello"
```

### Finding text

```js
const sentence = "Learn JavaScript fundamentals";

sentence.includes("JavaScript"); // true
sentence.indexOf("JavaScript");  // 6
sentence.startsWith("Learn");    // true
sentence.endsWith("fundamentals"); // true
```

`includes()` answers whether text exists. `indexOf()` returns its first position or `-1` when it is missing.

### Extracting part of a string

```js
const value = "JavaScript";

value.slice(0, 4);  // "Java"
value.slice(4);     // "Script"
value.slice(-6);    // "Script"
```

The ending index is excluded. `slice()` is usually the clearest modern choice for extracting part of a string.

### Replacing text

```js
"I like Java".replace("Java", "JavaScript");
// "I like JavaScript"

"one one one".replaceAll("one", "two");
// "two two two"
```

`replace()` changes the first string match unless a global regular expression is used. `replaceAll()` replaces all matches.

### Splitting a string into an array

```js
"React,Node,TypeScript".split(",");
// ["React", "Node", "TypeScript"]

"hello".split("");
// ["h", "e", "l", "l", "o"]
```

`split()` is the bridge from many string problems to array methods.

## Part 2: JavaScript arrays

### What is an array?

An array is an ordered collection of values.

```js
const skills = ["JavaScript", "React", "Node.js"];

console.log(skills[0]); // JavaScript
console.log(skills.length); // 3
```

Arrays can contain different value types, but application code is usually easier to understand when one array represents one consistent kind of data.

### Arrays are mutable

Unlike strings, arrays can be changed in place.

```js
const numbers = [1, 2, 3];
numbers[0] = 10;

console.log(numbers); // [10, 2, 3]
```

This is important because some methods mutate the original array while others return a new one.

## Adding and removing array values

```js
const items = ["b", "c"];

items.push("d");    // add to end
items.pop();         // remove from end
items.unshift("a"); // add to beginning
items.shift();       // remove from beginning
```

All four methods mutate the original array. `push()` and `pop()` are generally cheaper than `shift()` and `unshift()` because changing the beginning may require reindexing the remaining elements.

## `slice()` versus `splice()`

These names are similar, but their behavior is different.

`slice()` returns a section without changing the original array:

```js
const numbers = [1, 2, 3, 4];
const middle = numbers.slice(1, 3);

console.log(middle);  // [2, 3]
console.log(numbers); // [1, 2, 3, 4]
```

`splice()` adds, removes, or replaces values and mutates the original array:

```js
const numbers = [1, 2, 3, 4];
numbers.splice(1, 2, 9);

console.log(numbers); // [1, 9, 4]
```

An interview-ready memory trick: **slice selects; splice changes.**

## Searching arrays

```js
const numbers = [4, 7, 10, 13];

numbers.includes(10);              // true
numbers.indexOf(10);               // 2
numbers.find((number) => number > 8); // 10
numbers.findIndex((number) => number > 8); // 2
```

Use `find()` when you need the first matching value. Use `findIndex()` when you need its position.

For objects, `includes()` compares references rather than object contents:

```js
const user = { id: 1 };
const users = [user];

users.includes(user); // true
users.includes({ id: 1 }); // false
users.some((item) => item.id === 1); // true
```

## The most important array iteration methods

### `forEach()` — perform an action

```js
const names = ["Asha", "Rahul", "Vinay"];
names.forEach((name) => console.log(name));
```

`forEach()` always returns `undefined`. Use it for side effects, not for creating a transformed array.

### `map()` — transform every value

```js
const prices = [100, 200, 300];
const discounted = prices.map((price) => price * 0.9);

console.log(discounted); // [90, 180, 270]
```

`map()` returns a new array with the same number of items.

### `filter()` — keep matching values

```js
const numbers = [1, 2, 3, 4, 5, 6];
const evenNumbers = numbers.filter((number) => number % 2 === 0);

console.log(evenNumbers); // [2, 4, 6]
```

### `reduce()` — combine values

```js
const prices = [100, 200, 300];
const total = prices.reduce((sum, price) => sum + price, 0);

console.log(total); // 600
```

The second argument, `0`, is the initial accumulator value. Providing an initial value makes the behavior clearer and avoids errors for empty arrays.

### `some()` and `every()` — test conditions

```js
const scores = [75, 82, 91];

scores.some((score) => score >= 90);  // true
scores.every((score) => score >= 60); // true
```

`some()` asks whether at least one item matches. `every()` asks whether all items match.

## Sorting arrays correctly

JavaScript’s default `sort()` compares values as strings.

```js
const numbers = [10, 2, 30];
numbers.sort();

console.log(numbers); // [10, 2, 30]
```

Use a comparator for numbers:

```js
numbers.sort((a, b) => a - b); // ascending
numbers.sort((a, b) => b - a); // descending
```

`sort()` mutates the array. Copy it first when the original order must remain unchanged:

```js
const sorted = [...numbers].sort((a, b) => a - b);
```

## Converting between strings and arrays

This pattern solves many interview problems.

```js
const reversed = "javascript"
  .split("")
  .reverse()
  .join("");

console.log(reversed); // tpircsavaj
```

The steps are:

1. `split("")` converts the string into characters.
2. `reverse()` reverses the array.
3. `join("")` combines the characters into a string.

## Common interview problems

### 1. Reverse a string

```js
function reverseString(value) {
  return value.split("").reverse().join("");
}

reverseString("hello"); // "olleh"
```

An interviewer may also ask you to solve it without `reverse()`:

```js
function reverseString(value) {
  let result = "";

  for (let index = value.length - 1; index >= 0; index -= 1) {
    result += value[index];
  }

  return result;
}
```

### 2. Check whether a string is a palindrome

A palindrome reads the same forward and backward.

```js
function isPalindrome(value) {
  const normalized = value.toLowerCase().replaceAll(" ", "");
  return normalized === normalized.split("").reverse().join("");
}

isPalindrome("Never odd or even"); // true
```

In a real interview, clarify whether punctuation, spaces, and letter case should be ignored.

### 3. Count character frequency

```js
function countCharacters(value) {
  const frequency = {};

  for (const character of value) {
    frequency[character] = (frequency[character] ?? 0) + 1;
  }

  return frequency;
}

countCharacters("hello");
// { h: 1, e: 1, l: 2, o: 1 }
```

Frequency maps are useful for anagrams, duplicate detection, and many counting problems.

### 4. Remove duplicate array values

```js
function uniqueValues(values) {
  return [...new Set(values)];
}

uniqueValues([1, 2, 2, 3, 3]); // [1, 2, 3]
```

For arrays of objects, choose the property that defines uniqueness:

```js
function uniqueUsers(users) {
  const seenIds = new Set();

  return users.filter((user) => {
    if (seenIds.has(user.id)) return false;
    seenIds.add(user.id);
    return true;
  });
}
```

### 5. Find the largest number

```js
function findLargest(numbers) {
  if (numbers.length === 0) return undefined;

  return numbers.reduce(
    (largest, number) => (number > largest ? number : largest),
    numbers[0]
  );
}
```

For smaller arrays, `Math.max(...numbers)` is concise. For very large arrays, spreading every item as a function argument can be unsafe, so iteration or `reduce()` is more robust.

### 6. Check whether two strings are anagrams

Two words are anagrams when they contain the same characters with the same frequencies.

```js
function normalize(value) {
  return value.toLowerCase().replaceAll(" ", "").split("").sort().join("");
}

function areAnagrams(first, second) {
  return normalize(first) === normalize(second);
}

areAnagrams("listen", "silent"); // true
```

Sorting is easy to explain and typically takes `O(n log n)` time. A frequency-map solution can achieve `O(n)` time.

## Mutation versus non-mutation

This distinction is frequently tested.

Methods that mutate the original array include:

- `push()`
- `pop()`
- `shift()`
- `unshift()`
- `splice()`
- `sort()`
- `reverse()`

Methods that return a new value without changing the original include:

- `map()`
- `filter()`
- `slice()`
- `concat()`
- `toSorted()`
- `toReversed()`

Modern `toSorted()` and `toReversed()` return new arrays, but check the runtime support required by your project.

## Time-complexity basics for interviews

You do not need advanced mathematics to discuss common operations:

- Access by index: usually `O(1)`
- `push()` and `pop()`: usually `O(1)`
- Searching with `find()` or `includes()`: `O(n)`
- `map()`, `filter()`, and `reduce()`: `O(n)`
- `shift()` and `unshift()`: `O(n)`
- Comparison sorting: generally `O(n log n)`

If you loop through an array inside another loop over the same data, the result is often `O(n²)`. A `Set` or `Map` can sometimes replace the inner search and improve the solution.

## Common mistakes to avoid

- Forgetting that indexes begin at zero.
- Using `forEach()` when you need a returned array.
- Expecting `map()` to filter items.
- Sorting numbers without a comparator.
- Forgetting that `sort()`, `reverse()`, and `splice()` mutate arrays.
- Comparing arrays or objects with `===` and expecting content comparison.
- Using `reduce()` without a clear initial value.
- Solving before clarifying empty input, casing, spaces, or duplicates.

## A simple interview approach

When you receive a string or array question:

1. Restate the problem in your own words.
2. Ask about inputs, empty values, casing, duplicates, and expected output.
3. Walk through one example manually.
4. Explain a straightforward solution first.
5. Write readable code with meaningful names.
6. Test normal cases and edge cases.
7. Discuss time and space complexity.
8. Optimize only when necessary.

Interviewers are not only checking whether you know a particular method. They want to see how you break down a problem and communicate your reasoning.

## Final revision checklist

Make sure you can explain and use:

- String immutability and array mutability
- `length`, indexing, `slice()`, `split()`, and `join()`
- `includes()`, `find()`, and `findIndex()`
- `map()`, `filter()`, `reduce()`, `some()`, and `every()`
- Numeric sorting with a comparator
- Mutation versus non-mutation
- `Set` and frequency-map patterns
- Basic `O(1)`, `O(n)`, `O(n log n)`, and `O(n²)` reasoning

Strong fundamentals make interview problems less intimidating. Instead of memorizing dozens of answers, learn what each operation does, whether it mutates data, what it returns, and how much work it performs. From there, most string and array problems become combinations of familiar patterns.

---

Practice by rewriting the examples without looking at the solution, then explain each one aloud as if you were speaking to an interviewer.
