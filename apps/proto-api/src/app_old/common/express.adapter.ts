import { ExpressAdapter } from '@nestjs/platform-express';
import * as compression from 'compression';
import * as express from 'express';

const server = express();
server.use(compression());
const expressAdapter = new ExpressAdapter(server);

export { expressAdapter };
