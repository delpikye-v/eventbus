type EventGroups = Record<string, Set<string>>;
export declare const saveEventName: (name: string, scopeName?: string) => void;
export declare const getAllEventGroups: () => EventGroups;
export {};
