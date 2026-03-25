/* eslint-disable @nx/enforce-module-boundaries */
import { Injectable } from '@nestjs/common';
import { MetaAttribute } from '@prisma/client';
import { PrismaService } from '@metadb/prisma';
import { PageNumberPagination } from 'prisma-extension-pagination/dist/types';
import { pagination } from 'prisma-extension-pagination';
import { EntityType } from '@metadb/core';
import { CreateAttributeDto, UpdateAttributeDto } from './dto';

@Injectable()
export class AttributeSevice {
  private prismaPagination = this.prisma.$extends(pagination());
  private get attribute() {
    return this.prisma.metaAttribute;
  }
  constructor(private prisma: PrismaService) {}

  async getAll({
    limit,
    page,
  }: {
    limit: number;
    page: number;
  }): Promise<{ data: MetaAttribute[]; paginate: PageNumberPagination }> {
    return this.prismaPagination.metaAttribute
      .paginate()
      .withPages({
        limit,
        page,
        includePageCount: true,
      })
      .then((result) => {
        const [data, paginate] = result;
        return { data, paginate };
      });
  }

  async getById(id: string): Promise<MetaAttribute> {
    return this.attribute.findUnique({
      where: { id },
    });
  }

  async create(data: CreateAttributeDto): Promise<string> {
    delete data.id;
    const item = await this.prisma.metaAttribute.create({ data });
    return JSON.stringify(item.id);
  }

  async update(id: string, data: UpdateAttributeDto): Promise<MetaAttribute> {
    return this.attribute.update({
      where: { id },
      data,
    });
  }

  async deleteById(id: string): Promise<MetaAttribute> {
    return this.attribute.delete({
      where: { id },
    });
  }

  async getByEntity(entityId: string): Promise<MetaAttribute[]> {
    return this.attribute.findMany({
      where: {
        entity: {
          id: entityId,
        },
      },
    });
    // .then((list) => list.filter(attributeSpecificityFilterExcept));
  }

  // Возвращает аттрибуты по типу
  async getByType(type: EntityType): Promise<MetaAttribute[]> {
    return this.prisma.metaAttribute.findMany({
      where: {
        entity: {
          type: type as any,
        },
      },
    });
    // .then((list) => list.filter(attributeSpecificityFilterExcept));
  }
}
