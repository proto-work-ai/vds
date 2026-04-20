import { RenderMode, ServerRoute } from '@angular/ssr';
import { stretchCeilings } from './model/stretch-ceilings.data';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'catalog/:key',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const list = stretchCeilings.map(({ key }) => ({ key }));
      return list;
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
