# Ep 1 Pt 1
# 1) What the browser already understands (first principles)

Think of the browser as a machine that understands a small, well-defined set of languages and APIs by default:

**HTML** — markup that describes structure (headings, paragraphs, buttons). The browser’s HTML parser reads tags and builds a tree called the **DOM (Document Object Model)**. The DOM is an in-memory tree of nodes (elements, text nodes, attributes).

**CSS** — rules that describe how things look. The browser runs a style system that maps CSS rules to DOM nodes and computes layout and paint.

**JavaScript** — a programming language the browser runs with its JS engine (V8, SpiderMonkey, JavaScriptCore). JS can query and manipulate the DOM via standard web APIs (e.g., `document.createElement`, `element.innerHTML`, `addEventListener`).

**Networking & resources** — the browser fetches resources (HTML, CSS, JS) via HTTP(S). It executes scripts, possibly with policies (CORS, SRI).

**Important baseline:** the browser **does not** know about React or Vue or any framework out of the box. It only knows JavaScript — frameworks are just JavaScript libraries that shape how you use the DOM.

---

# 2) How you “give” the browser React (CDN injection, script tags)

From first principles: to give the browser extra abilities you give it JavaScript code that runs in the page. The simplest way:

* Add `<script src="..."></script>` tags that point to a hosted file (a CDN like unpkg, jsDelivr, or a company-hosted URL).

When the browser encounters a script tag it fetches and executes that JS. After execution, any variables or globals the library creates (like `React` or `ReactDOM`) are available on the global scope (`window.React`).

So “injecting React via CDN” = fetching React’s JS file and executing it in the page so the React functions and objects exist for your code to use.

**Practical notes (what matters):**

* Script order matters. Load React first, then ReactDOM, then your app code that uses them.
* There are two script types commonly used: classic (`<script>`) and module (`<script type="module">`). Modules have different scope and loading semantics.
* If you use JSX in the browser without a build step, you need a transpiler (Babel standalone) also loaded via script so it converts JSX to `React.createElement` on the fly — slower but handy for demos.

---

# 3) Why there are (commonly) two files: `react` and `react-dom`

From first principles: separate core logic from platform-specific rendering.

**`react` (core):** contains the platform-agnostic machinery — component model, hooks, element creation API, reconciliation algorithm (the logic that decides what changes should happen), internal scheduling, state management primitives like `useState`, `useEffect`. These are generic ideas that don’t assume a browser or a mobile device.

**`react-dom` (renderer/bridge):** contains the code that knows how to talk to the DOM. It implements operations like creating real DOM nodes, setting attributes, applying styles, inserting/removing nodes from the document, and binding event listeners. It’s the bridge between React’s abstract plan and the browser’s actual DOM API.

**Why separate?** Because the same core ideas can be used in multiple environments:

* `react-dom` for the browser DOM.
* `react-native` (a different renderer) for mobile native UI.
* Custom renderers (e.g., for canvas, terminal UIs, PDFs) can reuse the React core but implement different “render to X” logic.

So in short: **core React = what to do**, **renderer = how to do it on a particular platform**.

---

# 4) What React gives you when loaded (the “superpowers”)

When the React scripts run, they give you a toolkit to express UI declaratively and efficiently. Key pieces:

**Element creation API**

`React.createElement(type, props, ...children)` — creates a plain JavaScript object that describes “I want a `<div>` with these props and these children.” This object is called a React element (not the DOM node itself).

JSX is just a nicer syntax that compiles to `React.createElement(...)`.

**Components**

* **Function components:** functions that return React elements. They take `props` and return what the UI should look like.
* **Class components** (older): classes with lifecycle methods. Function components + hooks are now the standard.

**Hooks & state**

`useState`, `useReducer`, `useEffect`, etc. These let components store state and run side-effects declaratively.

First principle: a component is a function of `props` and `state` → UI. When state changes, React recalculates what the UI should be and updates the page.

**Virtual DOM & reconciliation (diffing)**

React keeps a lightweight in-memory representation (virtual DOM) of the UI tree. When state changes, React computes a new virtual tree and compares it with the old one to find the minimal changes required.

