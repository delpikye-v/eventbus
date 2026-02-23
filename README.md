# 📡 eventbus-z

[![NPM](https://img.shields.io/npm/v/eventbus-z.svg)](https://www.npmjs.com/package/eventbus-z) ![Downloads](https://img.shields.io/npm/dt/eventbus-z.svg)

<a href="https://codesandbox.io/s/d5robq" target="_blank">LIVE EXAMPLE</a>

---

**eventbus-z** is a minimal, framework-agnostic EventBus  
for deterministic UI-level signaling.

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
- No middleware. No hidden behavior.

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

## 🔹 Core Usage

### Listen

```ts
EventBus.$on("LOGIN", (userId) => {
  console.log(userId)
})
```

### Emit

```ts
EventBus.$emit("LOGIN", "user-1")
```

### Once

```ts
EventBus.$once("READY", () => {
  console.log("Triggered once")
})
```

### Remove

```ts
EventBus.$off("LOGIN", handler)
EventBus.$offAll("LOGIN")
```

---

## 🔹 React Example (Effect-safe)

```tsx
import React from "react"
import EventBus from "eventbus-z"

export default function App() {
  React.useEffect(() => {
    const handler = (value: number) => {
      alert(value)
    }

    EventBus.$on("ALERT", handler)
    return () => EventBus.$off("ALERT", handler)
  }, [])

  return (
    <button onClick={() => EventBus.$emit("ALERT", 123)}>
      Emit Event
    </button>
  )
}
```

---

## 🔹 React Hook Helper

```tsx
import React from "react"
import { $on, $off } from "eventbus-z"

export function useEventBus(
  name: string,
  callback: (...args: any[]) => void
) {
  React.useEffect(() => {
    $on(name, callback)
    return () => $off(name, callback)
  }, [name, callback])
}
```

---

## 🔹 Typed EventBus (TypeScript)

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

## 🔹 Isolated Instances

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
busB.$emit("PING") // nothing happens
```

---

## 🔹 Cached Listeners

```ts
EventBus.$onCached("USER", handler, 200)
EventBus.$onCachedMultiple("USER", handler, 200)
```

- `timeCached` prevents rapid duplicate execution
- Useful for UI-triggered rapid events

---

## 🔹 Scoped Events

Allows event isolation by scope.

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

## 🧩 API

### Global Events (default scope)

| Method                                     | Description                       |
| ------------------------------------------ | --------------------------------- |
| `$emit(name, ...args)`                     | Emit event                        |
| `$once(name, callback)`                    | Listen once                       |
| `$on(name, callback)`                      | Single listener (unique callback) |
| `$onMultiple(name, callback)`              | Allow multiple listeners          |
| `$onCached(name, callback, time?)`         | Cached single listener            |
| `$onCachedMultiple(name, callback, time?)` | Cached multi listener             |
| `$off(name, callback?)`                    | Remove listener                   |
| `$offAll(name)`                            | Remove all listeners              |
| `$clearEventAcrossScopes(name)`            | Remove event from all scopes      |

---

### Scoped Events

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

## 🧭 Design Principles

- Synchronous execution
- Deterministic ordering
- No async queue
- No internal scheduler
- No replay
- No state retention
- No middleware system

If you need:

- State → use a store  
- Async orchestration → use effects  
- Business logic → keep it outside EventBus  

---

## 🔍 Comparison

| Criteria                  | eventbus-z  | mitt       |
| ------------------------- | ----------- | ---------- |
| Emit / Listen             | ✅          | ✅          |
| Once listener             | ✅ Built-in | ❌ Manual   |
| Multiple listener control | ✅          | ❌          |
| Cached listener           | ✅          | ❌          |
| Scoped events             | ✅          | ❌          |
| Multi-instance            | ✅          | ❌          |
| Micro-frontend safe       | ✅          | ❌          |
| Typed event map           | ✅          | ⚠️ Limited  |
| Dependencies              | 0           | 0          |
| Bundle size               | Small       | Smaller    |

---

## 🚀 What Makes It Different?

Unlike minimal pub/sub libraries:

- Scoped event isolation
- Built-in once & cached listeners
- Deterministic synchronous execution
- Global shared bus + isolated instances
- Micro-frontend safe by design

It stays minimal — but infrastructure-ready.

---

## 🚫 Non-goals

eventbus-z intentionally does NOT provide:

- State management
- Async pipelines
- Middleware system
- Event replay / history
- Stream / Rx semantics

---

## 📜 License

MIT