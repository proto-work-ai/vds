import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { HttpEvent, HttpResponse } from '@angular/common/http';
import { CommonModule, DOCUMENT } from '@angular/common';
import { filter, map, Observable, startWith, Subject } from 'rxjs';

import { CustomClass, EditorCommands, UploadResponse } from './editor-config';
import { EditorService } from './editor.service';
import { EditorSelectComponent, SelectOption } from './toolbar-select/toolbar-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextFieldModule } from '@angular/cdk/text-field';
import { OverlayModule } from '@angular/cdk/overlay';

@Component({
  selector: 'atlas-editor-toolbar',
  templateUrl: 'editor-toolbar.html',
  styleUrls: ['./editor-toolbar.scss'],
  imports: [TextFieldModule, OverlayModule, CommonModule, FormsModule, ReactiveFormsModule, EditorSelectComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtlasEditorToolbarComponent {
  @ViewChild('fileInput', { static: true }) myInputFile: ElementRef | undefined;
  @Input() public fonts: SelectOption[] = [{ label: '', value: '' }];
  @Input() public hiddenButtons: string[][] | undefined;
  @Input() public id: string | undefined;
  @Input() public showToolbar: boolean | undefined;
  @Input() public tools = [
    EditorCommands.bold,
    EditorCommands.italic,
    EditorCommands.underline,

    EditorCommands.justifyLeft,
    EditorCommands.justifyCenter,
    EditorCommands.justifyRight,
    EditorCommands.justifyFull,

    EditorCommands.undo,
    EditorCommands.redo,

    EditorCommands.strikeThrough,
    EditorCommands.subscript,
    EditorCommands.superscript,
    EditorCommands.indent,
    EditorCommands.outdent,
    EditorCommands.insertUnorderedList,
    EditorCommands.insertOrderedList,
    // EditorCommands.heading,
    EditorCommands.fontName,
    EditorCommands.fontSize,
    EditorCommands.textColor,
    EditorCommands.backgroundColor,
    EditorCommands.customClasses,
    EditorCommands.link,
    EditorCommands.unlink,
    EditorCommands.insertImage,
    EditorCommands.insertVideo,
    EditorCommands.insertHorizontalRule,
    EditorCommands.removeFormat,

    EditorCommands.toggleEditorMode,
  ];
  @Input() public upload: ((file: File) => Observable<HttpEvent<UploadResponse>>) | undefined;

  @Input() public uploadUrl: string | undefined;
  @Output() execute: EventEmitter<string> = new EventEmitter();
  htmlMode = false;

  linkSelected = false;

  block = 'default';

  fontName = 'Times New Roman';
  fontSize = '3';
  foreColour: any;
  backColor: any;

  headings: SelectOption[] = [
    {
      label: 'Heading 1',
      value: 'h1',
    },
    {
      label: 'Heading 2',
      value: 'h2',
    },
    {
      label: 'Heading 3',
      value: 'h3',
    },
    {
      label: 'Heading 4',
      value: 'h4',
    },
    {
      label: 'Heading 5',
      value: 'h5',
    },
    {
      label: 'Heading 6',
      value: 'h6',
    },
    {
      label: 'Heading 7',
      value: 'h7',
    },
    {
      label: 'Paragraph',
      value: 'p',
    },
    {
      label: 'Predefined',
      value: 'pre',
    },
    {
      label: 'Standard',
      value: 'div',
    },
    {
      label: 'default',
      value: 'default',
    },
  ];
  fontSizes: SelectOption[] = [
    {
      label: '1',
      value: '1',
    },
    {
      label: '2',
      value: '2',
    },
    {
      label: '3',
      value: '3',
    },
    {
      label: '4',
      value: '4',
    },
    {
      label: '5',
      value: '5',
    },
    {
      label: '6',
      value: '6',
    },
    {
      label: '7',
      value: '7',
    },
  ];
  customClassId = '-1';
  customClassList: SelectOption[] = [{ label: '', value: '' }];
  // uploadUrl: string;
  tagMap = { BLOCKQUOTE: 'indent', A: 'link' };
  select = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P', 'PRE', 'DIV'];
  buttons = [
    'bold',
    'italic',
    'underline',
    'strikeThrough',
    'subscript',
    'superscript',
    'justifyLeft',
    'justifyCenter',
    'justifyRight',
    'justifyFull',
    'indent',
    'outdent',
    'insertUnorderedList',
    'insertOrderedList',
    'link',
  ];
  triggerButton$ = new Subject<void>();
  private triggerButtonMap = new Map<string, Observable<boolean>>();
  _commands = EditorCommands;

  _customClasses: CustomClass[] | undefined;
  @Input() public set customClasses(classes: CustomClass[]) {
    if (classes) {
      this._customClasses = classes;
      this.customClassList = this._customClasses.map((x, i) => ({
        label: x.name,
        value: i.toString(),
      }));

      this.customClassList.unshift({ label: 'Clear Class', value: '-1' });
    }
  }

  @Input() public set defaultFontName(value: string) {
    if (value) {
      this.fontName = value;
    }
  }

  @Input() public set defaultFontSize(value: string) {
    if (value) {
      this.fontSize = value;
    }
  }

  public get isLinkButtonDisabled(): boolean {
    return this.htmlMode || !Boolean(this.editorService.selectedText);
  }

  constructor(
    private cdr: ChangeDetectorRef,
    private render: Renderer2,
    private editorService: EditorService,
    @Inject(DOCUMENT) private doc: Document
  ) {}

  /**
   * Trigger command from editor header buttons
   *
   * @param command string from toolbar buttons
   */
  triggerCommand(command: EditorCommands | string) {
    this.execute.emit(command);
  }

  /**
   * highlight editor buttons when cursor moved or positioning
   */
  hasButtonActive(name: string): Observable<boolean> | undefined {
    if (this.triggerButtonMap.has(name)) {
      return this.triggerButtonMap.get(name);
    }

    this.triggerButtonMap.set(
      name,
      this.triggerButton$.pipe(
        filter(() => {
          return !!this.showToolbar;
        }),
        map(() => !!this.doc.queryCommandState(name))
      )
    );

    return this.triggerButtonMap.get(name)?.pipe(startWith(false));
  }

  /**
   * trigger highlight editor buttons when cursor moved or positioning in block
   */
  triggerBlocks(nodes: Node[]) {
    if (!this.showToolbar) {
      return;
    }
    this.linkSelected = nodes.findIndex((x) => x.nodeName === 'A') > -1;
    let found = false;
    this.select.forEach((y) => {
      const node = nodes.find((x) => x.nodeName === y);
      if (node !== undefined && y === node.nodeName) {
        if (found === false) {
          this.block = node.nodeName.toLowerCase();
          found = true;
        }
      } else if (found === false) {
        this.block = 'default';
      }
    });

    found = false;
    if (this._customClasses) {
      this._customClasses.forEach((y, index) => {
        const node = nodes.find((x: any) => {
          if (x instanceof Element) {
            return x.className === y.class;
          }
          return false;
        });
        if (node !== undefined) {
          if (found === false) {
            this.customClassId = index.toString();
            found = true;
          }
        } else if (found === false) {
          this.customClassId = '-1';
        }
      });
    }

    Object.entries(this.tagMap).map(([tag, value]) => {
      const elementById = this.doc.getElementById(value + '-' + this.id);

      if (elementById) {
        const node = nodes.find((x) => x.nodeName === tag);
        if (node !== undefined && tag === node.nodeName) {
          this.render.addClass(elementById, 'active');
        } else {
          this.render.removeClass(elementById, 'active');
        }
      }
    });

    this.foreColour = this.doc.queryCommandValue('ForeColor');
    this.fontSize = this.doc.queryCommandValue('FontSize');
    this.fontName = this.doc.queryCommandValue('FontName').replace(/"/g, '');
    this.backColor = this.doc.queryCommandValue('backColor');
    this.cdr.markForCheck();
  }

  /**
   * insert URL link
   */
  insertUrl() {
    let url = 'https://';
    const selection = this.editorService.savedSelection;
    if (selection && selection.commonAncestorContainer.parentElement?.nodeName === 'A') {
      const parent = selection.commonAncestorContainer.parentElement as HTMLAnchorElement;
      if (parent.href !== '') {
        url = parent.href;
      }
    }

    url = prompt('Insert URL link', url) as string;
    if (url && url !== '' && url !== 'https://') {
      this.editorService.createLink(url);
    }
  }

  /**
   * insert Video link
   */
  insertVideo() {
    this.execute.emit('');
    const url = prompt('Insert Video link', `https://`);
    if (url && url !== '' && url !== `https://`) {
      this.editorService.insertVideo(url);
    }
  }

  /** insert color */
  insertColor(color: string, where: string) {
    this.editorService.insertColor(color, where);
    this.execute.emit('');
  }

  /**
   * set font Name/family
   *
   * @param fontName string
   */
  setFontName(fontName: string): void {
    this.editorService.setFontName(fontName);
    this.execute.emit('');
  }

  /**
   * set font Size
   *
   * @param fontSize string
   */
  setFontSize(fontSize: string): void {
    this.editorService.setFontSize(fontSize);
    this.execute.emit('');
  }

  /**
   * toggle editor mode (WYSIWYG or SOURCE)
   *
   * @param mode boolean
   */
  setEditorMode(mode: boolean) {
    this.htmlMode = mode;
    this.cdr.markForCheck();
  }

  /**
   * Upload image when file is selected.
   */
  public onFileChanged(event: any) {
    const file = event.target.files[0];
    if (file.type.includes('image/')) {
      if (this.upload) {
        this.upload(file).subscribe((response: any) => this.watchUploadImage(response, event));
      } else if (this.uploadUrl) {
        this.editorService.uploadImage(file).subscribe((response: any) => this.watchUploadImage(response, event));
      } else {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent) => {
          const fr = e.currentTarget as FileReader;
          this.editorService.insertImage(fr.result!.toString());
        };
        reader.readAsDataURL(file);
      }
    }
  }

  watchUploadImage(response: HttpResponse<{ imageUrl: string }>, event: any) {
    const { imageUrl } = response.body!;
    this.editorService.insertImage(imageUrl);
    event.srcElement.value = null;
    this.cdr.markForCheck();
  }

  /**
   * Set custom class
   */
  setCustomClass(classId: string) {
    if (classId === '-1') {
      this.execute.emit('clear');
    } else {
      this.editorService.createCustomClass(this._customClasses![+classId]);
    }
  }

  focus() {
    this.execute.emit('focus');
  }
}
