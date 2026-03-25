import {
  Component,
  ChangeDetectionStrategy,
  signal,
  inject,
  Injectable,
  DOCUMENT,
  SecurityContext,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild,
  Input,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { demoText } from '../editor/demo/demo-text';
import { AtlasEditorToolbarComponent } from '../editor/editor-toolbar';
import { AnnotationInputComponent } from './annotation-input/annotation-input.component';
import { EditorCommands, EditorConfig } from '../editor/editor-config';
import { AtlasEditorModule } from '../editor';
import { EditorService } from '../editor/editor.service';
import { AnnotationViewComponent } from './annotation-view/annotation-view.component';
import { AnnotationPanelComponent } from './annotation-panel/annotation-panel.component';

let elementNum = 0;

@Component({
  selector: 'atlas-text-annotation',
  styleUrl: 'text-annotation.component.scss',
  templateUrl: 'text-annotation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    AnnotationPanelComponent,
    AtlasEditorToolbarComponent,
  ],
  providers: [EditorService],
})
export class TextAnnotationComponent {
  private editorService = inject(EditorService);
  private document = inject(DOCUMENT);

  @ViewChild('editorToolbar') toolbarRef: AtlasEditorToolbarComponent | undefined;
  @ViewChild('editorRef') editorRef: ElementRef<HTMLTextAreaElement> | undefined;
  @Output('editorSelectedText') @Input('editorSelectedText') selectedEvent = new EventEmitter<boolean>();

  @Input() public tabIndex: number | null = null;
  @Input() public id = `editor-${elementNum++}`;

  @Output('focus') focusEvent: EventEmitter<FocusEvent> = new EventEmitter();
  @Output('blur') blurEvent: EventEmitter<FocusEvent> = new EventEmitter();

  protected readonly text = signal(demoText);

  private onChange: ((value: string) => void) | undefined;
  private onTouched: (() => void) | undefined;
  protected enabled = true;
  showPlaceholder = false;
  focused = false;
  changed = false;
  modeVisual = true;
  touched = false;

  public get textArea() {
    return this.editorRef?.nativeElement;
  }

  protected config: EditorConfig = {
    sanitize: true,
    toolbarInline: true,
    dblClickEnabled: true,
    editable: true,
    spellcheck: true,
    translate: 'yes', //'yes' | 'now' | string;
    minHeight: 100,
    maxHeight: 100,
    customClasses: [
      {
        name: 'Annotation Text',
        class: 'annotation-text',
      },
      {
        name: 'redText',
        class: 'redText',
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    tools: [
      EditorCommands.textColor,
      EditorCommands.backgroundColor,
      EditorCommands.customClasses,
      EditorCommands.undo,
      EditorCommands.redo,
    ],
  } as const;

  private configure() {}

  public onTextAreaFocus(event?: FocusEvent): void {
    if (!this.enabled) {
      return;
    }

    if (this.focused) {
      event?.stopPropagation();
      return;
    }

    this.focused = true;

    this.focusEvent.emit(event);
    if (!this.touched || !this.changed) {
      this.editorService.executeInNextQueueIteration(() => {
        this.configure();
        this.touched = true;
      });
    }
  }

  focus() {
    if (this.modeVisual) {
      this.textArea!.focus();
    } else {
      const sourceText = this.document.getElementById('sourceText' + this.id);
      sourceText!.focus();
      this.focused = true;
    }
  }

  public onTextAreaBlur(event: FocusEvent) {
    /**
     * save selection if focussed out
     */
    this.editorService.executeInNextQueueIteration(this.editorService.saveSelection);

    if (typeof this.onTouched === 'function') {
      this.onTouched();
    }

    if (event.relatedTarget === null) {
      this.focused = false;
      this.blurEvent.emit(event);
    } else {
      const parent = (event.relatedTarget as HTMLElement).parentElement;

      if (parent!.classList.contains('cdk-overlay-pane')) {
        this.focus();
      } else if (!parent!.classList.contains('atlas-editor-toolbar-set')) {
        this.focused = false;
        this.blurEvent.emit(event);
      }
    }
  }

  exec() {
    this.toolbarRef?.triggerButton$?.next();

    let userSelection: Selection;
    if (this.document.getSelection) {
      userSelection = this.document.getSelection()!;
      this.editorService.executeInNextQueueIteration(this.editorService.saveSelection);
    }

    let a = userSelection!.focusNode as HTMLElement;
    const els = [];
    while (a && a.id !== 'editor') {
      els.unshift(a);
      a = a.parentNode as HTMLElement;
    }

    this.toolbarRef?.triggerBlocks(els);
  }

  updateSelected(): void {
    if (this.enabled) {
      setTimeout(() => {
        const text = this.getSelectedText();
        this.selectedEvent.emit(!!text);
      });
    }
  }

  protected getSelectedText() {
    if (window.getSelection) {
      return window.getSelection()!.toString();
    } else if ((this.document as any).selection) {
      return (this.document as any).selection.createRange().text;
    }

    return '';
  }

  public onTextAreaMouseOut(event: MouseEvent): void {
    this.editorService.saveSelection();
  }

  insertColor(color: string, where: string) {
    this.editorService.insertColor(color, where);
    // this.execute.emit('');
  }

  executeCommand(command: string) {
    this.focus();
    if (command === 'focus') {
      return;
    }

    this.editorService.executeCommand(command);
    this.exec();
  }
}
