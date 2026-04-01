import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Output,
  Renderer2,
  signal,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { isDefined } from '../../utils/isDefined';

export interface SelectOption {
  label: string;
  value: string;
}

@Component({
  selector: 'toolbar-select',
  templateUrl: 'toolbar-select.html',
  styleUrls: ['./toolbar-select.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EditorSelectComponent),
      multi: true,
    },
  ],
  imports: [CommonModule]
})
export class EditorSelectComponent implements OnInit, ControlValueAccessor {
  @ViewChild('labelButton', { static: true }) labelButton: ElementRef | undefined;
  // tslint:disable-next-line:no-input-rename
  @Input('hidden') isHidden: boolean | undefined;
  @Input() public options: SelectOption[] = [];

  // tslint:disable-next-line:no-output-native no-output-rename
  @Output('change') changeEvent = new EventEmitter<any>();
  @HostBinding('style.display') hidden = 'inline-block';
  protected selectedOption = signal<SelectOption | undefined>(undefined);
  disabled = false;
  optionId = 0;

  opened = false;
  public propagateChange: any = () => {};
  public propagateTouched: any = () => {};

  public get label(): string {
    return this.selectedOption()?.hasOwnProperty('label') ? this.selectedOption()!.label : 'Select';
  }

  public get value() {
    return this.selectedOption()?.value;
  }

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {}

  public ngOnInit(): void {
    this.selectedOption.set(this.options[0]);
    if (isDefined(this.isHidden) && this.isHidden) {
      this.hide();
    }
  }

  hide() {
    this.hidden = 'none';
  }

  optionSelect(option: SelectOption, event: PointerEvent) {
    event.stopPropagation();
    this.setValue(option.value);
    this.propagateChange(this.selectedOption()?.value);
    this.changeEvent.emit(this.selectedOption()?.value);
    this.propagateTouched();
    this.opened = false;
  }

  toggleOpen(event: MouseEvent) {
    // event.stopPropagation();
    if (this.disabled) {
      return;
    }
    this.opened = !this.opened;
  }

  @HostListener('document:click', ['$event'])
  public onClick($event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains($event.target)) {
      this.close();
    }
  }

  close() {
    this.opened = false;
  }

  public get isOpen(): boolean {
    return this.opened;
  }

  writeValue(value: any) {
    if (!value || typeof value !== 'string') {
      return;
    }
    this.setValue(value);
  }

  public setValue(value: string, propagateChange = true) {
    let index = 0;
    const selectedEl = this.options.find((el, i) => {
      index = i;
      return el.value === value;
    });
    if (selectedEl) {
      this.selectedOption.set(selectedEl);
      this.optionId = index;
    }
  }

  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any) {
    this.propagateTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    if (this.labelButton) {
      this.labelButton.nativeElement.disabled = isDisabled;
    }
    const div = this.labelButton?.nativeElement;
    const action = isDisabled ? 'addClass' : 'removeClass';
    this.renderer[action](div, 'disabled');
    this.disabled = isDisabled;
  }

  @HostListener('keydown', ['$event'])
  handleKeyDown($event: KeyboardEvent) {
    if (!this.opened) {
      return;
    }
    // console.log($event.key);
    // if (KeyCode[$event.key]) {
    switch ($event.key) {
      case 'ArrowDown':
        this._handleArrowDown($event);
        break;
      case 'ArrowUp':
        this._handleArrowUp($event);
        break;
      case 'Space':
        this._handleSpace($event);
        break;
      case 'Enter':
        this._handleEnter($event as any);
        break;
      case 'Tab':
        this._handleTab($event);
        break;
      case 'Escape':
        this.close();
        $event.preventDefault();
        break;
      case 'Backspace':
        this._handleBackspace();
        break;
    }
    // } else if ($event.key && $event.key.length === 1) {
    // this._keyPress$.next($event.key.toLocaleLowerCase());
    // }
  }

  _handleArrowDown($event: KeyboardEvent) {
    if (this.optionId < this.options.length - 1) {
      this.optionId++;
    }
  }

  _handleArrowUp($event: KeyboardEvent) {
    if (this.optionId >= 1) {
      this.optionId--;
    }
  }

  _handleSpace($event: KeyboardEvent) {}

  _handleEnter($event: PointerEvent) {
    this.optionSelect(this.options[this.optionId], $event);
  }

  _handleTab($event: KeyboardEvent) {}

  _handleBackspace() {}
}
