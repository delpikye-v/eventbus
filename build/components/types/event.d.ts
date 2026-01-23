export declare const PREFIX_GROUP = "evtBusZxp_scopeZxp";
export declare const DEFAULT_SCOPE = "globalZxp_defaultName";
export type TCallback<Args extends any[] = any[], R = any> = (...args: Args) => R;
export interface IEventBusParams<Args extends any[] = any[]> {
    callback: TCallback<Args>;
    scopeName?: string;
    single?: boolean;
    once?: boolean;
    timeCached?: number;
}
export interface IEventBusData<Args extends any[] = any[]> extends IEventBusParams<Args> {
    emitted?: boolean;
    timeEffect?: number;
}
