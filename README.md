# 📡 eventbus-z

[![NPM](https://img.shields.io/npm/v/eventbus-z.svg)](https://www.npmjs.com/package/eventbus-z) ![Downloads](https://img.shields.io/npm/dt/eventbus-z.svg)

<a href="https://codesandbox.io/p/sandbox/qt9r86" target="_blank">LIVE EXAMPLE</a>

---

**eventbus-z** is a lightweight, synchronous EventEmitter alternative for TypeScript and JavaScript applications.

Zero dependencies. No shared state. No magic.

> Emit. Listen. Done.

---

## ✨ Why eventbus-z?

- Simple `emit / on / off`
- Deterministic synchronous execution
- Scoped events
- Multi-instance isolation
- Micro-frontend & iframe safe
- Type-safe (optional)
- Zero dependencies
- No hidden behavior

---

## 🧠 Mental Model

**eventbus-z** is a synchronous signaling layer.

It is NOT:

- A state manager  
- A data pipeline  
- A middleware system  
- A stream abstraction  

It is designed for:

> UI signaling and infrastructure-level event coordination.

---

## 📦 Installation

```bash
npm install eventbus-z
```

---

## ⚡ Quick Start

```ts
import EventBus from "eventbus-z"

EventBus.$on("PING", () => {
  console.log("pong")
})

EventBus.$emit("PING")
```

✔ Synchronous  
✔ Deterministic  
✔ Zero side effects  

---

# 🔹 Core Usage

## Listen

```ts
EventBus.$on("LOGIN", (userId: string) => {
  console.log(userId)
})
```

## Emit

```ts
EventBus.$emit("LOGIN", "user-1")
```

## Once

```ts
EventBus.$once("READY", () => {
  console.log("Triggered once")
})
```

## Remove

```ts
EventBus.$off("LOGIN", handler)
EventBus.$offAll("LOGIN")
```

---

# 🔹 Node.js Example

`eventbus-z` works in Node.js because it has:

- Zero dependencies
- No DOM usage
- No browser APIs
- Pure synchronous execution

---

## Basic Usage (CommonJS)

```js
import EventBus from "eventbus-z"

EventBus.$on("JOB_DONE", (jobId) => {
  console.log("Job finished:", jobId)
})

function runJob() {
  console.log("Running job...")
  EventBus.$emit("JOB_DONE", "job-42")
}

runJob()
```

Output:

```
Running job...
Job finished: job-42
```

---

## Basic Usage (ESM)

```js
import EventBus from "eventbus-z"

EventBus.$on("SERVER_START", (port) => {
  console.log(`Server started on port ${port}`)
})

EventBus.$emit("SERVER_START", 3000)
```

---

## Typed EventBus (TypeScript + Node)

```ts
import { createTypedEventBus } from "eventbus-z"

type ServerEvents = {
  start: [port: number]
  shutdown: []
  error: [message: string]
}

const bus = createTypedEventBus<ServerEvents>()

bus.$on("start", (port) => {
  console.log("Server running on:", port)
})

bus.$emit("start", 8080)

// bus.$emit("start", "8080") ❌ Type error
```

---

## Isolated Bus per Module

Useful for large Node systems or plugin architecture.

```ts
import { createEventBus } from "eventbus-z"

const authBus = createEventBus()
const paymentBus = createEventBus()

authBus.$on("LOGIN", () => {
  console.log("Auth login")
})

paymentBus.$emit("LOGIN")
// Nothing happens (isolated instance)
```

---

## Lightweight Internal Signaling

Example: decoupling services

```ts
import EventBus from "eventbus-z"

function userService() {
  EventBus.$emit("USER_CREATED", { id: 1 })
}

function emailService() {
  EventBus.$on("USER_CREATED", (user) => {
    console.log("Send welcome email to", user.id)
  })
}

emailService()
userService()
```

---

## When to Use in Node

Good for:

- Internal module signaling
- Plugin systems
- CLI coordination
- Infrastructure events
- Decoupling services without shared state

Not for:

- Distributed messaging
- Cross-process communication
- Async job queues
- Event sourcing

---

eventbus-z stays synchronous and deterministic in Node,
just like in the browser.

---

# 🔹 React Example (Effect-safe)

```tsx
import React from "react"
import EventBus from "eventbus-z"

export default function App() {
  React.useEffect(() => {
    const handler = (value: number) => {
      alert(value)
    }

    EventBus.$on("ALERT", handler)

    return () => {
      EventBus.$off("ALERT", handler)
    }
  }, [])

  return (
    <button onClick={() => EventBus.$emit("ALERT", 123)}>
      Emit Event
    </button>
  )
}
```

---

# 🔹 React Hook Helper

```tsx
import React from "react"
import EventBus from "eventbus-z"

export function useEventBus(
  name: string,
  callback: (...args: any[]) => void
) {
  React.useEffect(() => {
    EventBus.$on(name, callback)
    return () => EventBus.$off(name, callback)
  }, [name, callback])
}
```

---

# 🔹 Typed EventBus (TypeScript)

Zero runtime cost. Compile-time safety only.

```ts
import { createTypedEventBus } from "eventbus-z"

type AppEvents = {
  login: [userId: string]
  logout: []
}

const bus = createTypedEventBus<AppEvents>()

bus.$on("login", id => {
  console.log(id) // string
})

bus.$emit("login", "user-1")

// bus.$emit("login", 123) ❌ Type error
```

---

# 🔹 Isolated Instances

Useful for:

- Tests
- Micro-frontends
- Embedded apps
- Domain isolation

```ts
import { createEventBus } from "eventbus-z"

const busA = createEventBus()
const busB = createEventBus()

busA.$on("PING", () => console.log("A"))

busB.$emit("PING") 
// nothing happens
```

Each instance has its own isolated scope.

---

# 🔹 Cached Listeners

Prevent rapid duplicate execution.

```ts
EventBus.$onCached("USER", handler, 200)

EventBus.$onCachedMultiple("USER", handler, 200)
```

`timeCached` (ms) prevents repeated triggers within the time window.

Useful for:

- Rapid button clicks
- UI spam prevention
- High-frequency UI signals

---

# 🔹 Scoped Events

Event isolation by logical scope.

```ts
EventBus.$scopeOn("auth", "LOGIN", handler)

EventBus.$scopeEmit("auth", "LOGIN", "user-1")
```

Useful for:

- Micro-frontends
- Embedded apps
- Module isolation
- Multi-tenant systems

---


# 🔹 $on vs $onMultiple

eventbus-z provides two ways to register listeners.

They look similar — but behave differently.

---

## `$on` — Prevents Duplicate Registration

`$on` ensures the same callback function  
is not registered multiple times for the same event.

```ts
import EventBus from "eventbus-z"

function handler() {
  console.log("System ready")
}

EventBus.$on("READY", handler) // ignored (duplicate)
EventBus.$on("READY", handler) // run

EventBus.$emit("READY")
```

Output:

```
System ready
```

✔ Safe against accidental double registration  
✔ Useful for lifecycle events  
✔ Good for single-owner logic  

---

## `$onMultiple` — Allows Multiple Listeners

`$onMultiple` allows multiple callbacks  
for the same event.

```ts
import EventBus from "eventbus-z"

EventBus.$onMultiple("READY", () => {
  console.log("Module A ready")
})

EventBus.$onMultiple("READY", () => {
  console.log("Module B ready")
})

EventBus.$emit("READY")
```

Output:

```
Module A ready
Module B ready
```

✔ Broadcast-style behavior  
✔ Useful for plugin systems  
✔ Multiple modules can react independently  

---

## Practical Example

### System Initialization

```ts
EventBus.$on("BOOT", initSystem)
```

Only one system initializer should run.

---

### Feature Modules

```ts
EventBus.$onMultiple("USER_LOGIN", logAnalytics)
EventBus.$onMultiple("USER_LOGIN", refreshUI)
EventBus.$onMultiple("USER_LOGIN", syncSession)
```

Multiple independent reactions to one event.

---

## Summary

| Method          | Prevents Duplicate | Allows Multiple Listeners  | Typical Use         |
|-----------------|--------------------|----------------------------|---------------------|
| `$on`           | ✅ Yes             | ⚠️ No (same function)       | Single-owner logic  |
| `$onMultiple`   | ❌ No              | ✅ Yes                      | Broadcast / plugins |

---

Both methods remain:

✔ Synchronous  
✔ Deterministic  
✔ Zero async queue  
✔ No hidden behavior  

---


# 🧩 API

## Global Events (default scope)

| Method                                     | Description                              |
| ------------------------------------------ | ---------------------------------------- |
| `$emit(name, ...args)`                     | Emit event                               |
| `$once(name, callback)`                    | Listen once                              |
| `$on(name, callback)`                      | Prevents duplicate callback registration |
| `$onMultiple(name, callback)`              | Allow multiple listeners                 |
| `$onCached(name, callback, time?)`         | Cached single listener                   |
| `$onCachedMultiple(name, callback, time?)` | Cached multi listener                    |
| `$off(name, callback?)`                    | Remove listener                          |
| `$offAll(name)`                            | Remove all listeners                     |
| `$clearEventAcrossScopes(name)`            | Remove event from all scopes             |

---

## Scoped Events

| Method                                                 | Description                   |
| ------------------------------------------------------ | ----------------------------- |
| `$scopeEmit(scope, name, ...args)`                     | Emit event within scope       |
| `$scopeOnce(scope, name, callback)`                    | Listen once in scope          |
| `$scopeOn(scope, name, callback)`                      | Single listener in scope      |
| `$scopeOnMultiple(scope, name, callback)`              | Multiple listeners in scope   |
| `$scopeOnCached(scope, name, callback, time?)`         | Cached listener in scope      |
| `$scopeOnCachedMultiple(scope, name, callback, time?)` | Cached multi in scope         |
| `$scopeOff(scope, name, callback?)`                    | Remove listener in scope      |
| `$scopeOffAll(scope, name)`                            | Remove all listeners in scope |

---

# 🧭 Design Principles

- Synchronous execution
- Deterministic ordering
- No async queue
- No scheduler
- No replay
- No state retention

If you need:

- State → use a store  
- Async orchestration → use effects  
- Business logic → keep it outside EventBus  

---

# 🔍 Comparison

| Criteria                  | eventbus-z  | mitt |
| ------------------------- | ----------- | ---- |
| Emit / Listen             | ✅          | ✅   |
| Once listener             | ✅ Built-in | ❌   |
| Multiple listener control | ✅          | ❌   |
| Cached listener           | ✅          | ❌   |
| Scoped events             | ✅          | ❌   |
| Multi-instance            | ✅          | ❌   |
| Micro-frontend safe       | ✅          | ❌   |
| Typed event map           | ✅          | ⚠️   |
| Dependencies              | 0          | 0    |

---

# 🚀 What Makes It Different?

Unlike minimal pub/sub libraries:

- Scoped event isolation
- Built-in once & cached listeners
- Deterministic synchronous execution
- Global shared bus + isolated instances
- Micro-frontend safe by design

It stays minimal — but infrastructure-ready.

---

# 🚫 Non-goals

eventbus-z intentionally does NOT provide:

- State management
- Async pipelines
- Middleware system
- Event replay / history
- Stream / Rx semantics

---

# 📜 License

MIT