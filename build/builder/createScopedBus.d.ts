import { EventBusBuilder } from "./EventBusBuilder";
export declare const createScopedBus: (bus: EventBusBuilder, scopeName: string) => {
    $on: (name: string, cb: any) => void;
    $once: (name: string, cb: any) => void;
    $onMultiple: (name: string, cb: any) => void;
    $onCached: (name: string, cb: any, time?: number) => void;
    $onCachedMultiple: (name: string, cb: any, time?: number) => void;
    $emit: (name: string, ...args: any[]) => void;
    $off: (name: string, cb?: any) => void;
    $offAll: (name: string) => void;
};
