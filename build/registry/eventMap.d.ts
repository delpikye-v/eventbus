import { BusScope } from "../scope/createScope";
import { IEventBusData } from "../types/event";
export declare const getEventMap: (scope: BusScope, scopeName?: string) => Map<string, Set<IEventBusData>>;
