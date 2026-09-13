import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AtlasEditorModule } from '../../editor.module';
import { EditorCommands, EditorConfig } from '../../editor-config';
import { demoText } from '../demo-text';

@Component({
  selector: 'demo-inline',
  templateUrl: 'inline.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, CommonModule, AtlasEditorModule],
})
export class DemoInlineComponent {
  htmlContent = demoText;

  config: EditorConfig = {
    toolbarInline: true,
    dblClickEnabled: false,

    tools: [
      EditorCommands.bold,
      EditorCommands.italic,
      EditorCommands.underline,

      EditorCommands.justifyLeft,
      EditorCommands.justifyCenter,
      EditorCommands.justifyRight,
      EditorCommands.justifyFull,

      //EditorCommands.strikeThrough,
      //EditorCommands.subscript,
      //EditorCommands.superscript,

      EditorCommands.indent,
      EditorCommands.outdent,
      EditorCommands.insertUnorderedList,
      EditorCommands.insertOrderedList,
      // EditorCommands.heading,
      EditorCommands.fontName,
      EditorCommands.fontSize,
      //EditorCommands.textColor,
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
