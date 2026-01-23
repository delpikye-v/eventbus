import { TCallback } from "./types/event";
import { BusScope } from "./scope/createScope";
export declare class EventBusBuilder {
    private readonly scope;
    constructor(scope?: BusScope);
    private getEventMap;
    $once(name: string, callback: TCallback): void;
    $on(name: string, callback: TCallback): void;
    $onMultiple(name: string, callback: TCallback): void;
    $onCached(name: string, callback: TCallback, timeCached?: number): void;
    $onCachedMultiple(name: string, callback: TCallback, timeCached?: number): void;
    $emit(name: string, ...args: any[]): void;
    $off(name: string, callback?: TCallback): void;
    $offAll(name: string): void;
    $clearAllEventName(name: string): void;
}
