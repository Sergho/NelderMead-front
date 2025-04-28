import { startServer } from './utils/start-server';

startServer();

import { divide } from '../addon/binding';

console.log(divide(4, 6));
