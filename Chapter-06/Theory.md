# Ep.6 Pt 1

# Monolith vs Microservice Architecture

## 1. Monolith Architecture

### Definition

A **monolith** is a single unified application where all the components are tightly coupled. Everything is packaged and deployed as one big project.

### Components Typically Inside a Monolith

* **UI code** – the frontend logic
* **Backend logic** – APIs and business logic
* **Authentication & Authorization** – login, roles
* **Database** – direct access
* **External integrations** – like SMS, email, payments

### How It Works

* Everything lives together.
* Even a small change requires rebuilding the **entire project** and redeploying.
* All components are tightly coupled, so failures in one part can affect the entire system.

**Mental Model:** Imagine a massive ship. Every system is connected. If you need to fix one engine, you might need to stop the whole ship and rebuild some parts.

### Problems with Monolith

* Hard to scale – can’t scale individual modules independently.
* Difficult to maintain – one bug can break everything.
* Slow deployments – small changes require full redeployment.
* Hard to adopt new technologies – stuck with whatever tech stack the monolith uses.

---

## 2. Microservice Architecture

### Definition

A **microservice architecture** splits a large application into **small, independent services**, each responsible for a single functionality.

### Key Principles

* **Separation of concerns:** Each service focuses on one job.
* **Single Responsibility Principle:** One service, one responsibility.
* **Loose coupling:** Services don’t depend directly on the internal logic of others.

### Example Services

| Service | Responsibility | Possible Tech Stack |
| ------- | -------------- | ------------------- |
| UI      | React frontend | React, TypeScript   |
| Backend | Business logic | Java, Node.js       |
| Auth    | Login & roles  | Python, Node.js     |
| DB      | Database       | PostgreSQL, MongoDB |
| SMS     | Send messages  | Node.js, Python     |

### Interaction Between Services

* Services communicate **via APIs** (HTTP/REST or gRPC) or message queues (Kafka, RabbitMQ).
* Each service runs independently on its own port. Example:

```
UI:      localhost:1234
Backend: localhost:1000
SMS:     localhost:3000
Auth:    localhost:2000
```

* All services can be mapped to a single domain:

```
https://myapp.com/       -> UI
https://myapp.com/api    -> Backend
https://myapp.com/sms    -> SMS
https://myapp.com/auth   -> Auth
```

**Mental Model:** Think of microservices as a team of specialists. Each person works independently but communicates via emails (API calls) to get the job done. If one person is busy or sick, the rest can still function.

---

## 3. React App Communication with Microservices

### How React Talks to Backend

1. **HTTP Requests:** Using `fetch` or `axios` to call APIs.

```js
fetch('https://myapp.com/api/users')
  .then(res => res.json())
  .then(data => console.log(data));
```

2. **Environment-Based URLs:**

   * Development: `http://localhost:1000/api/users`
   * Production: `https://myapp.com/api/users`
3. **Ports & Endpoints:**

   * Each microservice runs on its own port.
   * The frontend doesn’t directly talk to the database; it talks to the backend API.

### Full Interaction Flow

1. User clicks a button on UI.
2. React sends an **API request** to the backend.
3. Backend validates request → checks Auth service → reads/writes to DB → maybe calls SMS service.
4. Backend responds → React updates the UI.

### Real World Example: Uber

* **Backend microservice** for rides
* **Backend microservice** for payments
* **Auth service** for login & roles
* **SMS service** for OTP
* **UI service** for web/mobile app

Each can be **written in a different tech stack**, scaled independently, deployed separately, and communicate via APIs.

---

## 4. Deployment & Tech Flexibility

* React app can be a microservice itself.
* Each service can have its **own tech stack**.
* Microservices can scale **individually**, reducing cost and complexity.
* Example port mapping to domain:

```
UI       -> :1234 -> myapp.com
Backend  -> :1000 -> myapp.com/api
SMS      -> :3000 -> myapp.com/sms
```

---

## 5. First-Principles Thinking for Microservices

