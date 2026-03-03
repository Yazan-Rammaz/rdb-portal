export { default as API } from './api-client';
// Note: getServerApi is NOT re-exported here because it imports next/headers
// which can only be used in Server Components. Import directly via:
// import { getServerApi } from '@/shared/lib/api-server';
export { createApiClient } from './api-factory';
export { queryClient } from './query-client';
