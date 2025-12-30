# Ep. 9 Pt 1
# Single Responsibility Principle (SRP) — Deep, Practical, No-Nonsense Guide

The **Single Responsibility Principle** is the first pillar of SOLID design principles, but don’t let the acronym scare you. SRP is not about rules carved into stone tablets. It’s about **discipline, clarity, and survival when your codebase grows**.

At its core, SRP says:

> **Every unit of code should have one reason to change.**

That “unit” can be:
- a function
- a class
- a React component
- a custom hook
- a module
- even an entire service

---

## 1. What “Single Responsibility” Actually Means

A **responsibility** is **not a task**.  
A responsibility is a **reason for change**.

If a piece of code can change for *multiple different reasons*, it has *multiple responsibilities* and violates SRP.

### Example (Mental Model)

Imagine a restaurant:

- Chef → cooks food
- Waiter → serves food
- Accountant → handles money

If the chef also starts collecting bills and serving tables, chaos follows.  
Same thing happens in code.

---

## 2. SRP Applied to Components (React Context)

### Good Example

- `ResMenu`  
  **Responsibility:** Display restaurant menu

- `RestaurantCard`  
  **Responsibility:** Display restaurant summary

Each component has **one job**.  
If the UI of menu changes → only `ResMenu` changes.  
If the card layout changes → only `RestaurantCard` changes.

That’s SRP doing its quiet magic.

---

### Bad Example (SRP Violation)

One giant component that:
- fetches data
- filters data
- sorts data
- handles loading
- handles errors
- renders UI
- handles click logic
- manages global state

This component now has **multiple reasons to change**:
- API changes
- UI changes
- business logic changes
- performance changes

That’s technical debt wearing a fake smile.

---

## 3. “If You’re Doing Multiple Things — Break It Down”

This is not dogma.  
This is **damage control**.

### Why breaking components helps:

- Smaller surface area for bugs
- Easier mental parsing
- Localized changes
- Independent testing
- Faster debugging

Instead of fixing a leaking dam, you fix a dripping pipe.

---

## 4. Modularity — The Hidden Superpower

**Modularity** means breaking code into **independent, replaceable pieces**.

### Benefits of Modularity

- **Maintainability**  
  You change one module without touching others.

- **Testability**  
  You test one unit in isolation.

- **Scalability**  
  New features don’t require rewriting old ones.

- **Parallel development**  
  Multiple devs can work without stepping on toes.

SRP is the *gateway drug* to modularity.

---

## 5. Testing Becomes Trivial (And Powerful)

When each component has a single responsibility:

- You write **focused tests**
- Tests are easier to understand
- Bugs are caught **early**
- Failures are localized

### Example

If you have a `RestaurantCard` component:

- Test only rendering logic
- Test props handling
- Test edge cases

When your app grows large, these **small tests save your sanity**.  
They catch tiny bugs *before* they mutate into production disasters.

Otherwise debugging becomes…  
yes — exactly what you said — **a pain in the ass**.

---

## 6. Reusability Comes as a Side Effect (Not the Goal)

SRP doesn’t *try* to make code reusable.  
It just happens naturally.

When something does **only one thing**, it can be reused anywhere that thing is needed.

Example:
- A `useFetch` hook
- A `Button` component
- A `RestaurantCard`

Reuse is not forced.  
It’s **earned**.

---

## 7. No Hard and Fast Rules (This Is Important)

SRP is **contextual**.

- A component with 20 lines doing 2 things might be okay
- A component with 200 lines doing 1 thing might be bad
- “Single” is relative, not absolute

SRP is a **guideline**, not a compiler error.

The real question is always:
> “How many reasons does this code have to change?”

---

## 8. Custom Hooks — SRP for Logic

### What Are Custom Hooks?

Custom hooks are **utility functions** that:
- encapsulate logic
- reuse behavior
- remove extra responsibilities from components

A hook is **just a function**.
No magic.
No panic.

---

### Why Hooks Align Perfectly with SRP

Components should focus on:
- **Rendering UI**
- **Wiring user interactions**

Hooks should focus on:
- **Data fetching**
- **State management**
- **Side effects**
- **Business logic**

This separation restores balance.

---

### Before (SRP Violation)

A component that:
- fetches data
- manages loading
- handles errors
- renders UI

