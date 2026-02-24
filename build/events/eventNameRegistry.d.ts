import { BusScope } from "../scope/createScope";
type EventGroups = Record<string, Set<string>>;
export declare const saveEventName: (scope: BusScope, name: string, scopeName?: string) => void;
export declare const getAllEventGroups: (scope: BusScope) => EventGroups;
export {};
