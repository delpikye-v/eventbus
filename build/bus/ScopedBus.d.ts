import { GlobalBus } from "./GlobalBus";
import { EventKey, EventMap } from "./types";
export declare class ScopeBus<EM extends EventMap, Strict extends boolean = false> {
    private readonly _bus;
    private readonly _scopeName;
    constructor(bus: GlobalBus<EM, Strict>, scopeName: string);
    $emit: <K extends EventKey<EM, Strict>>(name: K, ...args: Strict extends true ? EM[K & keyof EM] : any[]) => void;
    $on: <K extends EventKey<EM, Strict>>(name: K, callback: Strict extends true ? (...args: EM[K & keyof EM]) => any : (...args: any[]) => any) => void;
    $once: <K extends EventKey<EM, Strict>>(name: K, callback: Strict extends true ? (...args: EM[K & keyof EM]) => any : (...args: any[]) => any) => void;
    $onMultiple: <K extends EventKey<EM, Strict>>(name: K, callback: Strict extends true ? (...args: EM[K & keyof EM]) => any : (...args: any[]) => any) => void;
    $off: <K extends EventKey<EM, Strict>>(name: K, callback?: (...args: any[]) => any) => void;
    $offAll: <K extends EventKey<EM, Strict>>(name: K) => void;
}