Then the renderer (`react-dom`) applies only those minimal changes to the real DOM.

Benefit: fewer direct DOM manipulations → usually better performance and simpler code reasoning.

**Fiber & scheduling (high-level)**

React’s scheduler breaks work into small chunks so rendering large trees doesn’t block the browser for too long. This enables smoother UI updates and responsiveness.

You don’t need to implement this; React’s core handles scheduling decisions.

**Event system**

React uses a synthetic event system: events bubble to a top-level handler and React decides which component handlers to call. This standardizes behavior across browsers and makes binding/unbinding efficient.

**APIs to mount and update the app**

Historically `ReactDOM.render(...)`. In modern React there’s `ReactDOM.createRoot(root).render(<App />)` to enable concurrent features.

Mounting: React creates the initial virtual tree and tells the renderer to create actual DOM nodes and insert them.

---

# 5) How the flow looks end-to-end (simple pipeline)

* Browser loads HTML and sees `<script src="react.js">` → fetch + execute → `window.React` available.
* Browser loads `<script src="react-dom.js">` → fetch + execute → `window.ReactDOM` available.
* Your app code runs and uses React and ReactDOM:

  * You write components (JSX or `createElement`).
  * You call `ReactDOM.createRoot(container).render(<App />)` (or old `render`).
* React builds a virtual tree from your component functions.
* React’s reconciliation decides what DOM operations are needed.
* `react-dom` issues DOM APIs to actually create/patch nodes.
* Browser paints the resulting DOM; event listeners are wired into React’s synthetic system.

---

# 6) JSX — what it is and why you need a transformer

JSX looks like HTML inside JavaScript: `<div className="x">Hello</div>`.

Browsers don’t understand JSX natively. JSX is syntactic sugar that a transpiler converts to `React.createElement(...)`.

**Typical dev setups:**

* **Build step:** use Babel/Webpack/Vite to transpile JSX at build time — fast in production.
* **CDN + Babel-standalone:** for learning/demos, you can load Babel in the browser and it transpiles JSX on the fly (slow, not for production).

If you don’t use JSX, you can call `React.createElement` directly.

---

# 7) innerHTML vs React

`element.innerHTML = "<div>hi</div>"` tells the browser to parse HTML text and replace contents. That’s direct DOM manipulation.

React avoids manual `innerHTML` juggling. Instead:

* You declare what the UI should be (component returns elements).
* React computes differences and updates DOM nodes in a controlled way (avoids full re-parses and preserves state where possible).

React can still use `dangerouslySetInnerHTML` when you must inject raw HTML, but it’s explicit and controlled.

---

# 8) React’s event model and DOM interaction

React attaches a small number of top-level event listeners to the document (or root). When an event happens, React figures out which component’s handler to call. This avoids hundreds of DOM listeners and simplifies cleanup.

When React updates the DOM, it uses standard DOM APIs (`createElement`, `appendChild`, `removeChild`, `setAttribute`, `textContent`) — `react-dom` is literally issuing these browser calls under the hood.

---

# 9) Keys, lists, and reconciliation gotchas

First principle: reconciliation matches old and new elements to decide changes. Keys are hints for that matching.

When mapping arrays to elements, use a stable `key` (like an id). Keys help React keep identity of items across updates — without keys, React may reorder or recreate DOM nodes, causing loss of state inside child components.

---

# 10) Performance ideas at first principles

* Minimize re-renders: changing state triggers re-render of the component and its children. Design components so minimal parts re-render.
* Use keys correctly in lists.
* Keep heavy computations out of render (memoize expensive calculations).
* Use `useMemo`/`useCallback` when needed to avoid unnecessary work, but don’t overuse them.
* Let React batch updates: set state multiple times in event handlers and React may combine updates for fewer DOM changes.

---

# 11) Where React cannot help (and why you still sometimes use raw DOM)

* Very tiny pages: adding React might be overkill.
* Direct DOM APIs are needed for certain integrations (third-party libraries manipulating DOM).
* For some low-level, high-performance drawing (like immediate-mode canvas games), a renderer other than DOM may be better.

