import { TCallback } from "../types/event";
import { BusScope } from "../scope/createScope";
export declare class EventBusBuilder {
    private readonly scope;
    constructor(scope?: BusScope);
    $once(name: string, callback: TCallback): void;
    $on(name: string, callback: TCallback): void;
    $onMultiple(name: string, callback: TCallback): void;
    $onCached(name: string, callback: TCallback, timeCached?: number): void;
    $onCachedMultiple(name: string, callback: TCallback, timeCached?: number): void;
    $emit(name: string, ...args: any[]): void;
    $off(name: string, callback?: TCallback): void;
    $offAll(name: string): void;
    $destroy(): void;
    $clearAllEventName(name: string): void;
    $clearEventAcrossScopes(name: string): void;
    $scopeOn(scopeName: string, name: string, callback: TCallback): void;
    $scopeOnce(scopeName: string, name: string, callback: TCallback): void;
    $scopeOnMultiple(scopeName: string, name: string, callback: TCallback): void;
    $scopeOnCached(scopeName: string, name: string, callback: TCallback, timeCached?: number): void;
    $scopeOnCachedMultiple(scopeName: string, name: string, callback: TCallback, timeCached?: number): void;
    $scopeEmit(scopeName: string, name: string, ...args: any[]): void;
    $scopeOff(scopeName: string, name: string, callback?: TCallback): void;
    $scopeOffAll(scopeName: string, name: string): void;
}
