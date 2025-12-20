# Ep.7 Pt 1
# Understanding `useEffect` in React

`useEffect` is one of React’s most important hooks for handling **side effects**—things like API calls, subscriptions, timers, or manually updating the DOM.

---

## 1. Syntax

```jsx
import React, { useEffect } from "react";

useEffect(() => {
  // callback function
  console.log("Effect is running!");
}, [dependencies]); // dependency array
```

* **First argument:** a callback function that contains the effect
* **Second argument:** dependency array, controls **when the effect runs**

---

## 2. When `useEffect` Runs

### **Case 1: No dependency array**

```jsx
useEffect(() => {
  console.log("Effect runs on every render");
});
```

* Default behavior: **runs after every render**, including the initial render and every re-render
* Use this only if you want your effect to run every time the component updates

**Mental model:**
Think of it like a post-it note attached to your component: every time the component renders, the post-it “effect” executes.

---

### **Case 2: Empty dependency array `[]`**

```jsx
useEffect(() => {
  console.log("Effect runs only once");
}, []);
```

* Runs **only on the first render** (componentDidMount equivalent)
* Never runs again, even if the component re-renders
* Ideal for **initial API calls** or **setup logic**

**Mental model:**
It’s like setting up something once when the component mounts, then never touching it again—like initializing a configuration.

---

### **Case 3: Dependencies in array `[dep1, dep2]`**

```jsx
const [count, setCount] = useState(0);

useEffect(() => {
  console.log("Effect runs when count changes:", count);
}, [count]);
```

* Effect runs **only when one of the dependencies changes**
* Tracks the variables you specify and runs the effect **after the render** that changed them

**Example with a button:**

```jsx
const [buttonText, setButtonText] = useState("Login");

useEffect(() => {
  console.log("Button state changed:", buttonText);
}, [buttonText]);
```

* Every time the button is clicked and `buttonText` changes, the effect runs
* Does **not run** when other state or props change

**Mental model:**
React is “watching” specific variables. The effect triggers **only when they change**, like a smart alarm system that only reacts to specific events.

---

## 3. Summary Table

| Dependency Array    | When `useEffect` Runs             |
| ------------------- | --------------------------------- |
| Not provided        | After **every render**            |
| `[]` (empty)        | Only **on initial render**        |
| `[dep1, dep2, ...]` | Only when **dependencies change** |

---

## 4. Why This Matters

* Prevent unnecessary API calls on every render
* Control **side-effect execution precisely**
* Improve **performance and UX**
* Keep effects **predictable** and **declarative**

**Use Cases:**

* Empty array: fetch initial data once
* Dependency array: trigger effect when search input or button changes
* No array: rarely, when you need something to happen after every render

---

## 5. First Principles Takeaways

1. `useEffect` is always **post-render**
2. Dependency array controls **when the effect runs**
3. React ensures the effect sees the **latest state and props**
4. This gives us precise control over **side effects in functional components**
5. Helps in **optimizing performance** by avoiding unnecessary operations

# Ep.7 Pt 2
# Rules and Best Practices for `useState`

`useState` is the **hook that creates local state in functional components**. React gives it superpowers, but it also comes with strict usage rules to ensure **predictable rendering and reconciliation**.

---

## 1. Always Use `useState` **Inside a Component**

```jsx
// ✅ Correct
function MyComponent() {
  const [count, setCount] = React.useState(0);
  return <div>{count}</div>;
}

// ❌ Incorrect
const [count, setCount] = React.useState(0); // outside component → Error
```

**Why?**

* React **associates state with a specific component instance**
* Hooks rely on the **order they are called** in the component function
* Calling `useState` outside a component has no component instance → React throws an error

**Mental Model:**
Think of state as a personal notebook for each component. If you try to create it outside, there’s **no notebook to attach it to** → chaos.

---

## 2. Call Hooks at the Top of the Component

```jsx
function MyComponent() {
  // ✅ At the top
  const [count, setCount] = React.useState(0);

  if (count > 0) {
    // ❌ Do not call useState here
    // const [another, setAnother] = useState(10); → Error
  }

  return <div>{count}</div>;
}
```

**Why?**

