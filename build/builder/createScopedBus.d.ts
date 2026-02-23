import { EventBusBuilder } from "./EventBusBuilder";
import { TCallback } from "../types/event";
export declare const createScopedBus: (bus: EventBusBuilder, scopeName: string) => {
    $on: (name: string, cb: TCallback) => void;
    $once: (name: string, cb: TCallback) => void;
    $onMultiple: (name: string, cb: TCallback) => void;
    $onCached: (name: string, cb: TCallback, time?: number) => void;
    $onCachedMultiple: (name: string, cb: TCallback, time?: number) => void;
    $emit: (name: string, ...args: unknown[]) => void;
    $off: (name: string, cb?: TCallback) => void;
    $offAll: (name: string) => void;
};
