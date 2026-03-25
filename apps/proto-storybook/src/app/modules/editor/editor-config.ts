import { HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CustomClass {
  name: string;
  class: string;
  tag?: string;
}

export interface Font {
  name: string;
  class: string;
}

export interface EditorConfig {
  editable?: boolean;
  spellcheck?: boolean;
  height?: 'auto' | string;
  minHeight?: '0' | string | number;
  maxHeight?: 'auto' | string | number;
  width?: 'auto' | string;
  minWidth?: '0' | string;
  translate?: 'yes' | 'now' | string;
  enableToolbar?: boolean;
  showToolbar?: boolean;
  placeholder?: string;
  defaultParagraphSeparator?: string;
  defaultFontName?: string;
  defaultFontSize?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | string;
  uploadUrl?: string;
  upload?: (file: File) => Observable<HttpEvent<UploadResponse>>;
  uploadWithCredentials?: boolean;
  fonts?: Font[];
  customClasses?: CustomClass[];
  sanitize?: boolean;
  toolbarPosition?: 'top' | 'bottom';
  outline?: boolean;
  toolbarHiddenButtons?: string[][];
  rawPaste?: boolean;
  toolbarInline?: boolean;
  dblClickEnabled?: boolean;
  tools?: EditorCommands[];
}

export const angularEditorConfig: EditorConfig = {
  editable: true,
  spellcheck: true,
  height: 'auto',
  minHeight: '0',
  maxHeight: 'auto',
  width: 'auto',
  minWidth: '0',
  translate: 'yes',
  enableToolbar: true,
  showToolbar: true,
  placeholder: 'Enter text here...',
  defaultParagraphSeparator: '',
  defaultFontName: '',
  defaultFontSize: '',
  uploadUrl: 'v1/image',
  uploadWithCredentials: false,
  toolbarPosition: 'top',
  outline: true,
  sanitize: false,
  fonts: [
    { class: 'arial', name: 'Arial' },
    { class: 'times-new-roman', name: 'Times New Roman' },
    { class: 'calibri', name: 'Calibri' },
    { class: 'comic-sans-ms', name: 'Comic Sans MS' }
  ]
  /*toolbarHiddenButtons: [
    ['bold', 'italic', 'underline', 'strikeThrough', 'superscript', 'subscript'],
    ['heading', 'fontName', 'fontSize', 'color'],
    ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', 'indent', 'outdent'],
    ['cut', 'copy', 'delete', 'removeFormat', 'undo', 'redo'],
    ['paragraph', 'blockquote', 'removeBlockquote', 'horizontalLine', 'orderedList', 'unorderedList'],
    ['link', 'unlink', 'image', 'video']
  ]*/
};

export interface UploadResponse {
  imageUrl: string;
}

export enum EditorCommands {
  undo = 'undo',
  redo = 'redo',
  bold = 'bold',
  italic = 'italic',
  underline = 'underline',
  strikeThrough = 'strikeThrough',
  subscript = 'subscript',
  superscript = 'superscript',
  justifyLeft = 'justifyLeft',
  justifyCenter = 'justifyCenter',
  justifyRight = 'justifyRight',
  justifyFull = 'justifyFull',
  indent = 'indent',
  outdent = 'outdent',
  insertUnorderedList = 'insertUnorderedList',
  insertOrderedList = 'insertOrderedList',
  heading = 'heading',
  fontName = 'fontName',
  fontSize = 'fontSize',
  textColor = 'textColor',
  backgroundColor = 'backgroundColor',
  customClasses = 'customClasses',
  link = 'link',
  unlink = 'unlink',
  insertImage = 'insertImage',
  insertVideo = 'insertVideo',
  insertHorizontalRule = 'insertHorizontalRule',
  removeFormat = 'removeFormat',
  toggleEditorMode = 'toggleEditorMode'
}
