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
- npx nx g @nx/angular:lib libs/[libName]
- nx g @nx/node:lib libs/metadb/prisma

# Добавить новую библиотеку Nest можно с помощью следующей команды:
- nx g @nx/nest:lib libs/my-nest-lib

# Для создания библиотеки publishableиспользуйте следующую команду
- nx g @nx/nest:lib libs/my-nest-lib --publishable --importPath=@my-workspace/my-nest-lib

# Prisma Commands
- npm install prisma typescript ts-node @types/node --save-dev
- npm install passport passport-jwt @nestjs/passport @supabase/supabase-js
- npx prisma init
- npx prisma init --schema apps/[appName]/prisma/schema.prisma
