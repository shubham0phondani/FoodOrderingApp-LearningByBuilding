# 1. `Emmet`
- Emmet is a tool that helps you write HTML and CSS extremely fast by using short abbreviations that expands into full code.
- Emmet reduces this repetitve typing by letting you describe the structure using a compressed syntax.

# 2. What is `CDN`? Why do we `use` it?
- When You load a website, your browser must downloads many files.
- These files usually live on a server somewhere in the world
## If that server is far away from you -> downloading takes more time.
- Distance = latency.
- More distance = more delay.
## So what if we put copies of those files in many locations around the world?
- Then your browser can download the file from nearest location. 
- That global network of cached copies = CDN.
## What a CDN really is 
- A CDN is a network of servers placed worldwide, each storing cached copies of files so users get the closest copy. 

It acts like:
- A mirror system -> with global distriburion -> to minimize distance between user and file.
## Why we use CDN
1. Speed
nearest server
2. Reduced load on main server
The origin server doesn't get hit by every user.
CDN nodes handle majority of it
3. Scalability

# 3. Why is `React known as React`?

- The name `React` comes from its core idea:
*The UI automatically reacts when the underlying data changes*

* You don't manipulate DOM.
* You manage state/data.
* And React *reacts* to changes in that state.

## when the state changes:
- React recomputes the virtual DOM
- figures out what changed
- updates only minimal required parts of the real DOM.

This automatic response = reaction

UI = a function of state
And when state changes, the UI reacts.

# 4. `crossorigin` in script tag

- A web page lives under one origin
(domain + protocol + port)

Example :
- Your page: http://localhost:3000
- SCript CDN: https//unpkg.com

Since these are *different origins*, the browser becomes careful.

The browser must decide:
- Should I send cookies or tokens ?
- Should I hide error details or show them ?
- Should I threat this as a CORS request ?

## The `crossorigin` attribute tells the browser how to behave when fetching that foriegn script.

# 5. What is difference between `React and ReactDOM`?

*Building UI has two different jobs*

## JOB 1: Describe the UI
* What should UI look like if data is X

This is *Reat's job*

## JOB 2: Put that UI into the real world (browser, mobile, VR, etc.)

* How do I convert that description into actual DOM on the screen ?

This is *ReactDOM's job* (for browsers).

React = brain
ReactDOM = hands (for web)

React itself does not know how to touch the browser.
It only knows how to think.

ReactDOM knows how to *work with the actual web page.*

# `React`
## React is the library that helps you create, manage, and update UI components.

# `ReactDOM`
## ReactDOM is the library that takes React components and actually renders them into the browser's DOM.