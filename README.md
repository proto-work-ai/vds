# App Commands
- npm cache clean --force  
- nx g @nx/angular:app apps/[aprojectName]
- npx nx generate @nx/workspace:move --projectName=[projectName] --newProjectName [projectName] --destination [patch]

# Storybook Commands
- nx add @nx/storybook   
- nx g @nx/angular:storybook-configuration [projectName]
- npx nx run [projectName]:storybook

# Spartan Commands
- npm install -g @nestjs/cli
- npx nx g @spartan-ng/cli:ui [appName]

# Nest Commands
- nx reset
- npx nx g @nx/angular:lib libs/[libName]
- nx g @nx/nest:app apps/my-nest-app
- nx g @nx/nest:lib libs/my-nest-lib
- nx g @nx/nest:lib libs/my-nest-lib --publishable --importPath=@my-workspace/my-nest-lib

# Prisma Commands
- npm install prisma typescript ts-node @types/node --save-dev
- npm install passport passport-jwt @nestjs/passport @supabase/supabase-js
- npx prisma init
- npx prisma init --schema apps/[appName]/prisma/schema.prisma
