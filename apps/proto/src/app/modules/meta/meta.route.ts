import { Route } from '@angular/router';

export const metaPages = {
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
        path: metaPages.entities.root,
        loadComponent: () =>
          import('./entity/entity-table.component').then(
            (a) => a.MetadbEntitiesComponent,
          ),
      },
      {
        path: metaPages.attributes.root + '/:id',
        loadComponent: () =>
          import('./entity/attribute-table/attribute-table.component').then(
            (a) => a.EntityAttributesComponent,
          ),
      },
      {
        path: metaPages.attributes.root,
        loadComponent: () =>
          import('./attribute-table/attribute-table.component').then(
            (a) => a.MetadbAttributesComponent,
          ),
      },
      {
        path: metaPages.records.root,
        loadComponent: () =>
          import('./record-table/record-table.component').then(
            (a) => a.MetadbRecordsComponent,
          ),
      },
      {
        path: metaPages.values.root,
        loadComponent: () =>
          import('./value-table/value-table.component').then(
            (a) => a.MetadbValuesComponent,
          ),
      },
      { path: '**', redirectTo: metaPages.entities.root },
    ],
  };
}
