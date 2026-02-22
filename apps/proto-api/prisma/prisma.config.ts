import 'dotenv/config';
import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: 'schema/schema.prisma',
  migrations: {
    path: 'schema/migrations',
  },
  datasource: {
    url: process.env.DIRECT_URL,
  },
});
