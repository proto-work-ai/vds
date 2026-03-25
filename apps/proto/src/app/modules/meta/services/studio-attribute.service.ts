/* eslint-disable @nx/enforce-module-boundaries */
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MetaAttribute } from '@prisma/client';
import { Observable } from 'rxjs';
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
}
