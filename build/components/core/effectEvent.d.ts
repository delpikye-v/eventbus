import { IEventBusParams } from "../types/event";
export declare const effectEvent: <Args extends any[]>(name: string, params: IEventBusParams<Args>) => void;
