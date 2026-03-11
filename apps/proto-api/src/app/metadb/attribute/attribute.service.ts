import { Injectable } from '@nestjs/common';

//import { PrismaService } from '../prisma/prisma.service';
import { CreateAttributeDto, UpdateAttributeDto } from './dto';
//import { attributeSpecificityFilterExcept } from '@atlas/core/base';
import { attributeSpecificityFilterExcept, EntityType } from '@metadb/core';
import { MetaAttribute } from '@metadb/client';
import { PrismaService } from '@metadb/prisma';
import { PageNumberPagination } from 'prisma-extension-pagination/dist/types';
import { pagination } from 'prisma-extension-pagination';

@Injectable()
export class AttributeSevice {
  private prismaPagination = this.prisma.$extends(pagination());
  private get attribute() {
    return this.prisma.metaAttribute;
  }
  constructor(private prisma: PrismaService) { }

  async getAll(params: {
    limit: number,
    page: number,
  } = {
      limit: 10,
      page: 1,
    }): Promise<{ data: MetaAttribute[], paginate: PageNumberPagination }> {
    return this.prismaPagination.metaAttribute
      .paginate()
      .withPages({
        ...params,
        includePageCount: true
      }).then((result) => {
        const [data, paginate] = result;
        return { data, paginate };
      })
  }

  async getById(id: string): Promise<MetaAttribute> {
    return this.attribute.findUnique({
      where: { id }
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
      data
    });
  }

  async deleteById(id: string): Promise<MetaAttribute> {
    return this.attribute.delete({
      where: { id }
    });
  }

  async getByEntity(entityId: string): Promise<MetaAttribute[]> {
    return this.attribute
      .findMany({
        where: {
          entity: {
            id: entityId
          }
        }
      })
      .then((list) => list.filter(attributeSpecificityFilterExcept));
  }

  // Возвращает аттрибуты по типу
  async getByType(type: EntityType): Promise<MetaAttribute[]> {
    return this.prisma.metaAttribute
      .findMany({
        where: {
          entity: {
            type: type as any
          }
        }
      })
      .then((list) => list.filter(attributeSpecificityFilterExcept));
  }
}