---

# 12) Security & loading notes (practical CDN concerns)

* Use trusted CDNs or package managers in production. Blindly loading remote scripts risks supply-chain problems.
* Consider Subresource Integrity (SRI) and proper content security policies (CSP) when fetching third-party scripts.
* For learning/demos, CDN is fine. For production, prefer bundling with a build tool so you control versions.

---

# 13) Modern API differences the notes hinted at (quick)

Old:

```js
ReactDOM.render(<App />, root)
```

Modern:

```js
const root = ReactDOM.createRoot(rootNode);
root.render(<App />);
```

Modern API enables concurrent rendering features.
(If you just load React via CDN, check the docs/version you loaded to know which API is available.)

---

# 14) Big-picture analogy (to lock intuition)

* **Browser** = factory that can build DOM parts when given blueprints and tools (HTML parser, JS engine, CSS engine).
* **React core** = a planning office that writes a tidy blueprint of the UI (element objects, component tree) and decides what should change when data changes.
* **ReactDOM** = the build crew that knows how to use the browser’s tools to carry out the plan (create elements, attach events).
* **JSX** = shorthand blueprint markup that a translator converts into the blueprint objects the planning office uses.

---

# 15) Practical checklist when you “inject React via CDN” (so nothing surprises you)

* Load scripts in order: `react` → `react-dom` → (optional) `babel-standalone` if you use browser JSX → your app script.
* Use correct script type (module vs classic) depending how you write code.
* If using JSX without transpilation, include Babel and mark your script `type="text/babel"` (only for dev/demos).
* Mount your app into an empty DOM container: `<div id="root"></div>` then `ReactDOM.createRoot(document.getElementById('root')).render(<App />)`.
* Keep an eye on console errors — common mistakes: missing global `React`, JSX not transpiled, wrong script order.

-----------------------------------------------------
# Ep 1 Pt 2
# Understanding React.createElement, ReactDOM Roots, and How React Renders (Deep, First-Principles)

## 1. What `React.createElement` really is (first principles)

React is just a JavaScript library. It cannot create real DOM nodes by itself because it is platform-agnostic. So React must represent UI in **plain JavaScript objects**.

When you call:

```
React.createElement("h1", {}, "Hello")
```

React does not create a real `<h1>`.
It creates a **virtual description** of an element.

### How the three arguments work

| Argument  | Meaning            | First-Principles Explanation                         |
| --------- | ------------------ | ---------------------------------------------------- |
| `"h1"`    | Type of element    | Describes what kind of UI node this should become    |
| `{}`      | Props (attributes) | A configuration object: id, className, style, events |
| `"Hello"` | Children           | The content inside the element                       |

React converts this into a plain JavaScript object such as:

```
{
  type: "h1",
  props: {
    children: "Hello"
  }
}
```

This is the **virtual DOM node**, not the real DOM node.

### Key Insight

`React.createElement` performs no DOM operations.
Its only job is to create a virtual blueprint of the UI.

---

## 2. Why React needs a "root" (technical intuition)

The browser DOM is a large tree. React cannot control the entire page, so it needs a **specific DOM node** where it is allowed to manage everything.

For example:

```
<div id="root"></div>
```

React must be explicitly told:

Render everything inside this one DOM node.

React itself does not know how to interact with the browser DOM.
That responsibility belongs to ReactDOM.

---

## 3. Core Job Separation: React vs ReactDOM

| Responsibility                         | Handled By | Reason                                                       |
| -------------------------------------- | ---------- | ------------------------------------------------------------ |
| Creating virtual DOM objects           | React      | Pure logic, platform-independent                             |
| Mapping virtual DOM to real DOM        | ReactDOM   | Uses browser APIs                                            |
| Scheduling and reconciliation          | React      | Pure algorithmic work                                        |
| Physically creating/updating DOM nodes | ReactDOM   | Needs access to `document.createElement`, events, attributes |

This separation allows React to run on multiple platforms:

* web (ReactDOM)
* mobile (React Native)
* terminal UIs (Ink)
* custom renderers (Canvas, WebGL, PDFs)

React core never changes; only the renderer changes.

