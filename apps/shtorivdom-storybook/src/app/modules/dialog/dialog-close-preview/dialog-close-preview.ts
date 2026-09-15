/* eslint-disable @angular-eslint/component-selector */
 
import { Component, viewChild } from '@angular/core';
import { BrnDialog } from '@spartan-ng/brain/dialog';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmDialogImports } from '@spartan-ng/helm/dialog';
import { HlmLabelImports } from '@spartan-ng/helm/label';

@Component({
  selector: 'spartan-dialog-close-preview',
  imports: [HlmDialogImports, HlmLabelImports, HlmButtonImports],
  templateUrl: 'dialog-close-preview.html',
})
export class DialogClosePreview {
  public readonly viewchildDialogRef = viewChild(BrnDialog);

  closeDialog() {
    this.viewchildDialogRef()?.close({});
  }
}
