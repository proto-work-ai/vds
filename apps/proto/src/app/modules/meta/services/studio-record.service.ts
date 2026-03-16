/* eslint-disable @nx/enforce-module-boundaries */
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MetaRecord } from '@metadb/client';
import { Observable } from 'rxjs';
import { ITablePaginate } from '@atlas/table';

export interface IMetaRecordData<T = MetaRecord> { data: T[], paginate: ITablePaginate }

@Injectable({ providedIn: 'root' })
export class MetaRecordService {
  #http = inject(HttpClient);

  getAll(params: { currentPage: number; length: number; }): Observable<IMetaRecordData> {
    return this.#http.get<IMetaRecordData>('/api/record', { params });
  }

  create(entityId: string, data: Partial<MetaRecord>): Observable<MetaRecord> {
    return this.#http.post<MetaRecord>(`/api/record/${entityId}`, data);
  }

  update(data: Partial<MetaRecord>): Observable<MetaRecord> {
    return this.#http.put<MetaRecord>(`/api/record/${data.id}`, data);
  }

  delete(id: string): Observable<MetaRecord> {
    return this.#http.delete<MetaRecord>(`/api/record/${id}`);
  }

  getByEntity(entityId: string, params: { currentPage: number; length: number; }): Observable<IMetaRecordData> {
    return this.#http.get<IMetaRecordData>(`/api/record/by-entity/${entityId}`, { params });
  }

  getByType(entityId: string, params: { currentPage: number; length: number; }): Observable<IMetaRecordData> {
    return this.#http.get<IMetaRecordData>(`/api/record/by-type/${entityId}`, { params });
  }
}