---

## 4. Creating a root (ReactDOM responsibility)

```
const root = ReactDOM.createRoot(document.getElementById("root"));
```

This does two things:

1. Creates a connection point between React’s virtual DOM and the browser’s real DOM.
2. Informs ReactDOM where it should insert and update UI.

Core idea:
`createRoot` sets up the environment where React will operate.

---

## 5. Rendering a React element (end-to-end flow)

Given:

```
const element = React.createElement("h1", {}, "Hello");
```

You render it with:

```
root.render(element);
```

This triggers the entire rendering pipeline:

### Step 1 — React receives the virtual element

React stores your element description.

### Step 2 — React builds the internal virtual DOM tree

A complete in-memory representation of the UI.

### Step 3 — ReactDOM compares old vs new tree

Determines what exactly needs to change.

### Step 4 — ReactDOM performs real DOM operations

Uses browser APIs:

* `document.createElement`
* `textContent`
* `appendChild`

### Step 5 — Browser paints the final result

The visual UI appears.

---

## 6. Why `createElement` is a core React responsibility

`createElement` is pure logic:

* no browser
* no DOM
* no platform assumptions

It only describes **what** the UI should be, not **how** to build it.

This is why it belongs to React core.

---

## 7. Why `createRoot` is a ReactDOM responsibility

ReactDOM knows:

* how to manipulate real DOM nodes
* how to attach event listeners
* how to schedule updates with the browser
* how to connect virtual elements to physical nodes

This is platform-specific, so it lives in ReactDOM.

---

## 8. Mental Model of the Rendering Process

```
React.createElement     →   Builds virtual DOM description
ReactDOM.createRoot     →   Prepares a bridge to real DOM
root.render(element)    →   Sends virtual DOM to ReactDOM
ReactDOM                →   Creates and updates real DOM nodes
Browser                 →   Draws the final UI
```

React is the brain.
ReactDOM is the hands.
The browser is the physical world where the UI appears.

---

## 9. Important Insight: React does nothing until `render()` is called

You can create many elements:

```
const a = React.createElement("h1", {}, "A");
const b = React.createElement("p", {}, "B");
const c = React.createElement("button", {}, "Click");
```

But none of them appear in the browser until:

```
root.render(a);
```

Rendering is the only operation that commits React’s virtual description into the real DOM.

---

## 10. Why `React.createElement` exists even though JSX is common

JSX:

```
<h1>Hello</h1>
```

Is only syntax sugar.

It gets compiled into:

```
React.createElement("h1", {}, "Hello");
```

React core understands only the output of `createElement`.
JSX is just a more readable developer experience.

---

## 11. Full Example to See Everything in Action

```
<body>
  <div id="root"></div>

  <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>

  <script>
    const element = React.createElement("h1", {}, "Hello World from React!");

    const root = ReactDOM.createRoot(document.getElementById("root"));
    root.render(element);
  </script>
</body>
```

This is the minimal React setup without JSX.

---

## 12. Deeper Intuition (Conceptual Mental Model)

Think of the three layers:

* React is the architect designing the virtual structure.
* ReactDOM is the construction team implementing the plan.
* The browser is the physical environment where buildings are created and displayed.

React designs.
ReactDOM builds.
The browser displays.

-------------------------------------------------------
# Ep 1 Pt 3

# React’s Core Philosophy: Manipulating the DOM Through JavaScript (Deep First-Principles Understanding)

## 1. Why React Exists: DOM Manipulation Is Expensive

Every web page has a DOM tree. Whenever you:

* insert a DOM node
* remove a DOM node
* update text or attributes
* rearrange structure

the browser must:

1. change the DOM tree
2. recalculate layout
3. repaint the screen

This is one of the **most expensive operations** in front-end performance.

Any interactive website must constantly modify the DOM.
This is why React was created: to optimize and control DOM updates in a safe, predictable, and efficient manner.

---

## 2. React’s Philosophy: DOM Should Be Manipulated Through JavaScript

React takes a strong stance:

All UI should be described and updated using JavaScript.

React does not want developers manually calling:

