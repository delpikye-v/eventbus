import { EventBusBuilder } from "./components/EventBusBuilder";
import { createEventBus } from "./components/createEventBus";
import { createTypedEventBus } from "./components/createTypedEventBus";
declare const EventBus: EventBusBuilder;
export declare const $once: (name: string, callback: import("./components/types/event").TCallback) => void, $on: (name: string, callback: import("./components/types/event").TCallback) => void, $off: (name: string, callback?: import("./components/types/event").TCallback) => void, $offAll: (name: string) => void, $emit: (name: string, ...args: any[]) => void, $onCached: (name: string, callback: import("./components/types/event").TCallback, timeCached?: number) => void, $onMultiple: (name: string, callback: import("./components/types/event").TCallback) => void, $onCachedMultiple: (name: string, callback: import("./components/types/event").TCallback, timeCached?: number) => void, $clearAllEventName: (name: string) => void;
export { EventBus as eventBus, createEventBus, createTypedEventBus, };
export default EventBus;
