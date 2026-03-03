"use server";

import { getServerActions } from 'rdb/server';

export async function rdbActionBridge(namespace: string, action: string, args: any) {
    // 1. Fetch the real actions from the library (Server-side)
    const allActions = await getServerActions();

    // 2. Resolve the function
    const ns = (allActions as any)[namespace];
    const fn = ns?.[action];

    if (typeof fn !== 'function') {
        throw new Error(`Action ${namespace}.${action} not found`);
    }

    // 3. Execute and return (Internal server call)
    return await fn(args);
}