To truly understand and master microservices:

1. **Start from the purpose:** Why split services? → Scalability, maintainability, independent deployments.
2. **Understand interactions:** How do services talk? → REST APIs, gRPC, message queues.
3. **Mapping ports to services:** Visualize as cities connected by roads (APIs). Each city (service) can grow independently.
4. **Tech independence:** Each service can use the best tool for its job.
5. **Deployment:** Each service can be updated without impacting others.

---

## 6. Problem-Solving Advice

* Break down a monolith problem into smaller services. Ask: *Which component can be independent?*
* Always design APIs first: Think **“what data do I need, who provides it?”**
* Practice error handling for inter-service communication. Real-world systems fail all the time; microservices should tolerate partial failure.

---
# Ep 6 pt 2
# Fetching Dynamic Data in React

When building modern web apps, **hardcoded or mock data is not enough**. Real apps fetch data dynamically from backend APIs to render content like restaurants, products, posts, etc.

---

## 1. Two Approaches to Fetch Data

### **Approach 1: Wait for API before Rendering**

* **Flow:**

  1. Page loads
  2. Make an API call
  3. Wait for response
  4. Render the UI with fetched data

```js
// Example
function RestaurantList() {
  const [restaurants, setRestaurants] = React.useState([]);

  React.useEffect(() => {
    fetch('https://api.example.com/restaurants')
      .then(res => res.json())
      .then(data => setRestaurants(data));
  }, []);

  // Render only after API call is done
  if (!restaurants.length) return <div>Loading...</div>;

  return (
    <ul>
      {restaurants.map(r => <li key={r.id}>{r.name}</li>)}
    </ul>
  );
}
```

**Problem with this approach:**

* The page appears **blank or frozen** while the API call happens.
* If API takes 500ms–2s, user sees nothing and waits.
* Sudden pop-in of data **feels jarring**, especially on slower networks.

**Mental Model:** Imagine walking into a restaurant and the waiter tells you to wait 5 minutes before even seeing the menu. Not a good experience.

---

### **Approach 2: Render First, Populate Later (Recommended)**

* **Flow:**

  1. Page renders **immediately** with placeholders or skeleton UI
  2. Make API call in the background
  3. Update/re-render the UI as soon as data arrives

```js
function RestaurantList() {
  const [restaurants, setRestaurants] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch('https://api.example.com/restaurants')
      .then(res => res.json())
      .then(data => {
        setRestaurants(data);
        setLoading(false);
      });
  }, []);

  // Skeleton or placeholder while loading
  if (loading) return <div>Loading restaurants...</div>;

  return (
    <ul>
      {restaurants.map(r => <li key={r.id}>{r.name}</li>)}
    </ul>
  );
}
```

**Why this is better:**

* Users see a UI **immediately** → feels fast and responsive.
* The content gradually populates → smoother UX.
* Can display **skeleton loaders, spinners, or placeholder cards** to indicate loading state.
* React’s fast **re-rendering mechanism** ensures minimal UI jank.

**Mental Model:** Like walking into a restaurant and immediately seeing the menu with blank placeholders. As the chef prepares dishes, they gradually appear. You’re engaged the entire time.

---

## 2. React Render Mechanism and Dynamic Data

### React’s Strength

* **Virtual DOM:** React updates only the parts of the UI that changed → fast re-renders.
* **Declarative rendering:** You describe *what UI should look like* given the state, and React handles updating the DOM efficiently.
* **Component-based:** Each UI piece can fetch and render its data independently.

### Rendering Twice?

* In the second approach, React renders the **initial skeleton** first, then re-renders when the data arrives.
* This is **not wasteful**:

  * React **diffs the virtual DOM** and only updates the real DOM where necessary.
  * Efficient even for complex apps.

**Technical Takeaway:** Rendering twice is fine because React’s reconciliation minimizes actual DOM operations. UX gain outweighs rendering cost.

---

## 3. Best Practices for Dynamic Data in React

