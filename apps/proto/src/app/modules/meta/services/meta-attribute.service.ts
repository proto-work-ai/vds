/* eslint-disable @nx/enforce-module-boundaries */
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MetaAttribute } from '@metadb/client';
import { map, Observable } from 'rxjs';
import { ITablePaginate } from '../../atlas/taiga-ui-table/taiga-ui-table';

export interface IMetaAttributeData<T = MetaAttribute> { data: T[], paginate: ITablePaginate }

@Injectable({ providedIn: 'root' })
export class MetaAttributeService {
  #http = inject(HttpClient);

  getAll(params: { currentPage: number; length: number; }): Observable<IMetaAttributeData> {
    return this.#http.get<IMetaAttributeData>('/api/attribute', { params });
  }

  create(data: Partial<MetaAttribute>): Observable<MetaAttribute> {
    return this.#http.post<MetaAttribute>('/api/attribute', data);
  }

  update(data: Partial<MetaAttribute>): Observable<MetaAttribute> {
    return this.#http.patch<MetaAttribute>(`/api/attribute/${data.id}`, data);
  }

  delete(id: string): Observable<MetaAttribute> {
    return this.#http.delete<MetaAttribute>(`/api/attribute/${id}`);
  }

  getByEntity(entityId: string): Observable<IMetaAttributeData> {
    return this.#http.get<IMetaAttributeData>(`/api/attribute/entity/${entityId}`).pipe(
      map((data: any) => {
        return {
          data,
          paginate: { currentPage: 1, totalCount: data.length, pageCount: data.length }
        } as IMetaAttributeData
      })
    );
  }
}
