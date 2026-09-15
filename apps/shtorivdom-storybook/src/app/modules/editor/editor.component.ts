import {
  Attribute,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostBinding,
  HostListener,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  SecurityContext,
  ViewChild,
  ChangeDetectionStrategy,
  AfterViewInit,
  Injector,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { DomSanitizer } from '@angular/platform-browser';
import { isDefined } from '../utils/isDefined';

import {
  angularEditorConfig,
  EditorCommands,
  EditorConfig
} from './editor-config';
import { EditorService } from './editor.service';
import { AtlasEditorToolbarComponent } from './editor-toolbar';
import {
  debounceTime,
  delay,
  EMPTY,
  fromEvent,
  mergeMap,
  of,
  startWith,
  Subject,
  switchMap,
  takeUntil,
  tap
} from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { inject, DestroyRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';


let elementNum = 0;

@Component({
  standalone: false,
  selector: 'atlas-editor, div[atlas-editor]',
  templateUrl: 'editor.component.html',
  styleUrls: ['./editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    EditorService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AtlasEditorComponent),
      multi: true
    }
  ]
})
export class AtlasEditorComponent
  implements OnInit, ControlValueAccessor, AfterViewInit, OnDestroy
{
  protected readonly destroyRef = inject(DestroyRef)
  @ViewChild('editorRef') editorRef: ElementRef<HTMLTextAreaElement> | undefined;
  @ViewChild('editorToolbar') editorToolbar: AtlasEditorToolbarComponent | undefined;
  @ViewChild('editorWrapper') editorWrapper: ElementRef<HTMLDivElement> | undefined;
  // @ViewChild('overlayRef') overlayRef: PopoverTrigger;
  @Input() public config = angularEditorConfig;
  @Input() public id = `editor-${elementNum++}`;
  @Input() public placeholder = '';
  @Input() public tabIndex: number | null;
  @Output('blur') blurEvent: EventEmitter<FocusEvent> =
    new EventEmitter<FocusEvent>();
  @Output('focus') focusEvent: EventEmitter<FocusEvent> =
    new EventEmitter<FocusEvent>();
  @Output() html = new EventEmitter<FocusEvent>();;
  @Output('editorSelectedText') @Input('editorSelectedText') selectedEvent =
    new EventEmitter<boolean>();
  @Output('editorToolbarToggle') @Input('editorToolbarToggle') toolbarToggle =
    new EventEmitter<boolean>();

  @Output() viewMode = new EventEmitter<boolean>();

  @HostBinding('attr.tabindex') tabindex = -1;
  private propagateChange: ((value: string) => void) | undefined;
  private propagateTouched: (() => void) | undefined;
  focused = false;
  modeVisual = true;
  showPlaceholder = false;
  touched = false;
  changed = false;
  focusInstance: any;
  blurInstance: any;
  protected configDefault = {
    editable: true,
    spellcheck: true,
    height: '1.5rem',
    minHeight: '2rem',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes', // 'no'
    enableToolbar: true,
    showToolbar: true,
    defaultFontName: '',
    defaultFontSize: '',
    sanitize: false,
    defaultParagraphSeparator: '',
    placeholder: 'Enter text here...',
    tools: [
      EditorCommands.bold,
      EditorCommands.italic,
      EditorCommands.underline,

      EditorCommands.justifyLeft,
      EditorCommands.justifyCenter,
      EditorCommands.justifyRight,
      EditorCommands.justifyFull,

      EditorCommands.undo,
      EditorCommands.redo,

      EditorCommands.toggleEditorMode
    ]
  };
  protected _disabled = false;
  private _enabled = true;
  stateChanges = new Subject<void>();
  public get textArea() {
    return this.editorRef?.nativeElement;
  }

  public get disabled() {
    return this._disabled;
  }
  public set disabled(disabled: boolean) {
    this.setDisabledState(disabled);
  }

  public get enabled() {
    if (this.disabled) {
      return false;
    }

    return this._enabled;
  }
  @Input() public set enabled(enabled: boolean) {
    this._enabled = enabled;
  }

  /** emits `blur` event when focused out from the textarea */

  constructor(
    private cdr: ChangeDetectorRef,
    private render: Renderer2,
    private editorService: EditorService,
    @Inject(DOCUMENT) private document: Document,
    private sanitizer: DomSanitizer,
    @Attribute('tabindex') defaultTabIndex: string,
    @Attribute('autofocus') private autoFocus: any,
    protected injector: Injector,
    protected elementRef: ElementRef<HTMLDivElement>
  ) {
    this.stateChanges.subscribe(() => this.cdr.markForCheck());
    const parsedTabIndex = Number(defaultTabIndex);
    this.tabIndex =
      parsedTabIndex || parsedTabIndex === 0 ? parsedTabIndex : null;
  }
  public ngOnInit(): void {
    this.config = Object.assign({}, this.configDefault, this.config);
    this.config.toolbarPosition = this.config.toolbarPosition
      ? this.config.toolbarPosition
      : angularEditorConfig.toolbarPosition;

    if (this.config.toolbarInline) {
      this.blurEvent.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
        this.updateSelected();
      });

      this.selectedEvent
        .pipe(
          takeUntilDestroyed(this.destroyRef),
          switchMap((flag) => {
            if (flag) {
              return fromEvent(this.document, 'click').pipe(
                mergeMap(() => {
                  this.updateSelected();
                  return EMPTY;
                }),
                startWith(flag)
              );
            }

            return of(flag).pipe(delay(200));
          })
        )
        .subscribe((flag) => {
          if (this.modeVisual) {
            // this.overlayRef.toggle(flag);
            this.cdr.markForCheck();
          }
        });
    }

    if (this.config.dblClickEnabled) {
      this.enabled = false;

      this.toolbarToggle
        .pipe(
          takeUntilDestroyed(this.destroyRef),
          debounceTime(0),
          tap((closed) => {
            if (!closed) {
              this.enabled = false;
              this.cdr.markForCheck();
            }
          })
        )
        .subscribe();

      this.elementRef.nativeElement.addEventListener('dblclick', () => {
        this.enabled = true;
        this.updateSelected();
        this.cdr.markForCheck();
      });
    }
  }
  public ngAfterViewInit(): void {
    if (isDefined(this.autoFocus)) {
      this.focus();
    }
  }
  public ngOnDestroy(): void {
    if (this.blurInstance) {
      this.blurInstance();
    }
    if (this.focusInstance) {
      this.focusInstance();
    }
  }
  @HostListener('focus') onFocus() {
    this.focus();
  }

  public onPaste(event: any) {
    if (this.config.rawPaste) {
      const text = event.clipboardData.getData('text/plain');
      document.execCommand('insertHTML', false, text);
      return text;
    } else {
      const text = event.clipboardData.getData('text');
      if (text) {
        document.execCommand('insertHTML', false, text);
      }
    }
    event.preventDefault();
  }

  /**
   * Executed command from editor header buttons
   *
   * @param command string from triggerCommand
   */
  executeCommand(command: string) {
    this.focus();
    if (command === 'focus') {
      return;
    }

    if (command === 'toggleEditorMode') {
      this.toggleEditorMode(this.modeVisual);
    } else if (command !== '') {
      if (command === 'clear') {
        this.editorService.removeSelectedElements(this.getCustomTags());
        this.onContentChange(this.textArea!);
      } else if (command === 'default') {
        this.editorService.removeSelectedElements('h1,h2,h3,h4,h5,h6,p,pre');
        this.onContentChange(this.textArea!);
      } else {
        this.editorService.executeCommand(command);
      }
      this.exec();
    }
  }

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

  /**
   * @description fires when cursor leaves textarea
   */
  public onTextAreaMouseOut(event: MouseEvent): void {
    this.editorService.saveSelection();
  }

  /**
   * blur event
   */
  public onTextAreaBlur(event: FocusEvent) {
    /**
     * save selection if focussed out
     */
    this.editorService.executeInNextQueueIteration(
      this.editorService.saveSelection
    );

    if (typeof this.propagateTouched === 'function') {
      this.propagateTouched();
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

  protected getSelectedText() {
    if (window.getSelection) {
      return window.getSelection()!.toString();
    } else if ((this.document as any).selection) {
      return (this.document as any).selection.createRange().text;
    }

    return '';
  }
  /**
   *  focus the text area when the editor is focused
   */
  focus() {
    if (this.modeVisual) {
      this.textArea!.focus();
    } else {
      const sourceText = this.document.getElementById('sourceText' + this.id);
      sourceText!.focus();
      this.focused = true;
    }
  }

  /**
   * Executed from the contenteditable section while the input property changes
   *
   * @param element html element from contenteditable
   */
  public onContentChange(element: HTMLElement): void {
    let html = '';
    if (this.modeVisual) {
      html = element.innerHTML;
    } else {
      html = element.innerText;
    }

    if (!html || html === '<br>') {
      html = '';
    }

    if (typeof this.propagateChange === 'function') {
      const _sanitize =
        this.config.sanitize || this.config.sanitize === undefined
          ? this.sanitizer.sanitize(SecurityContext.HTML, html)
          : html;

      this.propagateChange(_sanitize!);

      if (!html !== this.showPlaceholder) {
        this.togglePlaceholder(this.showPlaceholder);
      }
    }

    this.changed = true;
  }

  /**
   * Set the function to be called
   * when the control receives a change event.
   *
   * @param fn a function
   */
  registerOnChange(fn: any): void {
    this.propagateChange = (e) => (e === '<br>' ? fn('') : fn(e));
  }

  /**
   * Set the function to be called
   * when the control receives a touch event.
   *
   * @param fn a function
   */
  registerOnTouched(fn: any): void {
    this.propagateTouched = fn;
  }

  /**
   * Write a new value to the element.
   *
   * @param value value to be executed when there is a change in contenteditable
   */
  writeValue(value: any): void {
    if ((!value || value === '<br>' || value === '') !== this.showPlaceholder) {
      this.togglePlaceholder(this.showPlaceholder);
    }

    if (value === undefined || value === '' || value === '<br>') {
      value = null;
    }

    this.refreshView(value);
  }

  /**
   * refresh view/HTML of the editor
   *
   * @param value html string from the editor
   */
  refreshView(value: string): void {
    if (this.textArea) {
      const normalizedValue = value === null ? '' : value;
      this.render.setProperty(this.textArea, 'innerHTML', normalizedValue);
    }

    this.cdr.markForCheck();
  }

  /**
   * toggles placeholder based on input string
   *
   * @param value A HTML string from the editor
   */
  togglePlaceholder(value: boolean): void {
    if (this.editorWrapper) {
      if (!value) {
        this.render.addClass(
          this.editorWrapper.nativeElement,
          'show-placeholder'
        );
        this.showPlaceholder = true;
      } else {
        this.render.removeClass(
          this.editorWrapper.nativeElement,
          'show-placeholder'
        );
        this.showPlaceholder = false;
      }
    }
  }

  /**
   * Implements disabled state for this element
   *
   * @param isDisabled Disabled flag
   */
  public setDisabledState(isDisabled: boolean): void {
    const action = isDisabled ? 'addClass' : 'removeClass';
    const renderAction = this.render[action];
    if (renderAction && this.textArea) {
      renderAction(this.textArea, 'disabled');
      this._disabled = isDisabled;
    }
  }

  /**
   * toggles editor mode based on bToSource bool
   *
   * @param bToSource A boolean value from the editor
   */
  toggleEditorMode(bToSource: boolean) {
    let oContent: any;
    const editableElement = this.textArea;

    if (bToSource) {
      oContent = this.render.createText(editableElement!.innerHTML);
      this.render.setProperty(editableElement, 'innerHTML', '');
      this.render.setProperty(editableElement, 'contentEditable', false);

      const oPre = this.render.createElement('pre');
      this.render.setStyle(oPre, 'margin', '0');
      this.render.setStyle(oPre, 'outline', 'none');

      const oCode = this.render.createElement('code');
      this.render.setProperty(oCode, 'id', 'sourceText' + this.id);
      this.render.setStyle(oCode, 'display', 'block');
      this.render.setStyle(oCode, 'white-space', 'pre-wrap');
      this.render.setStyle(oCode, 'word-break', 'keep-all');
      this.render.setStyle(oCode, 'outline', 'none');
      this.render.setStyle(oCode, 'margin', '0');
      this.render.setStyle(oCode, 'background-color', '#efefef'); // #fff5b9
      this.render.setProperty(oCode, 'contentEditable', true);
      this.render.appendChild(oCode, oContent);
      this.focusInstance = this.render.listen(oCode, 'focus', (event) =>
        this.onTextAreaFocus(event)
      );
      this.blurInstance = this.render.listen(oCode, 'blur', (event) =>
        this.onTextAreaBlur(event)
      );
      this.render.appendChild(oPre, oCode);
      this.render.appendChild(editableElement, oPre);

      // ToDo move to service
      this.document.execCommand('defaultParagraphSeparator', false, 'div');

      this.modeVisual = false;
      this.viewMode.emit(false);
      oCode.focus();
    } else {
      if (this.document.querySelectorAll!) {
        this.render.setProperty(
          editableElement,
          'innerHTML',
          editableElement!.innerText
        );
      } else {
        oContent = this.document.createRange();
        oContent.selectNodeContents(editableElement!.firstChild);
        this.render.setProperty(
          editableElement,
          'innerHTML',
          oContent.toString()
        );
      }
      this.render.setProperty(editableElement, 'contentEditable', true);
      this.modeVisual = true;
      this.viewMode.emit(true);
      this.onContentChange(editableElement!);
      editableElement!.focus();
    }

    this.editorToolbar!.setEditorMode(!this.modeVisual);
  }

  /**
   * toggles editor buttons when cursor moved or positioning
   *
   * Send a node array from the contentEditable of the editor
   */
  exec() {
    this.editorToolbar?.triggerButton$?.next();

    let userSelection: Selection;
    if (this.document.getSelection) {
      userSelection = this.document.getSelection()!;
      this.editorService.executeInNextQueueIteration(
        this.editorService.saveSelection
      );
    }

    let a = userSelection!.focusNode as HTMLElement;
    const els = [];
    while (a && a.id !== 'editor') {
      els.unshift(a);
      a = a.parentNode as HTMLElement;
    }

    this.editorToolbar?.triggerBlocks(els);
  }

  private configure() {
    this.editorService.uploadUrl = this.config.uploadUrl;
    this.editorService.uploadWithCredentials =
      this.config.uploadWithCredentials;
    if (this.config.defaultParagraphSeparator) {
      this.editorService.setDefaultParagraphSeparator(
        this.config.defaultParagraphSeparator
      );
    }
    if (this.config.defaultFontName) {
      this.editorService.setFontName(this.config.defaultFontName);
    }
    if (this.config.defaultFontSize) {
      this.editorService.setFontSize(this.config.defaultFontSize);
    }
  }

  getFonts() {
    const fonts = this.config.fonts
      ? this.config.fonts
      : angularEditorConfig.fonts;
    return fonts!.map((x) => {
      return { label: x.name, value: x.name };
    });
  }

  getCustomTags() {
    const tags = ['span'];
    this.config.customClasses!.forEach((x) => {
      if (x.tag !== undefined) {
        if (!tags.includes(x.tag)) {
          tags.push(x.tag);
        }
      }
    });
    return tags.join(',');
  }

  filterStyles(html: string): string {
    html = html.replace('position: fixed;', '');
    return html;
  }

  updateSelected(): void {
    if (this.enabled) {
      setTimeout(() => {
        const text = this.getSelectedText();
        this.selectedEvent.emit(!!text);
      });
    }
  }
}