* `document.createElement`
* `appendChild`
* `removeChild`
* `innerHTML`
* `setAttribute`

because humans make mistakes and browsers slow down when DOM is manipulated inefficiently.

React instead wants:

* your UI to be described as **pure data**
* React to decide the best way to update the real DOM
* minimal actual DOM mutations

This is the core idea behind the virtual DOM.

---

## 3. React.createElement: The Pure JavaScript Blueprint

When you write:

```
React.createElement("h1", {}, "Hello")
```

React returns a **plain JavaScript object**.

Not a DOM node
Not HTML
Not a browser element

Just an object. Example:

```
{
  type: "h1",
  props: {
    children: "Hello"
  }
}
```

This object is the **blueprint** for the UI.

It describes:

* what type of element
* what attributes (props)
* what goes inside (children)

React is transforming your UI into **data**, not DOM.

---

## 4. Why Turning UI Into Data Is Powerful

React’s biggest innovation:

UI is just a JavaScript object.

When UI is represented as data:

* React can compare previous vs new UI
* React can decide the minimum DOM operations needed
* React can batch DOM updates
* React can optimize rendering intelligently

This is how React avoids unnecessary DOM work.

---

## 5. Props = Attributes

Props are nothing more than configuration for the element:

* id
* className
* style
* event handlers
* custom properties

```
React.createElement("button", { id: "btn", className: "primary" }, "Click")
```

Again, this is still a JavaScript object internally.

---

## 6. Children = Nested Content

The third argument represents anything inside the tag.

* text
* numbers
* React elements
* arrays of children

React uses children to build UI trees.

---

## 7. What Happens When You Call `root.render(element)`

Rendering is where everything becomes real.

`ReactDOM.createRoot()` sets up a connection point between React and the browser.

Then you call:

```
root.render(element)
```

This is the moment React takes your **JavaScript object** and turns it into **real DOM**.

### Step-by-step view

1. You pass the virtual DOM object to ReactDOM.
2. ReactDOM looks at this object’s type (`"h1"`).
3. ReactDOM creates a real DOM node:
   `document.createElement("h1")`
4. ReactDOM sets props (attributes, events, etc.)
5. ReactDOM sets children (`textContent = "Hello"`)
6. ReactDOM inserts it inside your root container.

ReactDOM does the actual physical DOM operations.

---

## 8. Render = Convert Virtual DOM → Real DOM

`root.render()` is the transformation phase.

Before render:
You only have JavaScript objects.

During render:
ReactDOM turns those objects into real DOM nodes.

After render:
You see the UI appear in the browser.

---

## 9. Why React Must Control the DOM

If developers manipulate the DOM manually, React loses track of what the UI should look like.

To avoid confusion and performance issues, React follows this rule:

All DOM changes must go through React.

React becomes the single source of truth for UI.

---

## 10. Virtual DOM = Safer + Faster DOM Updates

Since DOM modifications are expensive, React reduces them by:

* comparing old and new virtual DOM trees
* calculating the minimal changes
* batching updates
* applying optimized DOM mutations

This is the essence of reconciliation.

React turns DOM manipulation from manual mutations into pure declarative JavaScript.

---

## 11. Complete Mental Model of React Rendering

```
React.createElement → Creates virtual DOM object (blueprint)
ReactDOM.createRoot → Creates connection to real DOM
root.render(element) → ReactDOM turns blueprint into real DOM nodes
Browser → Paints and displays the final UI
```

React never touches the real DOM directly.
ReactDOM is the layer that performs physical operations.

---

## 12. The Most Important Single Insight

`React.createElement` creates **objects**.
`root.render` converts those objects into **real DOM**.

Everything React does is based on this separation.

* Describe UI using JavaScript
* Let ReactDOM handle physical DOM updates
* Keep DOM mutations minimal and efficient
* Keep your UI predictable and performant

------------------------------------------------------
# Ep 1 pt 4

# Nested Elements, Children Arrays, Keys, and Why JSX Exists (Deep First-Principles Explanation)

## 1. How React Handles Nested Elements Using `children`

React elements are just JavaScript objects.
When you want nested elements, the **third argument** of `React.createElement` becomes the place to put all children.

