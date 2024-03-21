import express from 'express';
import * as trpcExpress from '@trpc/server/adapters/express';
import { createContext } from '@fms/trpc-server';
import { appRouter } from '@fms/trpc-router';
import cors from 'cors';
const app = express();

app.use(
  cors({
    origin: '*',
  })
);

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

const port = process.env.API_PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/trpc`);
});
server.on('error', console.error);
