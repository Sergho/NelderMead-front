import { startApp } from './app/utils/start-app';
import { getEnv } from './common/utils/get-env';
import { startServer } from './server/utils/start-server';

if (getEnv() === 'prod') {
  startServer();
  startApp();
}
