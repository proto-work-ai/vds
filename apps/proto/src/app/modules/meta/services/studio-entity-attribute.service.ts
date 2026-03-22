/* eslint-disable @nx/enforce-module-boundaries */
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MetaAttribute, MetaEntity } from '@metadb/client';
import { map, Observable } from 'rxjs';
import { PaginationOptions } from '@atlas/core';
import { IPaginationResult } from '@atlas/core';

@Injectable({ providedIn: 'root' })
export class MetaEntityAttributeService {
  #http = inject(HttpClient);

  getById(id: string): Observable<MetaEntity> {
    return this.#http.get<MetaEntity>(`/api/entity/${id}`);
  }

  getAll(params: PaginationOptions): Observable<IPaginationResult> {
    return this.#http.get<IPaginationResult>('/api/entity', { params });
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

  getByEntity(entityId: string, params: PaginationOptions = { page: 1, limit: 20 }): Observable<IPaginationResult<MetaAttribute>> {
    return this.#http.get<IPaginationResult<MetaAttribute>>(`/api/attribute/entity/${entityId}`, { params }).pipe(
      map((data: any) => {
        return {
          data,
          paginate: { currentPage: 1, totalCount: data.length, pageCount: 1 }
        } as IPaginationResult<MetaAttribute>
      })
    );
  }
}
