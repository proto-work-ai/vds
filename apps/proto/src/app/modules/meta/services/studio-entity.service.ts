/* eslint-disable @nx/enforce-module-boundaries */
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MetaEntity } from '@metadb/client';
import { Observable } from 'rxjs';
import { PaginationOptions } from '@atlas/core';
import { IPaginationResult } from '@atlas/core';

@Injectable({ providedIn: 'root' })
export class MetaEntityService {
  #http = inject(HttpClient);

  getById(id: string): Observable<MetaEntity> {
    return this.#http.get<MetaEntity>(`/api/entity/${id}`);
  }

  getAll(params: PaginationOptions): Observable<IPaginationResult<MetaEntity>> {
    return this.#http.get<IPaginationResult<MetaEntity>>('/api/entity', { params });
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
}
