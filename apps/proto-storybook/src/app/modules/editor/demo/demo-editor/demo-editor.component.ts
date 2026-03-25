import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EditorCommands, EditorConfig } from '../../editor-config';
import { AtlasEditorModule } from '../../editor.module';
import { demoText } from '../demo-text';

@Component({
  selector: 'demo-editor',
  templateUrl: 'demo-editor.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, CommonModule, AtlasEditorModule],
})
export class DemoEditorComponent {
  htmlContent = demoText;

  config: EditorConfig = {
    editable: true,
    spellcheck: true,
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes', // 'no'
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    uploadUrl: 'v1/image',
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote'
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1'
      }
    ],
    tools: [
      EditorCommands.bold,
      EditorCommands.italic,
      EditorCommands.underline,

      EditorCommands.justifyLeft,
      EditorCommands.justifyCenter,
      EditorCommands.justifyRight,
      EditorCommands.justifyFull,

      // EditorCommands.heading,
      EditorCommands.fontName,
      EditorCommands.fontSize,

      //EditorCommands.strikeThrough,
      //EditorCommands.subscript,
      //EditorCommands.superscript,
      //EditorCommands.indent,
      //EditorCommands.outdent,
      //EditorCommands.insertUnorderedList,
      //EditorCommands.insertOrderedList,
      //EditorCommands.textColor,
      //EditorCommands.backgroundColor,
      EditorCommands.customClasses,
      //EditorCommands.link,
      //EditorCommands.unlink,
      //EditorCommands.insertImage,
      //EditorCommands.insertVideo,
      //EditorCommands.insertHorizontalRule,
      //EditorCommands.removeFormat,

      EditorCommands.toggleEditorMode,

      EditorCommands.undo,
      EditorCommands.redo
    ]
    //toolbarHiddenButtons: [
    //  ['bold', 'italic'],
    //  ['fontSize']
    //]
  };
}
