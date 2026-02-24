import { GlobalBus } from "./GlobalBus";
import { ScopeBus } from "./ScopedBus";
import { EventMap } from "./types";
export declare function createEventBus<EM extends EventMap = Record<string, any[]>, Strict extends boolean = false>(eventMap?: EM, options?: {
    runtimeStrict?: boolean;
}): GlobalBus<EM, Strict>;
export declare function createScopedBus<EM extends EventMap, Strict extends boolean = false>(bus: GlobalBus<EM, Strict>, scopeName: string): ScopeBus<EM, Strict>;
export declare function createTypedEventBus<EM extends EventMap>(options?: {
    runtimeStrict?: boolean;
}): GlobalBus<EM, true>;