Example: one element nested inside another

```
React.createElement(
  "div",
  {},
  React.createElement("h1", {}, "Hello")
)
```

This builds a virtual DOM tree like:

```
div
 └── h1
       └── "Hello"
```

This is React’s most fundamental way of building UI.

---

## 2. Creating Sibling Elements Using an Array of Children

If you want multiple children (siblings), the **third argument must be an array**.

Example:

```
React.createElement(
  "div",
  {},
  [
    React.createElement("h1", {}, "Hello"),
    React.createElement("p", {}, "Paragraph")
  ]
)
```

Now the structure is:

```
div
 ├── h1
 └── p
```

React uses this array to maintain the order of siblings.

---

## 3. Why React Requires a `key`

When an array of children is passed, React must be able to:

* track each child
* identify which child changed
* optimize updates
* detect reordering

React performs a reconciliation process where it compares:

previous virtual DOM tree
vs
new virtual DOM tree

But arrays cause a problem:

React cannot uniquely identify each child using just position.

So React enforces a rule:

Every child in a list must have a key.

Example:

```
[
  React.createElement("li", { key: 1 }, "Item 1"),
  React.createElement("li", { key: 2 }, "Item 2")
]
```

The keys tell React:

* which element stayed the same
* which element moved
* which element got deleted
* which element got added

Without keys, React guesses based on index, which breaks performance and correctness.

That’s why React throws errors when you create arrays of React elements without keys.

---

## 4. Why Complex Nested Trees Become Unmanageable

Try writing a complex UI using only `React.createElement`.

You might end up with something like this:

```
React.createElement(
  "div",
  { className: "container" },
  [
    React.createElement("header", {}, [
      React.createElement("h1", {}, "Title"),
      React.createElement("nav", {}, [
        React.createElement("a", { href: "#" }, "Home"),
        React.createElement("a", { href: "#" }, "About")
      ])
    ]),
    React.createElement("main", {}, [
      React.createElement("p", {}, "Welcome to the page.")
    ])
  ]
)
```

This becomes:

* deeply nested
* hard to read
* hard to maintain
* hard to visualize
* difficult to write correctly
* painful to debug

The more nested the UI → the more painful `React.createElement` becomes.

---

## 5. This Pain Is the Reason JSX Was Created

JSX did **not** come from the idea of “making React special”.

JSX came from the need to solve a practical problem:

`React.createElement` is too verbose to write complex UI.

JSX turns this:

```
React.createElement("h1", {}, "Hello")
```

into:

```
<h1>Hello</h1>
```

JSX is not required.
React does not need JSX.
React does not understand JSX.

JSX is simply a **developer convenience layer**.

It compiles down to `React.createElement`.

---

## 6. The Biggest Misconception: “React = JSX”

Most beginners think:

React can only be written in JSX.

But the truth is:

React is pure JavaScript. JSX is optional syntax sugar.

JSX exists only to make UI code readable and maintainable.

React internally still works with:

* plain JavaScript objects
* virtual DOM trees
* children arrays
* keys
* render functions

JSX is just a nicer way of writing the same structure.

---

## 7. Why JSX Improves Developer Experience

JSX lets you:

* visualize UI structure naturally
* write nested elements without pain
* embed JavaScript inline
* quickly map arrays with keys
* reduce boilerplate
* produce cleaner code
* avoid mistakes that happen with manual object creation

Without JSX, React development would feel like manually constructing a JSON tree of UI.

JSX turns that into declarative, readable code.

---

## 8. Complete Mental Model Summary

1. **Nested elements** → written using children arguments.
2. **Siblings** → written as arrays in the children argument.
3. **Keys** → required for React to track siblings efficiently.
4. **Manual nested UI** → becomes unmanageable using `createElement`.
5. **JSX** → invented to solve this pain, not to make React “special”.
6. **JSX is optional** → it compiles into `React.createElement`.

React is JavaScript.
JSX exists only to make writing React easier.

--------------------------------------------------------

# Ep 1 pt 5

# Understanding How React Works From First Principles

## 1. Why React Exists (The Core Philosophy)

