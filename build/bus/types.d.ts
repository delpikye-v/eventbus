export type EventMap = Record<string, any[]>;
export type EventKey<EM extends EventMap, Strict extends boolean> = Strict extends true ? keyof EM & string : string;
export type EmitContext = {
    scopeName: string;
    name: string;
    args: unknown[];
};
export type EmitMiddleware = (context: EmitContext, next: () => void) => void;
