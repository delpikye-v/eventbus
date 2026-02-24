export declare const PREFIX_GROUP = "evtBusZxp_scopeZxp";
export declare const DEFAULT_SCOPE = "globalZxp_defaultName";
export type CallbackType<Args extends any[] = any[], R = any> = (...args: Args) => R;
export interface EventBusParams<Args extends any[] = any[]> {
    callback: CallbackType<Args>;
    scopeName?: string;
    single?: boolean;
    once?: boolean;
    timeCached?: number;
}
export interface EventBusData<Args extends any[] = any[]> extends EventBusParams<Args> {
    emitted?: boolean;
    timeEffect?: number;
}