Multiple responsibilities.  
Hard to read.  
Hard to test.

---

### After (SRP Applied)

- Component → UI
- Custom hook → logic

Each has **one reason to change**.

Now:
- Hook can be tested independently
- Component becomes readable
- Logic can be reused elsewhere

---

## 9. Hooks Are Like Utilities

Think of hooks as:
- helper functions
- logic containers
- behavior modules

Just because React calls them “hooks” doesn’t mean they’re special snowflakes.

They exist to **extract responsibility**.

---

## 10. SRP in Real Applications (Big Picture)

As apps grow:
- features increase
- teams grow
- complexity explodes

SRP acts like **structural reinforcement** in a building.

Without it:
- small changes break big things
- fear-driven development begins
- refactoring becomes impossible

With it:
- changes are local
- bugs are traceable
- code remains human-readable

---

## 11. Final Mental Checklist

Before writing or refactoring code, ask:

- What is this unit’s **one job**?
- How many reasons does it have to change?
- Can part of this responsibility move to a hook?
- Can this be tested independently?
- Will future me thank present me?

If the answer feels uneasy, SRP is whispering.

---

## In One Sentence

**Single Responsibility Principle is not about writing more code — it’s about writing code that doesn’t fight back when your application grows.**

That’s how large systems stay sane.


# Ep 9 Pt 2

# Custom Hooks + Single Responsibility Principle  
### Deep Dive with Intuition, Why It Matters, and How to Think Like a Senior Dev

Creating a **custom hook is not mandatory**.  
React will not shout at you.  
The app will still work.

But it is a **very good architectural decision** when used correctly, because it makes your code:

- more readable
- more modular
- more reusable
- more maintainable
- easier to debug
- easier to test

In short: **more human-friendly**.

This is not about fancy abstractions.  
This is about **reducing cognitive load**.

---

## 1. The Core Problem: Too Many Responsibilities in One Component

Let’s focus on the `RestaurantMenu` component.

Originally, it usually does **two big things**:

1. **Fetching data**  
   - Which API to call  
   - When to call it  
   - How to handle loading  
   - How to handle errors  
   - Where to store the data  

2. **Displaying data**  
   - Rendering menu items  
   - Rendering UI  
   - Mapping over data  
   - Showing loaders / fallbacks  

That’s already **two major responsibilities**.

According to **Single Responsibility Principle**, this is a smell.

Not a bug.  
Not an error.  
A *design smell*.

---

## 2. What SRP Says Here (In Plain Language)

`RestaurantMenu` should **not care** about:

- where data comes from
- which API is being called
- how fetching works
- how state is managed internally

It should only care about:

> “I get restaurant data → I display restaurant data.”

That’s it.  
Anything beyond that is **leakage of responsibility**.

---

## 3. The useParams Analogy (Very Important Insight)

Think about `useParams()`.

You write:

- give me `resId`

And that’s all.

You **do not know**:
- how React Router parses the URL
- how it subscribes to route changes
- how it extracts params
- how it optimizes updates

You don’t care.  
You trust the contract.

### This is the key idea:

> **Hooks hide complexity behind a clean interface.**

So the question becomes:

**If React can abstract routing logic into a hook,  
why can’t we abstract fetching logic too?**

We absolutely can.  
And we should.

---

## 4. Custom Hook = Abstraction Boundary

A custom hook is just:

- a **utility function**
- a **helper**
- a **logic container**

No magic.  
No special power.

The only rule is:
- name must start with `use`
- it can use other hooks

That’s it.

---

## 5. The Contract of a Custom Hook (Critical Concept)

Every good hook has a **clear contract**.

### Contract means:
- What input does it take?
- What output does it return?
- What responsibility does it own?

### Example Contract (Conceptual)

**Input:**  
- restaurantId  

**Responsibility:**  
- fetch restaurant data  
- manage internal state  
- handle side effects  

**Output:**  
- restaurant information  

The component doesn’t ask *how*.  
It only receives *what*.

This separation is everything.

---

## 6. RestaurantMenu After Applying SRP

Now the responsibilities are split cleanly:

### Custom Hook Responsibility
- fetch data
- manage state
- handle side effects
- isolate API logic

### RestaurantMenu Responsibility
- receive `resInfo`
- render UI
- display menu

No overlap.  
No confusion.  
No clutter.

