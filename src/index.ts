import { startApp } from './app/utils/start-app';
import { getEnv } from './common/utils/getEnv';
import { startServer } from './server/utils/startServer';

if (getEnv() === 'prod') {
  startServer();
  startApp();
}
