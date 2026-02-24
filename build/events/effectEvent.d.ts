import { EventBusParams } from "./types";
import { BusScope } from "../scope/createScope";
export declare const effectEvent: <Args extends any[]>(scope: BusScope, name: string, params: EventBusParams<Args>) => void;
