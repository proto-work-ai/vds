import 'dotenv/config';
import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: './schema',
  migrations: {
    path: 'schema/migrations',
  },
  datasource: {
    url: 'postgresql://postgres:postgres@127.0.0.1:54322/postgres',
  },
});
