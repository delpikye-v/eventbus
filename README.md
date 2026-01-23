# eventbus-z

[![NPM](https://img.shields.io/npm/v/eventbus-z.svg)](https://www.npmjs.com/package/eventbus-z) ![Downloads](https://img.shields.io/npm/dt/eventbus-z.svg)

<a href="https://codesandbox.io/s/d5robq">LIVE EXAMPLE</a>

---

## Description

A **minimal, framework-agnostic EventBus** for frontend applications.

**What it is**
- Simple `emit / listen` event bus
- No shared state, no side effects, no magic
- Designed for UI-level communication

**What it is NOT**
- Not a state manager
- Not a data pipeline
- Not a middleware system

---

## Features

- ✅ Simple API (`emit / on / off`)
- ✅ Typed events (TypeScript, optional)
- ✅ Global shared bus (safe `window.top` + `globalThis`)
- ✅ Multi-instance (isolated buses)
- ✅ Micro-frontend & iframe friendly
- ✅ Works with React / Vue / Angular / Vanilla JS
- ✅ Zero dependencies

---

## Installation

```bash
npm install eventbus-z
```

---

## Import

```ts

// import EventBus from "eventbus-z";
import { $on, $off, $emit } from "eventbus-z";
```

---

## Usage

### 1️⃣ Basic usage (Vanilla / any framework)

```ts
EventBus.$on("PING", () => {
  console.log("pong");
});

EventBus.$emit("PING");
```

---

### 2️⃣ React example (effect-safe)

```tsx
import React from "react";
import EventBus from "eventbus-z";

export default function App() {
  React.useEffect(() => {
    const handler = (value: number) => {
      alert(value);
    };

    EventBus.$on("ALERT", handler);
    return () => EventBus.$off("ALERT", handler);
  }, []);

  return (
    <button onClick={() => EventBus.$emit("ALERT", 123)}>
      Emit Event
    </button>
  );
}
```

---

### 3️⃣ React hook helper

```tsx
import React from "react";
import { $on, $off } from "eventbus-z";

export function useEventBus(
  name: string,
  callback: (...args: any[]) => void
) {
  React.useEffect(() => {
    $on(name, callback);
    return () => $off(name, callback);
  }, [name, callback]);
}
```

---

### 4️⃣ Typed EventBus (TypeScript)

```ts
import { createTypedEventBus } from "eventbus-z";

type AppEvents = {
  login: [userId: string];
  logout: [];
};

const bus = createTypedEventBus<AppEvents>();

bus.$on("login", id => {
  console.log(id); // string
});

bus.$emit("login", "user-1");

// bus.$emit("login", 123); // ❌ Type error
```

---

### 5️⃣ Isolated EventBus instance

Useful for:
- Tests
- Micro-frontends
- Embedded apps

```ts
import { createEventBus } from "eventbus-z";

const busA = createEventBus();
const busB = createEventBus();

busA.$on("PING", () => console.log("A"));
busB.$emit("PING"); // nothing happens
```

---

#### Cached
```ts
// query.ts
const getUser = cache(async (id) => fetchUser(id))

// event
EventBus.$emit("USER_REQUEST", id)

// listener
EventBus.$on("USER_REQUEST", async (id) => {
  const user = await getUser(id)
  render(user)
})
```

## API

### Global Events (default scope)

| Method | Description |
|------|------------|
| `$emit(name, ...args)` | Emit event |
| `$once(name, callback)` | Listen once |
| `$on(name, callback)` | Single listener (unique callback) |
| `$onMultiple(name, callback)` | Allow multiple listeners |
| `$onCached(name, callback, time?)` | Single listener with cache |
| `$onCachedMultiple(name, callback, time?)` | Multi listeners with cache |
| `$off(name, callback)` | Remove listener |
| `$offAll(name)` | Remove all listeners |
| `$clearAllEventName(name)` | Remove event from all scopes |

---

### Scoped Events

| Method | Description |
|------|------------|
| `$scopeEmit(name, scope, ...args)` | Emit event in scope |
| `$scopeOnce(name, scope, callback)` | Listen once in scope |
| `$scopeOn(name, scope, callback)` | Single listener in scope |
| `$scopeOnMultiple(name, scope, callback)` | Multiple listeners |
| `$scopeOnCached(name, scope, callback, time?)` | Cached listener |
| `$scopeOnCachedMultiple(name, scope, callback, time?)` | Cached multi |
| `$scopeOff(name, scope, callback?)` | Remove listener |
| `$scopeOffAll(name, scope)` | Remove all listeners |

---

## Design Notes

- EventBus is **synchronous**
- No internal queue, no async scheduling
- Deterministic execution order
- Designed for **UI signaling**, not data flow

If you need:
- state → use a store
- async pipelines → use effects
- business logic → keep it outside EventBus

---

## Comparison with mitt

| Feature / Library            | **eventbus-z**                   | **mitt**             |
| ---------------------------- | -------------------------------- | -------------------- |
| Core purpose                 | UI signaling / infra event bus   | Minimal pub/sub      |
| Emit / listen                | ✅                               | ✅                   |
| Once listener                | ✅ Built-in                      | ❌ Manual            |
| Multiple listeners control   | ✅ (`single` / `multiple`)       | ❌                   |
| Cached / throttled emit      | ✅ (`timeCached`)                | ❌                   |
| Scoped events                | ✅ (`scopeName`)                 | ❌                   |
| Global + isolated instances  | ✅                               | ❌ (single instance) |
| micro-frontend / iframe safe | ✅ (`window.top` / `globalThis`) | ❌                   |
| Typed Event Map (TS)         | ✅ Supported                     | ⚠️ Limited           |
| Test isolation               | ✅ (`createEventBus`)            | ⚠️ Manual            |
| Middleware / plugins         | ❌ (by design)                   | ❌                   |
| Bundle size                  | Small                            | Smaller             |
| Learning curve               | Low                              | Very low            |

---

## License

MIT
