export { SortByPipe, sortBy } from './lib/pipes/sort-by.pipe';
export * from './lib/cookie-accepted/cookie-accepted.service';

import { PortalModule } from '@angular/cdk/portal';
import { SortByPipe } from './lib/pipes/sort-by.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export const AtlasFormImports = [FormsModule, ReactiveFormsModule, PortalModule, SortByPipe] as const;
