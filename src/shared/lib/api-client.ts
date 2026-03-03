import { env } from '../../config';
import { createApiClient } from './api-factory';

const API = createApiClient(env.baseUrl);

export default API;