From the component’s perspective, data **appears magically**.

And that is exactly how good abstractions should feel.

---

## 7. “It Feels Like Magic” — And That’s the Point

When `RestaurantMenu` uses the hook:

- it does not know the API
- it does not know the fetching logic
- it does not manage state directly
- it does not worry about implementation

It just trusts the hook.

That trust is what makes systems scalable.

---

## 8. No Feature Change — Only Design Improvement

This is a subtle but crucial point:

- No new feature added
- No behavior changed
- No UI modified

Yet the code is **significantly better**.

This is what professional refactoring looks like:
> improving structure without changing behavior

That’s real engineering.

---

## 9. Why Separate File for Hooks

Always prefer:
- one hook
- one file

Why?

- Easier discovery
- Easier testing
- Easier reuse
- Easier debugging
- Cleaner imports

Usually placed in:
- `utils`
- `hooks`
- `services`

The location matters less than the **clarity**.

---

## 10. Error Handling Becomes Surgical

This is where the payoff explodes.

If tomorrow:
- API changes
- error occurs
- data shape changes
- timeout issues arise

You **only touch the hook**.

The component remains untouched.

That is SRP protecting you from ripple effects.

---

## 11. Lightweight, Clean, Readable Code

After extraction:

- components become smaller
- files become readable
- intent becomes obvious
- onboarding becomes faster

A new developer can open `RestaurantMenu` and immediately understand:
> “This component displays a restaurant menu.”

No archaeology required.

---

## 12. Developer Judgment Matters (No Absolutes)

Not every logic deserves a hook.  
Not every component must be split.

This is not religion.  
This is **engineering judgment**.

You decide based on:
- complexity
- reuse potential
- readability
- future change probability

Good developers don’t blindly follow rules.  
They understand **why** rules exist.

---

## 13. Mental Model to Keep Forever

- Components = **What to show**
- Hooks = **How things work**

When you respect this boundary:
- bugs shrink
- confidence grows
- refactoring becomes safe
- systems scale gracefully

---

## Final Thought

Custom hooks are not about React syntax.  
They are about **responsibility management**.

When each piece of code does **one thing well**,  
your application stops fighting you.

And that’s when writing code becomes fun again.


# Ep 9 Pt 3

# Online–Offline Feature Using a Custom Hook  
### From Thought → Contract → Hook → UI (How Engineers Actually Think)

This feature looks fancy on the surface, but underneath it is **pure fundamentals**:
- browser capabilities
- event listeners
- state
- separation of responsibility
- and a clean contract

No magic. No frameworks doing gymnastics.  
Just **good thinking translated into code**.

---

## 1. Why This Feature Exists (Real-World Motivation)

Your website lives in the real world, not in a perfect lab environment.

Users:
- lose internet
- switch networks
- go underground
- enable airplane mode
- have flaky connections

If your app blindly fetches data and shows errors, it feels **broken**.

A good app instead says:

> “Looks like you’re offline. Check your internet connection.”

This improves:
- user experience
- trust
- perceived quality
- professionalism

That’s why **online–offline detection** is common in:
- chat applications
- dashboards
- food delivery apps
- streaming platforms
- collaborative tools

---

## 2. Responsibility Check (SRP Lens)

Ask the SRP question:

Should every component worry about:
- internet availability?
- browser events?
- online/offline logic?

Absolutely not.

That would scatter responsibility everywhere.

So we isolate this responsibility into **one place**.

That place is a **custom hook**.

---

## 3. First Step: Finalize the Contract (Most Important Step)

Before writing code, stop.  
Think.

### Ask these questions:

- What input does this hook need?
- What output should it return?
- What responsibility does it own?

### Online–Offline Hook Contract

**Input:**  
- nothing

Why?
- We don’t need props
- We don’t need parameters
- Internet status is global
- Browser already knows it

**Output:**  
- a boolean (or status) representing internet connectivity

Example meaning:
- `true` → online
- `false` → offline

That’s the entire contract.

If you understand the contract, writing code becomes mechanical.

---

## 4. Where Does the Information Come From?

Not from React.  
Not from your backend.  
Not from props.

The **browser itself** gives this power.

Browsers expose:
- `window.navigator.onLine`
- `online` event
- `offline` event

These are **superpowers** baked into the web platform.

