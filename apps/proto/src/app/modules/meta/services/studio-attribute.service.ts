/* eslint-disable @nx/enforce-module-boundaries */
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MetaAttribute } from '@prisma/client';
import { map, Observable } from 'rxjs';
import { PaginationOptions } from '@atlas/core';
import { IPaginationResult } from '@atlas/core';

@Injectable({ providedIn: 'root' })
export class MetaAttributeService {
  #http = inject(HttpClient);

  getAll(params: PaginationOptions): Observable<IPaginationResult<MetaAttribute>> {
    return this.#http.get<IPaginationResult<MetaAttribute>>('/api/attribute', { params });
  }

  create(data: Partial<MetaAttribute>): Observable<MetaAttribute> {
    return this.#http.post<MetaAttribute>('/api/attribute', data);
  }

  update(data: Partial<MetaAttribute>): Observable<MetaAttribute> {
    return this.#http.put<MetaAttribute>(`/api/attribute/${data.id}`, data);
  }

  delete(id: string): Observable<MetaAttribute> {
    return this.#http.delete<MetaAttribute>(`/api/attribute/${id}`);
  }

  getByEntity<Type = MetaAttribute>(entityId: string, params: PaginationOptions = { page: 1, limit: 20 }): Observable<IPaginationResult<Type>> {
    return this.#http.get<IPaginationResult<Type>>(`/api/attribute/entity/${entityId}`, { params }).pipe(
      map((data: any) => {
        return {
          data,
          paginate: { currentPage: 1, totalCount: data.length, pageCount: 1 }
        } as IPaginationResult<Type>
      })
    );
  }
}
