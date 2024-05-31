if (String(process.env.NODE_ENV).trim() !== 'dev') {
  require('module-alias/register');
}

import createApp from './app';

(async () => {
  await createApp();
})();