* React relies on **call order** to track hooks
* If hooks are called inside loops, conditions, or nested functions:

  * React cannot match the state to the correct hook during re-render
  * Leads to bugs or crashes

**Rule of Thumb:**

> Always call hooks **unconditionally at the top level** of the component function.

---

## 3. Never Use `useState` Inside Loops, Conditions, or Functions

```jsx
// ❌ Incorrect
for (let i = 0; i < 3; i++) {
  const [item, setItem] = useState(0);
}

if (show) {
  const [flag, setFlag] = useState(false);
}

function handleClick() {
  const [clicked, setClicked] = useState(false);
}
```

**Why?**

* Hooks must execute in the **same order every render**
* Loops and conditions can **change execution order**
* React would lose track of which state belongs to which hook → unpredictable behavior

**Correct Alternative:**

```jsx
function MyComponent() {
  const [flag, setFlag] = useState(false); // always at top

  const handleClick = () => setFlag(!flag);

  return <button onClick={handleClick}>{flag ? "ON" : "OFF"}</button>;
}
```

---

## 4. First Principles Reasoning

1. **React tracks state by call order** → hooks must be predictable
2. **Hooks belong to a component instance** → cannot exist outside
3. **Top-level hook calls** → ensures same order on every render
4. Violating these rules breaks React’s **reconciliation & virtual DOM diffing**

---

## 5. Best Practices

* Always declare state at the **top of functional components**
* Never wrap `useState` in **conditions, loops, or nested functions**
* Treat hooks like **component-specific magic variables** that React tracks internally
* Use **multiple `useState` calls** if needed, but all at the top

```jsx
function MyComponent() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("Shubham");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return <div>{name} clicked {count} times</div>;
}
```
# Ep 7 Pt 3
# React Router: Creating Different Routes in a React App

In React, **everything is a component**, including the pages and layouts. To navigate between pages dynamically without reloading the browser, we use **React Router**.

---

## 1. Installing React Router

```bash
npm install react-router-dom
```

This library provides all the tools for client-side routing.

---

## 2. Core Concepts

### **Router**

* The router keeps track of **which component to show for which URL path**.
* It listens to **browser history changes** and updates the view.

### **Routes**

* Define which **component** should render for which **path**.
* Example paths: `/`, `/about`, `/contact`

### **RouterProvider**

* Provides the routing configuration to your React app
* Wraps the whole app and enables routing
* Previously we rendered `<App />` directly. Now we render `<RouterProvider router={appRouter} />`

---

## 3. Syntax Breakdown

```jsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const appRouter = createBrowserRouter([
  {
    path: "/",           // URL path
    element: <Applayout />,  // Component to render
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/contact",
    element: <Contact />,
  }
]);
```

* `createBrowserRouter([...])` creates **routing configuration**
* Each object in the array represents a route:

  * `path` → URL path
  * `element` → React component to render for that path

**Why it works:**

* When the URL changes, React Router checks the `path` in the router configuration
* Renders the corresponding component inside the RouterProvider

---

## 4. Rendering the Router

```jsx
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
```

* Instead of rendering `<App />`, we render `<RouterProvider router={appRouter} />`
* React Router now **controls which component is shown** based on the URL

---

## 5. Layouts

```jsx
const Applayout = () => {
  return (
    <div className="app">
      <Header />
      <Body />
    </div>
  );
};
```

* Layout components like `Applayout` can include **common UI** (header, footer)
* Child routes render inside this layout

---

## 6. Handling Unexpected Routes (404 / Errors)

* If a user visits an unknown route, React Router shows a **default ugly error page**
* To **customize error handling**, use the `useRouteError` hook

### Example:

```jsx
import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div>
      <h1>Oops!</h1>
      <p>Something went wrong.</p>
      <p>{error.statusText || error.message}</p>
    </div>
  );
};
```

* `useRouteError` provides:

  * `status` → HTTP-like status (404, 500)
  * `statusText` → short description
  * `message` → detailed error message

---

## 7. Recommended Router

```jsx
const appRouter = createBrowserRouter([...]);
```

* `createBrowserRouter` uses **browser history** API (`pushState`)
* Cleaner URLs (no hash `#`)
* Recommended over `HashRouter` unless you have server constraints

