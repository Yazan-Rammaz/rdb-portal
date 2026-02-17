import { rdbActionBridge } from '@/utils/rdb/rdb-server';

export const serverActions = new Proxy({} as any, {
    get(_, namespace: string) {
        return new Proxy({}, {
            get(_, action: string) {
                // Return an async function that calls the bridge
                return (args: any) => rdbActionBridge(namespace, action, args);
            }
        });
    }
});