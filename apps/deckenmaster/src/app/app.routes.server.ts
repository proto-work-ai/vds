import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // {
  //   path: 'catalog/:key',
  //   renderMode: RenderMode.Prerender,
  //   async getPrerenderParams() {
  //     const list = stretchCeilingAll.map(({ key }) => ({ key }));
  //     return list;
  //   },
  // },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
