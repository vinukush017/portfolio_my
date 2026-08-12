# How I Structure React Applications That Stay Easy to Change

## Subtitle

A practical approach to component boundaries, state ownership, and feature organization for products that need to grow.

Building the first version of a React application is usually straightforward. The difficult part begins later: a new workflow overlaps with an old one, state starts moving across unrelated components, and a change that should take an hour takes an afternoon.

This is rarely a React problem. It is usually a boundaries problem.

After working on production applications, I have learned to judge an architecture by one question: **how safely can the next developer change it?** A good structure does not try to predict every future requirement. It makes the common changes obvious and keeps unrelated decisions apart.

## Start with product responsibilities

I avoid organizing an entire application around technical categories such as `components`, `hooks`, and `utils`. Those folders look clean at first, but they become large collections of unrelated files.

Instead, I group most code by product responsibility:

```text
src/
  features/
    authentication/
    projects/
    billing/
  components/
    ui/
  services/
  routes/
```

A feature can own its components, hooks, API functions, types, and tests. Shared UI primitives remain outside features because they describe the design system rather than one business workflow.

This structure gives a developer a useful starting point. If the requirement is about projects, most of the relevant code should be inside `features/projects`.

## Keep state close to the decision it represents

Not all state deserves a global store. I use three broad categories:

1. **Local interface state** — whether a menu is open, which tab is selected, or what a draft input contains.
2. **Server state** — data fetched from an API, including loading, caching, and invalidation.
3. **Shared client state** — information multiple distant features genuinely need, such as authenticated user data.

Local state should remain local. Server state should be managed as server state rather than copied into several component states. A global store is valuable only when the state is truly shared.

The goal is not to minimize state. The goal is to give every piece of state one clear owner.

## Separate orchestration from presentation

I find components easier to maintain when they lean toward one of two roles:

- **Orchestration components** fetch data, coordinate actions, and handle product rules.
- **Presentation components** receive data and callbacks, then render the interface.

This does not require a rigid container-component pattern. It is simply a useful pressure against placing API calls, validation, formatting, analytics, and complex markup inside one large component.

For example, a project list screen might coordinate filters and data fetching while a `ProjectCard` focuses only on displaying one project. The card becomes easier to reuse and test because it does not know where its data came from.

## Design props as a small public API

A component’s props are its API. I prefer props that describe intent:

```tsx
<ConfirmDialog
  title="Delete project?"
  confirmLabel="Delete"
  tone="danger"
  onConfirm={handleDelete}
/>
```

This is clearer than exposing a long list of styling switches. The parent explains what it needs, while the component owns how that intent looks and behaves.

TypeScript helps here, but types cannot rescue an unclear interface. A prop type with twenty optional fields is often a sign that the component has too many responsibilities.

## Treat loading, empty, error, and success as real states

Many interfaces are designed only for the successful response. Production users also see slow connections, empty accounts, expired sessions, and partial failures.

For every data-driven screen, I deliberately consider:

- What appears while the request is running?
- What happens when there is no data?
- Can the user recover from an error?
- What confirms that an action succeeded?

Making these states explicit prevents scattered conditional rendering and produces a more dependable experience.

## Abstract only after the pattern becomes clear

Premature abstraction creates components that are technically reusable but difficult to understand. I am comfortable writing similar code twice while the product is still revealing the real pattern.

When I see the same responsibility for the third time, I compare the examples:

- Which behavior is genuinely identical?
- Which differences are product requirements rather than configuration?
- Will an abstraction make the calling code easier to read?

Duplication has a cost, but the wrong abstraction can cost more because every future change must work around it.

## Make the preferred path easy to test

The best component boundaries usually produce natural test boundaries. Business rules can be tested without rendering an entire page. Presentation components can be checked with a small set of representative props. Critical workflows can be covered by integration tests.

I prioritize tests around behavior that would hurt users or the business if it broke: authentication, permissions, payments, destructive actions, and important data transformations.

## Architecture is a continuous practice

A scalable React architecture is not a folder structure copied from a template. It is a series of decisions that keep ownership clear:

- Organize code around product responsibilities.
- Keep state near its owner.
- Separate coordination from presentation when complexity grows.
- Give components small, intentional APIs.
- Model every meaningful interface state.
- Extract patterns only after understanding them.

The result is not code that never changes. It is code that welcomes change without making every new requirement feel dangerous.

---

If you are working through similar frontend architecture decisions, I would be interested to hear which boundaries have made the biggest difference in your projects.
