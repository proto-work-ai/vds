import { Route } from '@angular/router';

export const metadbPages = {
  entities: {
    root: 'entities',
  },
  attributes: {
    root: 'attributes',
  },
  records: {
    root: 'records',
  },
  values: {
    root: 'values',
  },
} as const;

export function metadbRoute(path: string): Route {
  return {
    path,
    loadComponent: () =>
      import('./metadb-editor/metadb-editor.component').then(
        (a) => a.StudioPageComponent,
      ),
    children: [
      {
        path: metadbPages.entities.root,
        loadComponent: () =>
          import('./metadb-entitie-table/metadb-entitie-table.component').then(
            (a) => a.MetadbEntitiesComponent,
          ),
      },
      {
        path: metadbPages.attributes.root,
        loadComponent: () =>
          import('./metadb-attribute-table/metadb-attribute-table.component').then(
            (a) => a.MetadbAttributesComponent,
          ),
      },
      {
        path: metadbPages.records.root,
        loadComponent: () =>
          import('./metadb-record-table/metadb-record-table.component').then(
            (a) => a.MetadbRecordsComponent,
          ),
      },
      {
        path: metadbPages.values.root,
        loadComponent: () =>
          import('./metadb-value-table/metadb-value-table.component').then(
            (a) => a.MetadbValuesComponent,
          ),
      },
      { path: '**', redirectTo: metadbPages.entities.root },
    ],
  };
}
