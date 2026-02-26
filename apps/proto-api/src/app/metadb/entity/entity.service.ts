/* eslint-disable @nx/enforce-module-boundaries */
import { Injectable } from '@nestjs/common';
import { CreateEntityDto, UpdateEntityDto } from './dto';
import { concatMap, lastValueFrom, merge } from 'rxjs';
import { EntityType } from '@metadb/model';
import { MetaEntity } from '@metadb/client';
import { PrismaService } from '@metadb/prisma';

@Injectable()
export class MetaEntityService {
  private get delegate() {
    return this.prisma.metaEntity;
  }

  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<MetaEntity[]> {
    return this.delegate.findMany();
  }

  async getById(id: string): Promise<MetaEntity> {
    return this.delegate
      .findUnique({
        where: { id },
      })
      .then((entity) => {
        // TODO удвалить(readonly)
        entity = { ...entity };
        entity.readonly = false;
        return entity;
      });
  }

  async getByType(type: EntityType): Promise<MetaEntity> {
    return this.prisma.metaEntity
      .findFirst({
        where: {
          type: type as any,
        },
      })
      .then((entity) => {
        // TODO удвалить(readonly)
        entity = { ...entity };
        entity.readonly = false;
        return entity;
      });
  }

  async create(data: CreateEntityDto): Promise<MetaEntity> {
    return this.delegate.create({
      data: {
        name: data.name,
      },
    });
  }

  async update(id: string, data: UpdateEntityDto): Promise<MetaEntity> {
    return this.delegate.update({
      where: { id },
      data,
    });
  }

  async deleteById(entityId: string, andRecords = true): Promise<MetaEntity> {
    if (andRecords) {
      const records = await this.prisma.metaRecord.findMany({
        where: {
          entityId,
        },
        select: {
          id: true,
        },
      });

      if (records.length) {
        await lastValueFrom(
          merge(records).pipe(
            concatMap((a) => {
              return this.prisma.metaRecord.delete({
                where: { id: a.id },
              });
            }),
          ),
        );
      }
    }

    return this.delegate.delete({
      where: { id: entityId },
    });
  }
}
