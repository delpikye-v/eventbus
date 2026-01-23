import { EventBusBuilder } from "./builder";
declare const EventBus: EventBusBuilder;
export declare const $once: (name: string, callback: import("./types").TCallback) => void, $on: (name: string, callback: import("./types").TCallback) => void, $off: (name: string, callback?: import("./types").TCallback) => void, $offAll: (name: string) => void, $emit: (name: string, ...args: any[]) => void, $onCached: (name: string, callback: import("./types").TCallback, timeCached?: number) => void, $onMultiple: (name: string, callback: import("./types").TCallback) => void, $onCachedMultiple: (name: string, callback: import("./types").TCallback, timeCached?: number) => void, $clearEventAcrossScopes: (name: string) => void, $destroy: () => void, $scopeOn: (scopeName: string, name: string, callback: import("./types").TCallback) => void, $scopeOnce: (scopeName: string, name: string, callback: import("./types").TCallback) => void, $scopeOnMultiple: (scopeName: string, name: string, callback: import("./types").TCallback) => void, $scopeOnCached: (scopeName: string, name: string, callback: import("./types").TCallback, timeCached?: number) => void, $scopeOnCachedMultiple: (scopeName: string, name: string, callback: import("./types").TCallback, timeCached?: number) => void, $scopeEmit: (scopeName: string, name: string, ...args: any[]) => void, $scopeOff: (scopeName: string, name: string, callback?: import("./types").TCallback) => void, $scopeOffAll: (scopeName: string, name: string) => void;
export { EventBusBuilder } from "./builder";
export { createEventBus } from "./builder";
export { createTypedEventBus } from "./builder";
export * from "./types";
export { EventBus as eventBus };
export default EventBus;
