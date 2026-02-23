import { Injectable } from '@nestjs/common';

//import { PrismaService } from '../prisma/prisma.service';
import { CreateAttributeDto, UpdateAttributeDto } from './dto';
//import { attributeSpecificityFilterExcept } from '@atlas/core/base';
import { attributeSpecificityFilterExcept, EntityType } from '@metadb/model';
import { MetaAttribute, PrismaService } from '@metadb/prisma';

@Injectable()
export class AttributeSevice {
  private get attribute() {
    return this.prisma.metaAttribute;
  }
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<MetaAttribute[]> {
    return this.attribute.findMany();
  }

  async getById(id: string): Promise<MetaAttribute> {
    return this.attribute.findUnique({
      where: { id }
    });
  }

  async create(entityId: string, data: CreateAttributeDto): Promise<string> {
    const item = await this.prisma.metaAttribute.create({
      data: {
        ...data,
        entityId
      }
    });
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
