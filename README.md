# App Commands
- npm cache clean --force  
- nx g @nx/angular:app apps/[aprojectName]
- npx nx generate @nx/workspace:move --projectName=[projectName] --newProjectName [projectName] --destination [patch]

# Storybook Commands
- nx add @nx/storybook   
- nx g @nx/angular:storybook-configuration [projectName]
- npx nx run [projectName]:storybook

# Spartan Commands
- npx nx g @spartan-ng/cli:ui [appName]
- npx nx g @nx/angular:lib libs/[libName]
- nx g @nx/node:lib libs/metadb/prisma

# Prisma Commands
- npm install prisma typescript ts-node @types/node --save-dev
- npm install passport passport-jwt @nestjs/passport @supabase/supabase-js
- npx prisma init
- npx prisma init --schema apps/[appName]/prisma/schema.prisma