1. **Always show a loading state** (skeleton or spinner)
2. **Fetch data in `useEffect`** to run after initial render
3. **Handle errors gracefully**

```js
const [error, setError] = React.useState(null);
...
.catch(err => setError(err.message));
```

4. **Avoid blocking the initial render** → never wait synchronously for API
5. **Optimize re-renders** using `React.memo` or `useCallback` for heavy components
6. **Lazy load components** if part of the UI is not immediately needed
7. **Cache frequently fetched data** to reduce repeated API calls

---

## 4. Real-World Example: Restaurant App

* **Initial Load:** Show skeleton cards of restaurants
* **Fetch Data:** API call to `/restaurants`
* **Populate UI:** Render real restaurant names, images, and ratings
* **UX Effect:** Page feels alive immediately, even if data is not ready.

---

## 5. First Principles Takeaways

1. **User first:** Never freeze the UI. Users perceive speed from immediate feedback.
2. **Separate rendering and data fetching:** React lets you render *state-driven UI*, so fetching is decoupled from rendering.
3. **Render efficiently:** Thanks to Virtual DOM, multiple renders are cheap.
4. **Predictable updates:** React guarantees UI always matches state → easier to reason about asynchronous data.

---

# Ep.6 Pt 3
# Fetching Live Data in React: `useEffect`, `fetch`, and CORS

When developing React applications, **API calls are everywhere**. Every dynamic page, list, or component that relies on external data will need to fetch it at some point.

---

## 1. `useEffect` Hook

### What is `useEffect`?

* A **hook** is a function React gives us to handle specific use cases (like `useState`).
* `useEffect` allows you to run **side-effects** in your components: API calls, subscriptions, timers, DOM updates outside React, etc.

```js
import React, { useEffect, useState } from "react";
```

### How `useEffect` Works

* Takes **two arguments**:

  1. **Callback function** – runs after render
  2. **Dependency array** – controls when the effect runs

```js
useEffect(() => {
  console.log("Component rendered and effect runs!");
}, []);
```

* **Execution timing:**

  1. Component renders line by line
  2. `useEffect` callback is **saved**
  3. After the render cycle finishes, callback is executed
* This ensures the UI is **rendered first**, then side-effects happen → perfect for our **second approach** (render first, fetch later)

**Mental Model:**
Render first → show skeleton UI → then fetch data → populate UI dynamically.

---

## 2. Fetching Data in React

### Using `fetch`

`fetch` is a **browser API** (also available in Node.js via libraries) that fetches data from a URL and returns a **Promise**.

```js
useEffect(() => {
  fetch("https://api.swiggy.com/restaurants")
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error(err));
}, []);
```

**Steps:**

1. `fetch` requests the API
2. Returns a **Promise**
3. `.then` resolves with JSON data
4. Update React state → triggers **re-render** with new data

---

### 2.1 Example: Dynamic Restaurant List

```js
function RestaurantList() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.swiggy.com/restaurants")
      .then(res => res.json())
      .then(data => {
        setRestaurants(data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  if (loading) return <div>Loading restaurants...</div>;

  return (
    <ul>
      {restaurants.map(r => (
        <li key={r.id}>{r.name}</li>
      ))}
    </ul>
  );
}
```

**Key Takeaways:**

* Initial render: skeleton/loading state
* Fetch happens asynchronously
* When data arrives → state updated → React re-renders

---

## 3. Understanding CORS (Cross-Origin Resource Sharing)

### What is CORS?

* Browsers **block API calls** from one origin to another (like `localhost:3000` → `swiggy.com`) **for security reasons**
* Prevents malicious scripts from making unauthorized requests to other servers

**Typical Error:**

```
Access to fetch at 'https://api.swiggy.com/restaurants' from origin 'http://localhost:3000' has been blocked by CORS policy.
```

### How to Handle CORS in Development

1. **Browser Extension:** Quick workaround

   * Bypass CORS for local testing