Your job is just to listen.

---

## 5. Event Listeners: The Core Mechanism

Browsers emit events when:
- internet becomes available → `online`
- internet is lost → `offline`

These events are global.

Now think carefully:

### How many times should we add event listeners?

**Once per hook usage lifecycle.**

Not on every render.  
Not repeatedly.  
Otherwise you get:
- memory leaks
- duplicate listeners
- unpredictable behavior

This is where `useEffect` naturally fits.

---

## 6. Mental Flow of the Hook (Step-by-Step Thinking)

1. Initialize state with current internet status
2. Add event listeners for online/offline
3. Update state when events fire
4. Clean up listeners when hook unmounts
5. Return the current status

That’s it.

This is not React magic.  
This is **event-driven programming**.

---

## 7. Writing the Custom Hook (Example Implementation)

```js
import { useState, useEffect } from "react";

const useOnlineStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return isOnline;
};

export default useOnlineStatus;
````

Notice:

* no props
* no parameters
* no UI
* no JSX
* just logic

This is a **pure utility function**.

---

## 8. Why Cleanup Matters (Often Ignored, Always Important)

When a component using this hook unmounts:

* event listeners must be removed

Otherwise:

* memory leaks happen
* listeners keep firing
* bugs appear “randomly”

Cleanup is part of being a responsible engineer.

---

## 9. Using the Hook Inside a Component

Now the component experience becomes magical.

```js
const isOnline = useOnlineStatus();
```

That’s it.

The component:

* does not know about event listeners
* does not know about browser APIs
* does not manage internet logic

It just reacts to **state**.

---

## 10. Displaying Offline UI Instead of Errors

Now comes the UX improvement.

Instead of:

* failed API calls
* red error screens
* broken UI

You do:

```js
if (!isOnline) {
  return <h1>Looks like you are offline. Check your internet connection.</h1>;
}
```

This is graceful degradation.

Your app feels **alive**, not broken.

---

## 11. Where These Features Are Commonly Used

* Chat apps → show “offline” badge
* Food apps → block order placement
* Dashboards → pause live updates
* Streaming apps → stop buffering errors
* Forms → prevent submission

This is not a toy feature.
This is **production-grade UX**.

---

## 12. Browser DevTools Superpower

Browsers even allow you to:

* simulate offline mode
* throttle network
* test flaky connections

This lets you:

* test your hook
* verify behavior
* build confidence

The platform wants you to succeed.

---

## 13. Why This Feels Hard at First (But Isn’t)

It feels hard because:

* you’re learning to design
* not just write syntax
* not just follow tutorials

Once you understand:

* contracts
* responsibilities
* abstraction boundaries

Hooks become **obvious**, not scary.

---

## 14. Hooks Are Just Functions (Repeat This Until It Sticks)

Hooks are:

* JavaScript functions
* with state
* with side effects
* with a naming convention

Nothing more.

When you treat them like utilities, everything clicks.

---

## 15. Final Mental Model to Keep Forever

* Browser knows reality
* Hooks translate reality into state
* Components translate state into UI

Each layer does **one thing well**.

That’s SRP.
That’s modularity.
That’s clean architecture.

And once you internalize this,
you stop copying code — and start **engineering systems**.


# Ep 9 Pt 4
## Is it mandatory to start a custom hook with `use`?

**Short answer:**
No, it is **not mandatory at the JavaScript level**.
Yes, it is **mandatory at the React level** if you want React to treat it as a hook.

That tension is the whole story.

---

## Why it is *not* technically mandatory

A custom hook is, at the lowest level, just a **normal JavaScript function**.

JavaScript does not care if you name a function:

* `useOnlineStatus`
* `getOnlineStatus`
* `internetChecker`
* `banana`

JavaScript will execute it the same way.

So from the language’s point of view:

* nothing breaks
* no syntax error
* no runtime exception

That’s why people say “it’s not mandatory”.

---

## Why React *strongly recommends* `use`

Now comes the important part.

React has **Rules of Hooks**:

* hooks must be called at the top level
* hooks must not be called conditionally
* hooks must only be called inside components or hooks

Here’s the catch:

👉 **React itself cannot detect hooks at runtime.**

So how does React enforce the rules?

### Through naming convention.

React’s tooling (especially **eslint-plugin-react-hooks**) scans your code and says:

> “If a function name starts with `use`, I will assume it is a hook.”

That’s it.
No magic.
No reflection.
Just naming.

---

## What happens if you don’t use `use`?

Suppose you write:

```js
const onlineStatus = () => {
  const [isOnline, setIsOnline] = useState(true);
  return isOnline;
};
```

This will **work** at runtime.

But now:

* ESLint will **not recognize it as a hook**
* Rules of Hooks **won’t be enforced**
* You can accidentally call it:

  * inside loops
  * inside conditions
  * inside normal functions
* Bugs will sneak in silently

So React says:

> “Please name it with `use` so we can protect you.”

This is about **safety**, not syntax.

---

## The `use` prefix is a contract

When you write:

```js
useOnlineStatus
```

You are making a promise:

* this function may call other hooks
* this function must obey Rules of Hooks
* this function must be called only from components or hooks

That single word communicates **intent**.

Other developers immediately know:

> “Careful. This is a hook.”

Without `use`, that signal is lost.

---

## Comparison with built-in hooks

Look at React’s own API:

* `useState`
* `useEffect`
* `useContext`
* `useParams`

They all follow the same convention.

React is saying:

> “If you want to play in the hook ecosystem, follow the naming law.”

Your custom hooks are first-class citizens only if they follow the same rule.

---

## Practical consequences in real projects

In real codebases:

* linters rely on `use`
* teammates rely on `use`
* refactoring tools rely on `use`
* future-you relies on `use`

Not using it is like:

* removing traffic signals
* driving without lane markings
* trusting everyone to be perfect

It works… until it doesn’t.

---

## So what should you do as a developer?

Here’s the mature rule of thumb:

* **Technically optional**
* **Practically mandatory**
* **Professionally non-negotiable**

If a function:

* uses hooks
* returns state or behavior
* encapsulates logic for reuse

👉 **Name it with `use`**

Always.

---

## Final mental model

* JavaScript doesn’t care
* React tooling cares deeply
* Teams care even more

So while React won’t crash if you ignore the convention, **your code quality will**.

And good engineers don’t just write code that runs —
they write code that is safe, readable, and hard to misuse.

That’s why `use` exists.


# Ep 9 Pt 5

# Advanced Code Optimization in Large React Applications  
### Chunking, Code Splitting, Lazy Loading, and Why These Decide Whether Your App Scales or Suffocates

When applications are small, **everything feels fast**.  
When applications grow to **hundreds or thousands of components**, performance stops being optional and starts being existential.

This is where **bundling strategy** becomes the difference between:
- a smooth, scalable product  
- and a slow, bloated, frustrating app

Let’s unpack this step by step, calmly and deeply.

---

## 1. What the Bundler Actually Does (Reality, Not Myth)

When you build a React app, you don’t ship:
- hundreds of `.js` files
- dozens of components
- scattered utilities

The **bundler** (Webpack, Vite, Parcel, etc.):

- takes *all* your JS files
- resolves imports
- bundles them together
- minifies them
- compresses them
- outputs files into the `dist` folder

Historically, this meant:
> **One big JavaScript file**

This single file controls:
- rendering
- routing
- state
- events
- everything

---

## 2. The Core Problem With One Big Bundle

At small scale, one bundle is fine.

At large scale, it becomes a liability.

### Why?

- Bundle size grows
- Initial load time increases
- Browser parsing time increases
- Mobile users suffer
- Slow networks choke

The browser must:
1. download the JS
2. parse it
3. execute it

Before the user even *does* anything.

You cannot build large applications if you ignore this.

---

## 3. The Fundamental Optimization Idea

**Do not load code that the user does not need right now.**

That’s it.  
Everything else is terminology.

---

## 4. Names for the Same Concept (Important for Interviews)

You will hear many terms.  
They all mean variations of the same idea.

- Chunking
- Code splitting
- Dynamic bundling
- Lazy loading
- On-demand loading
- Dynamic imports

Different names.  
Same philosophy.

> Load only what is needed, when it is needed.

---

## 5. Logical Separation of Bundles (Architectural Thinking)

You don’t split code randomly.  
You split **logically**.

A bundle should represent:
- a feature
- a vertical
- a domain

### Real-world example: Travel App

- Flights → one bundle
- Hotels → one bundle
- Homestays → one bundle
- Trains → one bundle
- Holiday packages → one bundle

Each feature may have:
- 50–100 components
- services
- hooks
- utilities

That’s fine.

What’s not fine is:
> putting everything into one giant JS file.

---

## 6. Applications Are Smaller Applications Stitched Together

This is an important mental shift.

A large app is not one app.
It is **many small apps cooperating**.

Each feature is its own mini-application.

Dynamic bundling allows you to respect this reality.

---

## 7. Why This Dramatically Improves Performance

Instead of:
- 1 huge JS file (10 MB)

You get:
- main bundle (small)
- flights bundle
- hotels bundle
- grocery bundle
- etc.

The browser:
- loads minimal code initially
- fetches feature code only when required

This reduces:
- initial load time
- memory usage
- CPU usage

Your app feels **fast**, not heavy.

---

## 8. Hypothetical Example: Food App + Grocery

Suppose:
- Your app starts as a food delivery app
- Later you add grocery delivery (like Instamart)

Grocery:
- has many components
- has its own UI
- has its own logic

Should grocery code load for *every* user immediately?

Absolutely not.

Only load grocery code when:
- user visits `/grocery`

---

## 9. Why Normal Import Fails Here

If you do:

```js
import Grocery from "./components/Grocery";
````

