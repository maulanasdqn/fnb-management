import express from 'express';
import * as trpcExpress from '@trpc/server/adapters/express';
import { createContext, trpcController } from '@fms/api';
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
    router: trpcController,
    createContext,
  })
);

const port = process.env.API_PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/trpc`);
});
server.on('error', console.error);
