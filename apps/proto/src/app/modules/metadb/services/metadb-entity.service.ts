/* eslint-disable @nx/enforce-module-boundaries */
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MetaEntity } from '@metadb/client';

@Injectable({ providedIn: 'root' })
export class MetaDbEntityService {
  #http = inject(HttpClient);

  getAll() {
    return this.#http.get('/api/entity');
  }

  create(data: MetaEntity) {
    return this.#http.post('/api/entity', data);
  }

  update(data: MetaEntity) {
    return this.#http.patch('/api/entity', data);
  }

  delete(id: string) {
    return this.#http.delete('/api/entity');
  }
}
