import { Component, ChangeDetectionStrategy } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EditorCommands, EditorConfig } from '../../editor-config';
import { AtlasEditorModule } from '../../editor.module';
import { demoText } from '../demo-text';

@Component({
  selector: 'demo-dbl-click',
  templateUrl: 'dbl-click.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule, 
    CommonModule, 
    AtlasEditorModule,
  ],
})
export class DemoDblClickComponent {
  htmlContent = demoText;

  config: EditorConfig = {
    toolbarInline: true,
    // dblClickEnabled: true,
    tools: [
      EditorCommands.textColor,
      // EditorCommands.bold,
      // EditorCommands.italic,
      // EditorCommands.underline,
      // EditorCommands.justifyLeft,
      // EditorCommands.justifyCenter,
      // EditorCommands.justifyRight,
      // EditorCommands.justifyFull,

      //EditorCommands.strikeThrough,
      //EditorCommands.subscript,
      //EditorCommands.superscript,
      //EditorCommands.indent,
      //EditorCommands.outdent,
      //EditorCommands.insertUnorderedList,
      //EditorCommands.insertOrderedList,
      // EditorCommands.heading,
      //EditorCommands.fontName,
      //EditorCommands.fontSize,
      //EditorCommands.backgroundColor,
      //EditorCommands.customClasses,
      //EditorCommands.link,
      //EditorCommands.unlink,
      //EditorCommands.insertImage,
      //EditorCommands.insertVideo,
      //EditorCommands.insertHorizontalRule,
      //EditorCommands.removeFormat,

      EditorCommands.toggleEditorMode,

      EditorCommands.undo,
      EditorCommands.redo,
    ],
  };
}
