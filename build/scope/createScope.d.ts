/**
 * Scope = nơi lưu toàn bộ event map + registry
 * - Shared scope: dùng global (window.top / globalThis)
 * - Isolated scope: object thuần, không dính global
 */
export type BusScope = Record<string | symbol, any>;
/**
 * Global shared scope
 * → tất cả EventBus mặc định dùng chung
 */
export declare const createSharedScope: () => BusScope;
/**
 * Isolated scope
 * → dùng cho createEventBus()
 * → test / micro-frontend / embedded app
 */
export declare const createIsolatedScope: () => BusScope;