2. **Proxy / Backend Server:** Industry standard

   * Create your own backend to call Swiggy API → your frontend calls your backend → bypasses browser restriction

**Mental Model:** Browser = strict security guard; only lets scripts talk to the same domain unless explicitly allowed.

---

## 4. React + Live API: Rendering New Config-Driven UI

**Flow:**

1. Render initial UI (skeleton or mock)
2. Fetch live API data using `useEffect` + `fetch`
3. Update React state
4. React **re-renders automatically** with new data

* You no longer rely on **hardcoded or mock data**
* Allows **dynamic UI driven by API configuration** (menu changes, new restaurants, etc.)

**Industry Example:** Swiggy

* Menu or restaurant list changes every day → React app dynamically fetches and renders updated content

---

## 5. Best Practices

1. **Always use `useEffect` for API calls** → ensures UI renders first
2. **Handle loading and error states** for smooth UX
3. **Do not block initial render** with synchronous API calls
4. **Use environment variables** for API URLs → easier deployment
5. **Cache API responses** if needed → improve performance
6. **Handle CORS** properly → browser extensions for dev, proxies for production

---

## 6. First Principles Takeaways

* UI rendering and data fetching are **separate concerns**
* React ensures **fast re-rendering** → initial skeleton + API fetch → new UI
* Understanding **CORS** is crucial for frontend-backend interaction
* Using `fetch` + `useEffect` is the **standard, timeless practice** in React

---
# Ep.6 Pt 4
# Improving UX While Fetching Data in React

When the **UI renders before the API data arrives**, users notice a blank screen. This feels slow or broken. To fix this, we **show a placeholder** while the data is being fetched.

---

## 1. Spinning Loader

### What it is

* A **simple loading indicator**, usually a spinning circle, to tell the user “Data is loading…”
* Very common in apps and websites
* Minimal effort, but less visually informative

### Example in React

```jsx
function RestaurantList() {
  const [restaurants, setRestaurants] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch("https://api.example.com/restaurants")
      .then(res => res.json())
      .then(data => {
        setRestaurants(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="spinner">Loading...</div>;

  return (
    <ul>
      {restaurants.map(r => (
        <li key={r.id}>{r.name}</li>
      ))}
    </ul>
  );
}
```

**Pros:**

* Simple to implement
* User knows the page is loading

**Cons:**

* Doesn’t resemble the final UI → feels “detached” from the content
* Doesn’t give context about what will appear

---

## 2. Shimmer / Skeleton UI

### What it is

* Also called **placeholder UI**
* Shows **fake content shaped like the real UI** while API data is loading
* Often called a **shimmer effect** because of the animated gradient moving across placeholders

### Mental Model

* Instead of showing a blank page, show **boxes for images, lines for text, cards for items**
* Feels like the **page is being painted gradually**
* Once API data arrives → placeholders are replaced with actual content

### Example in React

```jsx
function RestaurantList() {
  const [restaurants, setRestaurants] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch("https://api.example.com/restaurants")
      .then(res => res.json())
      .then(data => {
        setRestaurants(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div>
        {/* Skeleton cards */}
        {[...Array(5)].map((_, idx) => (
          <div key={idx} className="skeleton-card">
            <div className="skeleton-image"></div>
            <div className="skeleton-text"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <ul>
      {restaurants.map(r => (
        <li key={r.id}>{r.name}</li>
      ))}
    </ul>
  );
}
```

**Pros:**

* Feels like content is **loading naturally**
* Improves perceived performance → users feel the page is fast
* Standard in modern apps (Instagram, Facebook, Swiggy, Zomato)

**Cons:**

* Slightly more effort to implement
* Needs CSS for shimmer effect

---

## 3. When to Use Which Approach

| Approach           | When to Use                         | UX Benefit                                              |
| ------------------ | ----------------------------------- | ------------------------------------------------------- |
| Spinner / Loader   | Simple apps, small data             | Tells user “loading”                                    |
| Skeleton / Shimmer | Complex UI, large data, modern apps | Feels faster, keeps layout visible, smoother experience |

