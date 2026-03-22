/* eslint-disable @nx/enforce-module-boundaries */
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MetaValue } from '@metadb/client';
import { Observable } from 'rxjs';
import { PagePagination, PaginationOptions } from '@atlas/core';

export interface IMetaValueData<T = MetaValue> { data: T[], paginate: PagePagination }

@Injectable({ providedIn: 'root' })
export class MetaValueService {
  #http = inject(HttpClient);

  getAll(params: PaginationOptions): Observable<IMetaValueData> {
    return this.#http.get<IMetaValueData>('/api/value', { params });
  }

  create(data: Partial<MetaValue>): Observable<MetaValue> {
    return this.#http.post<MetaValue>('/api/value', data);
  }

  update(data: Partial<MetaValue>): Observable<MetaValue> {
    return this.#http.put<MetaValue>(`/api/value/${data.name}/${data.parentId}`, data);
  }

  delete({ name, parentId }: Pick<MetaValue, 'name' | 'parentId'>): Observable<MetaValue> {
    return this.#http.delete<MetaValue>(`/api/value/${name}/${parentId}`);
  }
}
