import { Route } from '@angular/router';

export const studioPages = {
  root: 'studio',
  entities: {
    root: 'entities',
    attributes: 'attributes'
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

export const contentPages = {
  root: 'content',
  entity: {
    root: 'entity',
    attributes: 'attributes'
  },
} as const;

export function metadbRoute(path: string): Route {
  return {
    path,
    loadComponent: () =>
      import('./studio-editor/studio-editor.component').then(
        (a) => a.StudioPageComponent,
      ),
    children: [
      {
        path: `${studioPages.root}/${studioPages.entities.root}`,
        loadComponent: () =>
          import('./studio-entity/studio-entity-table.component').then(
            (a) => a.StudioEntitiesComponent,
          ),
      },
      {
        path: `${studioPages.root}/${studioPages.entities.root}/${studioPages.entities.attributes}/:id`,
        loadComponent: () =>
          import('./studio-entity/attribute-table/attribute-table.component').then(
            (a) => a.EntityAttributesComponent,
          ),
      },
      {
        path: `${studioPages.root}/${studioPages.attributes.root}`,
        loadComponent: () =>
          import('./studio-attribute-table/attribute-table.component').then(
            (a) => a.MetadbAttributesComponent,
          ),
      },
      {
        path: `${studioPages.root}/${studioPages.records.root}`,
        loadComponent: () =>
          import('./studio-record-table/studio-record-table.component').then(
            (a) => a.StudioRecordsComponent,
          ),
      },
      {
        path: `${studioPages.root}/${studioPages.values.root}`,
        loadComponent: () =>
          import('./studio-value-table/studio-value-table.component').then(
            (a) => a.StudioValuesComponent,
          ),
      },
      { path: '**', redirectTo: `${studioPages.root}/${studioPages.entities.root}` },
    ],
  };
}
