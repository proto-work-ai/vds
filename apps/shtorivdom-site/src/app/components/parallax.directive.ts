/* eslint-disable @angular-eslint/directive-selector */
import { isPlatformBrowser } from '@angular/common';
import { Directive, DOCUMENT, ElementRef, inject, Input, OnInit, PLATFORM_ID } from '@angular/core';

export interface ParallaxConfig {
  // just defining one property without special values
  cssKey?: string;

  // this is used to define the css property you'd like to modify as you scroll
  // default is backgroundPositionY
  cssProperty?: string;

  // ratio defining how fast, slow, or the direction of the changes on scrolling
  ratio?: number;

  // this is the initial value in pixels for the cssProperty property you defined
  // before or, if you didn't define one, it defaults to 0
  initialValue?: number;

  // use this if you want the parallax effect only if the passed in statement is
  canMove?: any;

  // the id for the element on the page you'd like to track the scrolling of in the
  // it defaults to the scrolling of the body
  scrollerId?: string;

  // the upper constraint for the css transformation
  maxValue?: number;

  // the lower constraint for the css transformation
  minValue?: number;

  cssUnit?: string;

  // the element in the current component that you'd like the directive to track its
  scrollElement?: HTMLElement;

  // the element that you'd like the effects from scrolling the scrollElement applied
  parallaxElement?: HTMLElement;

  // what you want to call it to find the particular instance of it if you need to debug
  name?: string;

  // optional callback function for additional actions during scaling
  cb?(): void;

  cb_args?: any[];

  // callback context in the case where the callback is context-specific
  cb_context?: any;
}

@Directive({ selector: '[parallax]', standalone: true })
export class NgxParallax implements OnInit {
  private document = inject(DOCUMENT);
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  @Input() config?: ParallaxConfig;
  // the following @Inputs are all part of the config object, which for
  // brevity's sake, you can do a bunch of operations in bulk by passing
  // more than 9 keys being passed in an object via the template
  @Input() axis: 'X' | 'Y' = 'Y';
  @Input() ratio = -0.7;
  @Input() initialValue = 0;
  @Input() canMove: any = true;
  @Input() scrollerId?: string;
  @Input() maxValue?: number;
  @Input() minValue?: number;
  @Input() cssUnit = 'px';
  @Input() cb: any;
  @Input() cb_context: any = null;
  @Input() cb_args: any[] = [];
  @Input() scrollElement: any;
  @Input() parallaxElement?: HTMLElement;
  @Input() cssKey = 'backgroundPosition';
  @Input() cssProperty = 'backgroundPositionY';

  parallaxStyles: any = {};

  private cssValue?: string;
  private isSpecialVal?: boolean = false;

  private hostElement?: HTMLElement;

  constructor() {
    this.hostElement = inject(ElementRef).nativeElement;
  }

  private evaluateScroll = () => {
    if (this.canMove && this.isBrowser) {
      let resultVal: string;
      let calcVal: number;

      if (this.scrollElement instanceof Window) {
        calcVal = this.scrollElement.scrollY * this.ratio + this.initialValue;
      } else {
        calcVal = this.scrollElement.scrollTop * this.ratio + this.initialValue;
      }

      if (this.maxValue !== undefined && calcVal >= this.maxValue) calcVal = this.maxValue;
      else if (this.minValue !== undefined && calcVal <= this.minValue) calcVal = this.minValue;

      // added after realizing original setup wasn't compatible in Firefox
      if (this.cssKey === 'backgroundPosition') {
        if (this.axis === 'X') {
          resultVal = 'calc(50% + ' + calcVal + this.cssUnit + ') center';
        } else {
          resultVal = 'center calc(50% + ' + calcVal + this.cssUnit + ')';
        }
      } else if (this.isSpecialVal) {
        resultVal = this.cssValue + '(' + calcVal + this.cssUnit + ')';
      } else {
        resultVal = calcVal + this.cssUnit;
      }

      if (this.cb) {
        this.cb.apply(this.cb_context, this.cb_args);
      }

      this.parallaxElement!.style[this.cssKey as any] = resultVal;
    }
  };

  public ngOnInit() {
    const self = this as any;
    Object.entries(this.config!).forEach(([prop, value]) => (self[prop] = value));

    this.cssProperty = this.cssProperty ? this.cssProperty : 'backgroundPositionY';
    if (this.cssProperty.match(/backgroundPosition/i)) {
      if (this.cssProperty.split('backgroundPosition')[1].toUpperCase() === 'X') {
        this.axis = 'X';
      }

      this.cssProperty = 'backgroundPosition';
    }

    const cssValArray = this.cssProperty.split(':');
    this.cssKey = cssValArray[0];
    this.cssValue = cssValArray[1];

    this.isSpecialVal = this.cssValue ? true : false;
    if (!this.cssValue) this.cssValue = this.cssKey;

    this.ratio = +this.ratio;
    this.initialValue = +this.initialValue;

    this.parallaxElement = this.parallaxElement || this.hostElement;
    if (!this.scrollElement) {
      if (this.document.getElementById('parallaxScroll'))
        this.scrollElement = this.document.getElementById('parallaxScroll');
      else if (this.scrollerId) {
        try {
          this.scrollElement = this.document.getElementById(this.scrollerId);
          if (!this.scrollElement)
            throw `The ID passed through the parallaxConfig ('${this.scrollerId}') object was not found in the document.  Defaulting to tracking the scrolling of the window.`;
        } catch (e) {
          console.warn(e);
          this.scrollElement = window;
        }
      } else if (this.isBrowser) {
        this.scrollElement = window;
      }
    }

    this.evaluateScroll();

    this.scrollElement?.addEventListener('scroll', this.evaluateScroll.bind(this));
  }
}
