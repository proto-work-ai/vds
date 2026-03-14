/* eslint-disable @nx/enforce-module-boundaries */
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MetaEntity } from '@metadb/client';
import { map, Observable } from 'rxjs';
import { ITablePaginate } from '../../../../../../../libs/atlas/table/src/lib/taiga-ui-table/taiga-ui-table';
import { IMetaAttributeData } from './studio-attribute.service';

export interface IMetaEntityData<T = MetaEntity> { data: T[], paginate: ITablePaginate }

@Injectable({ providedIn: 'root' })
export class MetaEntityAttributeService {
  #http = inject(HttpClient);

  getById(id: string): Observable<MetaEntity> {
    return this.#http.get<MetaEntity>(`/api/entity/${id}`);
  }

  getAll(params: { currentPage: number; length: number; }): Observable<IMetaEntityData> {
    return this.#http.get<IMetaEntityData>('/api/entity', { params });
  }

  create(data: Partial<MetaEntity>): Observable<MetaEntity> {
    return this.#http.post<MetaEntity>('/api/entity', data);
  }

  update(data: Partial<MetaEntity>): Observable<MetaEntity> {
    return this.#http.put<MetaEntity>(`/api/entity/${data.id}`, data);
  }

  delete(id: string): Observable<MetaEntity> {
    return this.#http.delete<MetaEntity>(`/api/entity/${id}`);
  }

  getByEntity(entityId: string, params: { currentPage: number; length: number; } = { currentPage: 1, length: 20 }): Observable<IMetaAttributeData> {
    return this.#http.get<IMetaAttributeData>(`/api/attribute/entity/${entityId}`, { params }).pipe(
      map((data: any) => {
        return {
          data,
          paginate: { currentPage: 1, totalCount: data.length, pageCount: 1 }
        } as IMetaAttributeData
      })
    );
  }
}
