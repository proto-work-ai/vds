import { Injectable } from '@angular/core';
import { injectLocalStorageValue } from '../shared/local-storage';
import { generateUuid } from '../shared/uuid';
import { of, Observable, delay } from 'rxjs';

const storeKey = 'ARTICLE_STORE_KEY';

export interface IArticleItem {
  id: string;
  title: string;
  text: string;
}

@Injectable({ providedIn: 'root' })
export class ArticleService {
  private readonly articles = injectLocalStorageValue<IArticleItem[]>(storeKey, []);

  getAll(): Observable<IArticleItem[]> {
    return of(this.articles()).pipe(delay(50));
  }

  getById(id: string): Observable<IArticleItem | undefined> {
    const article = this.articles().find((a) => a.id === id);
    return of(article).pipe(delay(50));
  }

  update(data: IArticleItem): Observable<IArticleItem | undefined> {
    const article = this.articles().find((a) => a.id === data.id);
    if (article) {
      Object.assign(article, data);
      this.articles.update((list) => list.concat());
    }
    return of(article).pipe(delay(50));
  }

  create(article: IArticleItem): Observable<string> {
    const id = generateUuid();
    this.articles.update((list) => [{ ...article, id }, ...list]);
    return of(id).pipe(delay(50));
  }

  remove(id: string): Observable<boolean> {
    this.articles.update((list) => {
      list.splice(
        list.findIndex((a) => a.id === id),
        1
      );
      return list.concat();
    });
    return of(true).pipe(delay(50));
  }
}