**Real-World Examples:**

* **Swiggy/Zomato:** Skeleton cards for restaurants while menu loads
* **Facebook/Instagram:** Placeholder posts while feed is fetching
* **Amazon:** Product card placeholders before images & info load

---

## 4. First Principles Takeaways

1. **Perception is as important as speed:** Users care about **how fast the page feels**, not actual API speed.
2. **Decouple rendering and data fetching:** Always render something, even if data isn’t ready.
3. **Skeleton UI > Spinner** for content-heavy pages → keeps user engaged
4. **React re-rendering makes this easy:** Initial skeleton → API fetch → state update → UI re-render
---


# EP.6 Pt 5
# Why We Need State Variables in React

When building dynamic UI, the UI should **reactively update** whenever data changes. That’s the core philosophy of React.

---

## 1. Local JS Variables vs State Variables

### Local JS Variable

```js
let buttonText = "Login";

function handleClick() {
  buttonText = "Logout";
  console.log(buttonText);
}
```

**Problem:**

* Even though `buttonText` changes in memory and prints in the console, the **UI does not update**.
* Why? Because **React does not know that something changed**.
* React only updates the UI when **state changes**.

**Mental Model:**
React is like a painter who only repaints the canvas when you tell him **which part to repaint**. Local JS variables change behind the scenes, but the painter is unaware → nothing updates.

---

### State Variable (`useState`)

```js
import React, { useState } from "react";

function LoginButton() {
  const [buttonText, setButtonText] = useState("Login"); // state variable

  const handleClick = () => {
    setButtonText("Logout"); // update state
  };

  return <button onClick={handleClick}>{buttonText}</button>;
}
```

**Why this works:**

1. `useState` creates a **special variable tracked by React**.
2. You **cannot modify it directly**; you use the setter function (`setButtonText`) to update it.
3. When `setButtonText` is called:

   * React knows this component’s state changed.
   * React **triggers a re-render** of the component.
4. During the render:

   * React calls the component function again.
   * `buttonText` now has the **updated value**
5. React **reconciles** the new virtual DOM with the old DOM

   * Only the parts that changed (the button text) are updated in the actual DOM
   * **Not the whole page** → this is the magic of React-Fibre

**Superpower of State:**

* Tracks the value over time
* Triggers re-render automatically
* Integrates with React’s **Virtual DOM diffing** → fast updates

---

## 2. How React Re-Rendering Works

1. Component renders for the first time → React builds **virtual DOM**
2. State changes via `setState` → React calls the component again
3. React builds **new virtual DOM**
4. React compares **old vs new virtual DOM** (diffing)
5. Updates **only the changed parts** in the actual DOM

**Example:**

* Only the button text changes → React updates **just the button**, not the entire page.

**Mental Model:**

* Think of React as a chef repainting a canvas:

  * Old canvas = old DOM
  * New canvas = new virtual DOM
  * Chef compares and only touches the spots that changed → fast, efficient

---

## 3. Why `useState` Is Special

| Feature                  | Local Variable | State Variable (`useState`) |
| ------------------------ | -------------- | --------------------------- |
| Tracked by React         | ❌              | ✅                           |
| Triggers re-render       | ❌              | ✅                           |
| Can be updated directly  | ✅              | ❌ (must use setter)         |
| UI automatically updates | ❌              | ✅                           |
| Works with async updates | ❌              | ✅                           |

**Key Takeaways:**

* Local variables are **ephemeral** during a render → React forgets them after function finishes.
* State variables are **persistent across renders** and **reactively update the UI**.

---

## 4. Dynamic Button Example (Step-by-Step)

```jsx
function LoginButton() {
  const [buttonText, setButtonText] = useState("Login"); // state variable

  const handleClick = () => {
    if (buttonText === "Login") {
      setButtonText("Logout");
    } else {
      setButtonText("Login");
    }
  };

  return <button onClick={handleClick}>{buttonText}</button>;
}
```

**Flow:**

