import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { TextFieldModule } from '@angular/cdk/text-field';
import { AtlasEditorComponent } from './editor.component';
import { AtlasEditorToolbarComponent } from './editor-toolbar';

/*
 * https://quilljs.com/
 * https://angular-email-editor-demo.netlify.app/
 * https://unlayer.com/embed
 * https://unlayer.com/embed/demo#
 * https://examples.unlayer.com/email/simple-email
 * https://github.com/kevoj/angular-editor-fabric-js
 * https://github.com/sibiraj-s/ngx-editor
 */
@NgModule({
  imports: [
    TextFieldModule,
    OverlayModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AtlasEditorToolbarComponent,
  ],
  declarations: [AtlasEditorComponent],
  exports: [AtlasEditorComponent],
})
export class AtlasEditorModule {}
