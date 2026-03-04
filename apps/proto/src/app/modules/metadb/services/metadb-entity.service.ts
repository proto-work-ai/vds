/* eslint-disable @nx/enforce-module-boundaries */
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MetaEntity } from '@metadb/client';
import { Observable } from 'rxjs';
import { ITablePaginate } from '../../atlas/taiga-ui-table/taiga-ui-table';

export interface IMetaEntityData<T = MetaEntity> { data: T[], paginate: ITablePaginate }

@Injectable({ providedIn: 'root' })
export class MetaDbEntityService {
  #http = inject(HttpClient);

  getAll(params: { currentPage: number; length: number; }): Observable<IMetaEntityData> {
    return this.#http.get<IMetaEntityData>('/api/entity', { params });
  }

  create(data: Partial<MetaEntity>): Observable<MetaEntity> {
    return this.#http.post<MetaEntity>('/api/entity', data);
  }

  update(data: Partial<MetaEntity>): Observable<MetaEntity> {
    return this.#http.patch<MetaEntity>(`/api/entity/${data.id}`, data);
  }

  delete(id: string): Observable<MetaEntity> {
    return this.#http.delete<MetaEntity>(`/api/entity/${id}`);
  }
}
