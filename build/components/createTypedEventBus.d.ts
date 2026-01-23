import { EventBusBuilder } from "./EventBusBuilder";
import { EventMap, EventKey } from "./types/typed";
export declare const createTypedEventBus: <EM extends EventMap>() => EventBusBuilder & {
    $on<K extends EventKey<EM>>(name: K, cb: (...args: EM[K]) => any): void;
    $once<K extends EventKey<EM>>(name: K, cb: (...args: EM[K]) => any): void;
    $emit<K extends EventKey<EM>>(name: K, ...args: EM[K]): void;
    $onMultiple<K extends EventKey<EM>>(name: K, cb: (...args: EM[K]) => any): void;
    $onCached<K extends EventKey<EM>>(name: K, cb: (...args: EM[K]) => any, time?: number): void;
};
