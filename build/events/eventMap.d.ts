import { BusScope } from "../scope/createScope";
import { EventBusData } from "./types";
export declare const getEventMap: (scope: BusScope, scopeName?: string) => Map<string, Set<EventBusData>>;