---

## 8. Summary of Steps

1. Install `react-router-dom`
2. Create a **router configuration** with `createBrowserRouter`
3. Map each `path` to a component using `element`
4. Wrap your app with `RouterProvider`
5. Optional: Create layouts for common UI (headers, footers)
6. Handle unexpected routes using `useRouteError` for custom error pages

---

## 9. First Principles Takeaways

* **Routing = mapping URL → component**
* React Router uses **virtual DOM diffing** to render only changed parts of the page
* Layout components allow **reusable UI** across pages
* `useRouteError` gives **fine-grained control** over error handling
* Browser router works **client-side** → no page reload needed

# Ep.7 Pt 4
# Child Routes and `<Outlet />` in React Router

When you have **common layouts** like a `Header` or `Footer` across multiple pages, **child routes** allow you to swap only the content while keeping the layout intact.

---

## 1. Layout Component with `<Outlet />`

```jsx
import { Outlet } from "react-router-dom";

const Applayout = () => {
  return (
    <div>
      <Header />   {/* Always visible */}
      <Outlet />   {/* Render child routes here */}
    </div>
  );
};
```

* `<Outlet />` is a **placeholder or tunnel**
* React Router fills it with the **child component** matching the current path
* Layout components like `Header` stay **unchanged** while children swap dynamically

**Mental Model:**

* Think of `<Outlet />` as a **window frame** inside your layout
* Whatever component corresponds to the route “slides” into this window

---

## 2. Defining Child Routes

```jsx
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Applayout />,
    children: [
      { path: "/", element: <Body /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> }
    ]
  }
]);
```

* `children` key defines **nested routes**
* React Router renders **children inside `<Outlet />`**
* Only the content inside `<Outlet />` changes; `Header` remains

---

## 3. Navigation Without Page Reload

### Bad Practice: Anchor Tags

```jsx
<a href="/about">About</a>
```

* Causes **full page reload**
* Browser requests `about.html` from the server → server-side routing
* Loses SPA benefits

---

### Good Practice: `Link` Component

```jsx
import { Link } from "react-router-dom";

<nav>
  <Link to="/">Home</Link>
  <Link to="/about">About</Link>
  <Link to="/contact">Contact</Link>
</nav>
```

* `Link` changes the route **without reloading the page**
* Only updates the relevant components inside `<Outlet />`
* Enables **client-side routing** → fast and smooth transitions

**Mental Model:**

* Imagine your SPA as a **theater stage**
* Layout is the stage itself
* `<Outlet />` is the “scene” being swapped
* Clicking a `Link` just changes the scene → stage (header/footer) stays intact

---

## 4. Client-Side vs Server-Side Routing

| Feature         | Server-Side Routing                | Client-Side Routing (React SPA)              |
| --------------- | ---------------------------------- | -------------------------------------------- |
| Pages           | Separate HTML files (`about.html`) | Components inside single HTML (`index.html`) |
| Navigation      | Full page reload                   | No page reload; swap components only         |
| Network Calls   | Fetch HTML + assets                | Fetch API/data only if needed                |
| User Experience | Slower, flicker on reload          | Fast, smooth, SPA feel                       |

**Key Takeaways:**

* SPA loads once → all components already in memory
* Navigation happens **on the client**, using React Router
* Only **data** is fetched from API if needed, not HTML pages

---

## 5. Summary Flow

1. App loads → `Applayout` renders `Header` + `<Outlet />`
2. React Router checks URL → loads child component into `<Outlet />`
3. Click a `Link` → path changes **without page reload** → only `<Outlet />` re-renders
4. Header remains → child component changes → SPA effect achieved

---

## 6. First Principles Takeaways

1. `<Outlet />` = placeholder for **nested routes**
2. `children` array in router config = **nested routing structure**
3. `Link` avoids full-page reload → SPA behavior
4. Client-side routing = fast, efficient, smooth UI transitions
5. React treats each route as a **component, not a page**
6. Layout components remain intact → only child components update
---


--------------------------------------------
# Ep.7 Pt 5
# Dynamic Routing in React for Restaurant Menus

