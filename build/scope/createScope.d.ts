export type BusScope = Record<string | symbol, any>;
export declare const createSharedScope: () => BusScope;
export declare const createIsolatedScope: () => BusScope;
