export { AttributeControlPipe } from './lib/pipes/attribute-control.pipe';
export { FieldAttributePortalPipe } from './lib/pipes/field-attribute-portal.pipe';
export { SortByPipe, sortBy } from './lib/pipes/sort-by.pipe';

import { PortalModule } from '@angular/cdk/portal';
import { AttributeControlPipe } from './lib/pipes/attribute-control.pipe';
import { FieldAttributePortalPipe } from './lib/pipes/field-attribute-portal.pipe';
import { SortByPipe } from './lib/pipes/sort-by.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export const AtlasFormImports = [
    FormsModule,
    ReactiveFormsModule,
    PortalModule,
    AttributeControlPipe,
    FieldAttributePortalPipe,
    SortByPipe
] as const;