### The most expensive thing in any webpage: **DOM manipulation**

To understand React, first understand the DOM.

* The **DOM** is a tree-like structure in memory representing your page.
* Every time you:

  * add a node
  * remove a node
  * change an attribute
  * rearrange structure
    … the browser has to re-calculate layout, repaint, reflow.
    These operations are **slow**.

So:
**Direct DOM manipulation = expensive.**
**Interactive pages = need lots of DOM changes = even more expensive.**

React was created to *optimize this*.

---

## 2. React’s Core Idea: Manipulate the DOM using JavaScript

React’s philosophy:

> “Instead of manually touching the DOM, describe the UI using JavaScript objects.
> React will convert those objects into real DOM nodes efficiently.”

React gives you helper functions to:

* describe your UI using **pure JavaScript**
* let React handle the efficient DOM operations

This is why React feels very declarative:

> “Tell me what the UI *should* look like, and I will build/update it.”

---

## 3. Everything You Build in React Is Just… **a JavaScript Object**

### React.createElement

This function does NOT create a DOM element.
It creates **a plain JavaScript object** that *describes* the element.

Example mental model:

```
React.createElement("h1", { id: "title" }, "Hello")
```

This becomes an object like:

```
{
  type: "h1",
  props: {
    id: "title",
    children: "Hello"
  }
}
```

So your React element is **not HTML**.
It is **data describing HTML**.

---

## 4. Props → Think of them as “attributes”

Like:

* id
* class
* style
* onClick
* any custom data

They are just key-value pairs in the object.

---

## 5. Children → Stuff that goes inside the tag

In React.createElement:

* first argument → tag name
* second → props
* third → children

### Nesting

A child can itself be another React element (another object).

Example:

```
React.createElement("div", {}, 
    React.createElement("h1", {}, "Hello")
)
```

### Siblings

Use an array in the children:

```
React.createElement("ul", {}, [
    React.createElement("li", {}, "A"),
    React.createElement("li", {}, "B")
])
```

When you have siblings → React needs **keys** for identity.

---

## 6. Rendering: root.render(…)

You pass a React element (a JS object) to React DOM.

```
root.render(element)
```

What does render do?

1. Take the element object.
2. Convert it into actual DOM nodes.
3. Insert them inside the `#root` DOM container.

> Important:
> If anything already exists inside the root, React **replaces** it — not appends.

React takes control of the root area.
Everything inside is now React-managed.

---

## 7. Why Order of CDN Scripts Matters

Browser loads the HTML top to bottom.

If your file looks like:

```html
<div id="root">Hello</div>

<script src="react"></script>
<script src="react-dom"></script>
<script src="app.js"></script>
```

The sequence is:

1. Browser paints whatever is inside `#root` initially (e.g., “Hello”).
2. Browser downloads and executes React.
3. Browser downloads and executes ReactDOM.
4. Browser finally runs your `app.js`.
5. When it reaches `root.render(...)`:

   * The rendered React content replaces what was inside root.

If CDN order is wrong:

* Your code may run before React loads → errors.

So yes, **order matters**.

---

## 8. React Is Not a Framework

React takes over only the part of the page you give it.

If you mount it in a small div → it controls only that area.

It is a **library**, not a full framework.

Frameworks define your whole app.
React allows you to sprinkle interactivity anywhere.

---

## 9. The Pain of Manually Using createElement

If your UI becomes large:

```
React.createElement(
  "div",
  {},
  React.createElement(
    "section",
    {},
    React.createElement("p", {}, "hello"),
    React.createElement("button", {}, "click")
  )
)
```

This becomes:

* unreadable
* hard to nest
* hard to visualize
* error-prone

This is why **JSX was invented**.

---

## 10. JSX Is Just Syntax Sugar

People think React = JSX.

But JSX is just a nicer way to write elements.

These are equivalent:

### JSX:

```
<h1 id="title">Hello</h1>
```

### React.createElement:

```
React.createElement("h1", { id: "title" }, "Hello")
```

JSX → Babel → React.createElement → plain JS object → DOM.

JSX exists only to make your life easier.

---