1. Initial render → button shows “Login”
2. User clicks → `setButtonText("Logout")` called
3. React triggers **re-render**
4. Component function runs again → `buttonText` = “Logout”
5. Virtual DOM diff → only the button text updates
6. User sees “Logout”

---

## 5. First Principles Takeaways

1. **React tracks state** → knows when to refresh the UI
2. **Local variables do not trigger UI updates**
3. **State variables + setter functions** = bridge between **data change and UI update**
4. **Render + diff** is the secret sauce → only update what is necessary
5. This is why React apps are **fast and efficient**, even with complex UIs
---

# Ep.6 Pt 6
# Controlled Input in React: Search Box Example

When building dynamic forms or search functionality, **input values are bound to state**. This is called a **controlled component**.

---

## 1. Basic Setup

```jsx
import React, { useState } from "react";

function SearchBox() {
  const [searchText, setSearchText] = useState(""); // state variable

  return (
    <input
      type="text"
      className="search-box"
      value={searchText} // bound to state
      onChange={(e) => setSearchText(e.target.value)} // update state
      placeholder="Search..."
    />
  );
}
```

**Explanation:**

* `value={searchText}` → the input’s displayed value comes **from state**
* `onChange={(e) => setSearchText(e.target.value)}` → updates state on every keystroke
* Without `onChange`, typing in input **does nothing** because `searchText` never changes

---

## 2. What Happens When You Type

1. User types a character → triggers `onChange` event
2. `setSearchText` updates the state variable
3. React **triggers a re-render** of the component
4. Component function runs again with updated `searchText`
5. Virtual DOM is created → React compares old vs new virtual DOM (**reconciliation**)
6. Only the actual DOM nodes that changed (input value) are updated → UI updates instantly

**Mental Model:**

* You type → React sees a new state → re-renders component function → computes the minimal DOM changes → updates DOM efficiently
* Users see instantaneous changes, **even though the component function technically re-renders fully**

---

## 3. Why React Is Fast

### Reconciliation & Virtual DOM

* React does **not blindly update the real DOM** on every re-render
* React maintains a **virtual DOM**:

  * Lightweight JS representation of the actual DOM
  * When state changes, React builds **new virtual DOM**
  * Compares it with the **previous virtual DOM**
  * Only updates the real DOM where differences exist

### Why it feels instant

* Real DOM updates are **expensive**
* Virtual DOM diffing + React Fiber ensures only minimal changes happen
* Even if your component function runs multiple times, actual **DOM manipulation is minimized**

### React Fiber

* React’s **concurrent rendering engine**
* Breaks rendering work into chunks
* Prioritizes **user interactions and visible updates** → avoids blocking UI
* Makes updates appear smooth even on frequent state changes (like typing)

---

## 4. Controlled Components: Superpowers

| Feature                                 | Effect                           |
| --------------------------------------- | -------------------------------- |
| Bind input value to state               | Always knows current input value |
| `onChange` triggers `setState`          | Updates state reactively         |
| Re-render on every change               | UI stays in sync with state      |
| Reconciliation updates only changed DOM | Fast & efficient                 |

**Benefits:**

* Search input value can be used anywhere in the component immediately
* Makes filtering, validation, and conditional UI easy
* Keeps React state as the **single source of truth**

---

## 5. Common Pitfall

```jsx
const [searchText, setSearchText] = useState("");

<input value={searchText} /> // no onChange
```

* Typing in input does nothing
* Input is **read-only** because React state never changes
* Must use `onChange` to update state → controlled component

---

## 6. First Principles Takeaways

1. **State drives UI:** The only way to make UI dynamic in React is to **change state**
2. **Re-rendering ≠ slow:** Component re-renders are cheap because React updates **only what changed** in the DOM
3. **Virtual DOM + reconciliation** = React’s secret sauce
4. **Controlled components** ensure **state is always the source of truth**
5. React’s Fiber + diffing makes frequent updates (like typing in a search box) feel instantaneous