import express from 'express';
import Loaders from './loaders';
import config from './config';

async function startServer() {
  const app = express();
  await Loaders({ expressApp: app });
  app
    .listen(config.port, () => {
      console.log(`
      <===== Server listening on port: ${config.port} =====>
    `);
    })
    .on('error', (err: Error) => {
      console.log(err);
      process.exit(1);
    });
}

startServer();