This means:

* grocery code becomes part of the **main bundle**
* it loads on app startup
* even if user never opens grocery

This defeats optimization.

---

## 10. Lazy Loading to the Rescue

React provides `lazy()` for this exact problem.

`lazy` allows **dynamic imports**.

Dynamic import means:

> “Load this code only when needed.”

---

## 11. The Power of This One Line

```js
const Grocery = lazy(() => import("./components/Grocery"));
```

This single line does something huge:

* removes grocery code from main bundle
* creates a separate JS chunk
* loads that chunk only when Grocery is rendered

Do not underestimate this line.
It is **production-grade optimization**.

---

## 12. What Actually Happens at Runtime

1. App loads main bundle
2. User navigates to `/grocery`
3. React tries to render `<Grocery />`
4. Code is not present yet
5. Browser fetches grocery chunk
6. Grocery code executes
7. UI renders

This is **on-demand loading** in action.

---

## 13. The Temporary Problem: “Code Is Not There Yet”

Between step 3 and 6:

* React wants to render
* but code is still loading

Without handling this, React throws an error.

This is where **Suspense** comes in.

---

## 14. Suspense: Handling the In-Between State

`Suspense` is a React component.

It tells React:

> “While this lazy component is loading, render something else.”

Usually:

* loading spinner
* shimmer UI
* skeleton screen