We are building a **dynamic restaurant menu page** where each restaurant has its own route, and clicking on a restaurant card loads its menu without refreshing the page. This is typical for **Single Page Applications (SPA)** like Swiggy.

---

## 1. Dynamic Routes

Every restaurant should have a **unique route** based on its ID:

```
/restaurants/:resId
```

* `:resId` is a **dynamic parameter**.
* Every restaurant has a **unique ID**, so the route `/restaurants/425` will load a different restaurant than `/restaurants/229`.
* This is achieved using **React Router DOM**.

---

## 2. Fetching Data Based on Route

When a user clicks a restaurant card:

1. The app navigates to `/restaurants/:resId`.
2. The `RestaurantMenu` component uses the **dynamic `resId`** to fetch restaurant-specific menu data.
3. This is done **without page reload**, keeping headers, navigation bars, and other components intact.

```js
import { useParams } from "react-router-dom";

const RestaurantMenu = () => {
  const { resId } = useParams(); // superpower to read dynamic param
  // use resId to fetch API data
};
```

**useParams** is a hook provided by React Router DOM to **access route parameters**.

---

## 3. Reusable Restaurant Component

Instead of creating separate components for every restaurant:

* Build a **single reusable `RestaurantMenu` component**.
* Load dynamic data into it based on `resId`.
* This is **reusability in action**.

```jsx
<Route path="/restaurants/:resId" element={<RestaurantMenu />} />
```

---

## 4. Fetching Restaurant Data

Swiggy’s internal API (`/dapi`) is **not public**. Some challenges include:

1. API may require **API keys, session tokens, or CSRF tokens**.
2. Requests without proper headers may return:

```json
{ "error": "Failed to fetch menu" }
```

3. As a workaround for development, you can use **mock data** or build your own backend proxy to fetch and serve data.

---

## 5. Linking Restaurants

Instead of using standard HTML `<a>` tags, React uses the **`Link` component**:

```jsx
import { Link } from "react-router-dom";

<Link to={`/restaurants/${restaurant.id}`}>
  {restaurant.name}
</Link>
```

**Why not `<a>`?**

* `<a>` triggers a **full page reload**.
* `Link` is a wrapper around `<a>` that **prevents page reload**.
* React Router intercepts clicks on `Link` and **updates the URL & component** without refreshing the SPA.

---

## 6. Single Page Application (SPA) Behavior

* When navigating between restaurants:

  * Headers, navbar, and layout **do not reload**.
  * Only the **RestaurantMenu component updates** based on `resId`.
* This makes the app **faster and smoother**.

---

## 7. State Management for API Data

To display fetched menu data dynamically:

```js
import { useState, useEffect } from "react";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const [menu, setMenu] = useState(null);

  useEffect(() => {
    async function fetchMenu() {
      const response = await fetch(`YOUR_API_ENDPOINT/${resId}`);
      const data = await response.json();
      setMenu(data);
    }
    fetchMenu();
  }, [resId]);

  return (
    <div>
      {menu ? menu.items.map(item => <div key={item.id}>{item.name}</div>) : "Loading..."}
    </div>
  );
};
```

* **`useState`** stores the menu data.
* **`useEffect`** triggers API fetch whenever the `resId` changes.

---

## 8. Summary of Key Concepts

* **Dynamic Routes:** `/restaurants/:resId`
* **Fetching Data Dynamically:** `useParams` + API call
* **Reusable Component:** One `RestaurantMenu` handles all restaurants
* **SPA Navigation:** Use `Link` instead of `<a>` to prevent reloads
* **State Management:** `useState` + `useEffect` for API-driven UI

---

## 9. Tech Industry Analogy

This pattern is widely used in modern web apps:

* **Swiggy/Zomato:** Restaurant menus load dynamically.
* **Amazon:** Product pages have `/product/:productId`.
* **Netflix:** Movie or show pages are dynamic routes like `/show/:id`.
* It’s **essential in e-commerce, food delivery, and SaaS platforms**.

---

## 10. Problem-Solving Advice

* Think in **components and routes**, not pages.
* Identify **dynamic parameters** and **reuse components**.
* Keep **state isolated to the component** that needs it.
* Avoid **full page reloads** by using `Link`.





