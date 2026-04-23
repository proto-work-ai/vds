export { SortByPipe, sortBy } from './lib/pipes/sort-by.pipe';

import { PortalModule } from '@angular/cdk/portal';
import { SortByPipe } from './lib/pipes/sort-by.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export const AtlasFormImports = [
    FormsModule,
    ReactiveFormsModule,
    PortalModule,
    SortByPipe
] as const;
