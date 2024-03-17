import express from 'express';
import * as trpcExpress from '@trpc/server/adapters/express';
import { createContext, appRouter } from '@fms/api';
const app = express();

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/trpc`);
});
server.on('error', console.error);
