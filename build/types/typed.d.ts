export type EventMap = Record<string, any[]>;
export type EventKey<EM extends EventMap> = keyof EM & string;
export type EventCallback<EM extends EventMap, K extends EventKey<EM>> = (...args: EM[K]) => any;