---

## 15. Using Suspense With Lazy

```js
<Suspense fallback={<Shimmer />}>
  <Grocery />
</Suspense>
```

Meaning:

* if Grocery code isn’t ready
* show `<Shimmer />`
* once ready, replace it with Grocery UI

This is smooth, user-friendly, and professional.

---

## 16. Full Route-Level Example

```js
const Grocery = lazy(() => import("./components/Grocery"));

{
  path: "/grocery",
  element: (
    <Suspense fallback={<Shimmer />}>
      <Grocery />
    </Suspense>
  )
}
```

Now:

* grocery has its own bundle
* main bundle stays light
* app scales safely

---

## 17. You Can Do This for Any Feature

* About Us
* Contact
* Admin dashboard
* Reports
* Analytics
* Settings

Anything not required on initial load is a candidate.

---

## 18. Why Interviewers Love This Topic

Because this is not syntax.
This is **system design thinking**.

Interviewers want to know:

* how you scale apps
* how you reduce bundle size
* how you improve perceived performance

Using words like:

* code splitting
* lazy loading
* dynamic import

signals that you understand **real-world constraints**.

---

## 19. Summary: One Philosophy, Many Names

All of these mean the same thing:

* code splitting
* chunking
* lazy loading
* dynamic loading
* on-demand loading
* dynamic imports

They all answer one question:

> “How do we avoid loading unnecessary code?”

---

## Final Mental Model to Keep Forever

* Initial bundle should be **minimal**
* Features should load **only when visited**
* Large apps must be **logically split**
* Performance is an architectural decision

Four lines of code, used wisely, can change the fate of an application.

That’s not React trivia.
That’s **engineering maturity**.

```
```
