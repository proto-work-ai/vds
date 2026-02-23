/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "AttributeType" AS ENUM ('RELATION', 'RELATION_MANY', 'BOOLEAN', 'TINYINT', 'SMALLINT', 'INT', 'BIGINT', 'FLOAT', 'TIME', 'DATE', 'DATETIME', 'STRING', 'MEMO', 'MEDIA', 'IMAGE', 'SELECT', 'JSON', 'PARENT', 'PARENT_MANY', 'PARENT_COUNT');

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "mdb_entity" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255),
    "title" VARCHAR(255),
    "description" VARCHAR(255),
    "readonly" BOOLEAN DEFAULT false,
    "type" VARCHAR(255),
    "hidden" BOOLEAN DEFAULT false,
    "order" SMALLINT DEFAULT 0,
    "roleable" BOOLEAN DEFAULT false,
    "disable" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "mdb_entity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mdb_attributes" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(255),
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255),
    "multiple" BOOLEAN DEFAULT false,
    "type" VARCHAR(100),
    "required" BOOLEAN DEFAULT false,
    "readonly" BOOLEAN DEFAULT false,
    "order" SMALLINT DEFAULT 0,
    "disable" BOOLEAN DEFAULT false,
    "hash" VARCHAR(255),
    "default" TEXT,
    "role" SMALLINT,
    "security" BOOLEAN DEFAULT false,
    "field" TEXT,
    "entityId" VARCHAR(36),
    "relationId" VARCHAR(36),
    "relationName" VARCHAR(255),
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "mdb_attributes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mdb_records" (
    "id" TEXT NOT NULL,
    "entityId" VARCHAR(36),
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "mdb_records_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mdb_value" (
    "parentId" VARCHAR(36) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "attributeId" VARCHAR(36),
    "type" SMALLINT NOT NULL DEFAULT 40,
    "childrenProperty" TEXT,
    "order" INTEGER,
    "bit" SMALLINT,
    "tinyint" SMALLINT,
    "smallint" SMALLINT,
    "int" INTEGER,
    "bigint" BIGINT,
    "float" DOUBLE PRECISION,
    "date" DATE,
    "time" TIME(0),
    "datetime" TIMESTAMPTZ(0),
    "varchar" VARCHAR(255),
    "text" TEXT,
    "json" JSONB,
    "blob" BYTEA,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "mdb_value_pkey" PRIMARY KEY ("parentId","name")
);

-- CreateTable
CREATE TABLE "mdb_record_relation" (
    "valueParentId" VARCHAR(36) NOT NULL,
    "valueName" VARCHAR(255) NOT NULL,
    "recordId" VARCHAR(36) NOT NULL,

    CONSTRAINT "mdb_record_relation_pkey" PRIMARY KEY ("valueParentId","valueName","recordId")
);

-- CreateIndex
CREATE INDEX "mdb_entity_title_idx" ON "mdb_entity"("title");

-- CreateIndex
CREATE INDEX "mdb_attributes_title_idx" ON "mdb_attributes"("title");

-- CreateIndex
CREATE INDEX "mdb_attributes_name_idx" ON "mdb_attributes"("name");

-- CreateIndex
CREATE INDEX "mdb_records_entityId_idx" ON "mdb_records"("entityId");

-- CreateIndex
CREATE INDEX "mdb_value_attributeId_idx" ON "mdb_value"("attributeId");

-- CreateIndex
CREATE INDEX "mdb_value_name_idx" ON "mdb_value"("name");

-- CreateIndex
CREATE INDEX "mdb_value_varchar_idx" ON "mdb_value"("varchar");

-- AddForeignKey
ALTER TABLE "mdb_attributes" ADD CONSTRAINT "mdb_attributes_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "mdb_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mdb_attributes" ADD CONSTRAINT "mdb_attributes_relationId_fkey" FOREIGN KEY ("relationId") REFERENCES "mdb_entity"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mdb_records" ADD CONSTRAINT "mdb_records_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "mdb_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "mdb_value" ADD CONSTRAINT "mdb_value_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "mdb_records"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "mdb_value" ADD CONSTRAINT "mdb_value_attributeId_fkey" FOREIGN KEY ("attributeId") REFERENCES "mdb_attributes"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "mdb_record_relation" ADD CONSTRAINT "mdb_record_relation_valueParentId_valueName_fkey" FOREIGN KEY ("valueParentId", "valueName") REFERENCES "mdb_value"("parentId", "name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mdb_record_relation" ADD CONSTRAINT "mdb_record_relation_recordId_fkey" FOREIGN KEY ("recordId") REFERENCES "mdb_records"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
