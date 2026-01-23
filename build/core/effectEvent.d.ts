import { IEventBusParams } from "../types/event";
import { BusScope } from "../scope/createScope";
export declare const effectEvent: <Args extends any[]>(scope: BusScope, name: string, params: IEventBusParams<Args>) => void;
