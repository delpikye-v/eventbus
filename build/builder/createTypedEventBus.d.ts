import { EventBusBuilder } from "./EventBusBuilder";
import { EventMap, EventKey } from "../types/typed";
type TypedBus<EM extends EventMap> = EventBusBuilder & {
    $on<K extends EventKey<EM>>(name: K, cb: (...args: EM[K]) => any): void;
    $once<K extends EventKey<EM>>(name: K, cb: (...args: EM[K]) => any): void;
    $emit<K extends EventKey<EM>>(name: K, ...args: EM[K]): void;
    $onMultiple<K extends EventKey<EM>>(name: K, cb: (...args: EM[K]) => any): void;
    $onCached<K extends EventKey<EM>>(name: K, cb: (...args: EM[K]) => any, time?: number): void;
    $onCachedMultiple<K extends EventKey<EM>>(name: K, cb: (...args: EM[K]) => any, time?: number): void;
    $scopeOn<K extends EventKey<EM>>(scope: string, name: K, cb: (...args: EM[K]) => any): void;
    $scopeOnce<K extends EventKey<EM>>(scope: string, name: K, cb: (...args: EM[K]) => any): void;
    $scopeEmit<K extends EventKey<EM>>(scope: string, name: K, ...args: EM[K]): void;
    $scopeOnMultiple<K extends EventKey<EM>>(scope: string, name: K, cb: (...args: EM[K]) => any): void;
    $scopeOnCached<K extends EventKey<EM>>(scope: string, name: K, cb: (...args: EM[K]) => any, time?: number): void;
    $scopeOnCachedMultiple<K extends EventKey<EM>>(scope: string, name: K, cb: (...args: EM[K]) => any, time?: number): void;
};
export declare const createTypedEventBus: <EM extends EventMap>() => TypedBus<EM>;
export {};
