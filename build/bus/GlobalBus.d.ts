import { BusScope } from "../scope/createScope";
import { EmitContext, EmitMiddleware, EventKey, EventMap } from "./types";
export declare class GlobalBus<EM extends EventMap = Record<string, any[]>, Strict extends boolean = false> {
    readonly _scope: BusScope;
    _middlewares: EmitMiddleware[];
    _isBatching: boolean;
    _queue: EmitContext[];
    constructor(scope?: BusScope);
    $use: (mw: EmitMiddleware) => void;
    $batch: (fn: () => void) => void;
    $once: <K extends EventKey<EM, Strict>>(name: K, callback: (...args: Strict extends true ? EM[K & keyof EM] : any[]) => any) => void;
    $on: <K extends EventKey<EM, Strict>>(name: K, callback: (...args: Strict extends true ? EM[K & keyof EM] : any[]) => any) => void;
    $onMultiple: <K extends EventKey<EM, Strict>>(name: K, callback: (...args: Strict extends true ? EM[K & keyof EM] : any[]) => any) => void;
    $onCached: <K extends EventKey<EM, Strict>>(name: K, callback: (...args: Strict extends true ? EM[K & keyof EM] : any[]) => any, timeCached?: number) => void;
    $onCachedMultiple: <K extends EventKey<EM, Strict>>(name: K, callback: (...args: Strict extends true ? EM[K & keyof EM] : any[]) => any, timeCached?: number) => void;
    $emit: <K extends EventKey<EM, Strict>>(name: K, ...args: Strict extends true ? EM[K & keyof EM] : any[]) => void;
    $off: <K extends EventKey<EM, Strict>>(name: K, callback?: (...args: Strict extends true ? EM[K & keyof EM] : any[]) => any) => void;
    $offAll: <K extends EventKey<EM, Strict>>(name: K) => void;
    $destroy: () => void;
    $clearEventAcrossScopes: (name: string) => void;
    $scopeEmit: <K extends EventKey<EM, Strict>>(scopeName: string, name: K, ...args: Strict extends true ? EM[K & keyof EM] : any[]) => void;
    $scopeOn: <K extends EventKey<EM, Strict>>(scopeName: string, name: K, callback: (...args: Strict extends true ? EM[K & keyof EM] : any[]) => any) => void;
    $scopeOnce: <K extends EventKey<EM, Strict>>(scopeName: string, name: K, callback: (...args: Strict extends true ? EM[K & keyof EM] : any[]) => any) => void;
    $scopeOnMultiple: <K extends EventKey<EM, Strict>>(scopeName: string, name: K, callback: (...args: Strict extends true ? EM[K & keyof EM] : any[]) => any) => void;
    $scopeOnCached: <K extends EventKey<EM, Strict>>(scopeName: string, name: K, callback: (...args: Strict extends true ? EM[K & keyof EM] : any[]) => any, timeCached?: number) => void;
    $scopeOnCachedMultiple: <K extends EventKey<EM, Strict>>(scopeName: string, name: K, callback: (...args: Strict extends true ? EM[K & keyof EM] : any[]) => any, timeCached?: number) => void;
    $scopeOff: <K extends EventKey<EM, Strict>>(scopeName: string, name: K, callback?: (...args: Strict extends true ? EM[K & keyof EM] : any[]) => any) => void;
    $scopeOffAll: <K extends EventKey<EM, Strict>>(scopeName: string, name: K) => void;
}
