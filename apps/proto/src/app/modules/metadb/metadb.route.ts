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
          import('./entity-table/entity-table.component').then(
            (a) => a.MetadbEntitiesComponent,
          ),
      },
      {
        path: metadbPages.attributes.root,
        loadComponent: () =>
          import('./attribute-table/attribute-table.component').then(
            (a) => a.MetadbAttributesComponent,
          ),
      },
      {
        path: metadbPages.records.root,
        loadComponent: () =>
          import('./record-table/record-table.component').then(
            (a) => a.MetadbRecordsComponent,
          ),
      },
      {
        path: metadbPages.values.root,
        loadComponent: () =>
          import('./value-table/value-table.component').then(
            (a) => a.MetadbValuesComponent,
          ),
      },
      { path: '**', redirectTo: metadbPages.entities.root },
    ],
  };
}
