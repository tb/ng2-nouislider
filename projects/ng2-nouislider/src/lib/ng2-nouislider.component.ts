import * as noUiSlider from 'nouislider';
import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  Output,
  Renderer2,
  NgZone,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface NouiFormatter {
  to(value: number): string;
  from(value: string): number;
}

export class DefaultFormatter implements NouiFormatter {
  to(value: number): string {
    // formatting with http://stackoverflow.com/a/26463364/478584
    return String(parseFloat(parseFloat(String(value)).toFixed(2)));
  }

  from(value: string): number {
    return parseFloat(value);
  }
}

@Component({
  selector: 'nouislider',
  host: {
    '[class.ng2-nouislider]': 'true',
  },
  template: '<div [attr.disabled]="disabled ? true : undefined"></div>',
  styles: [
    `
      :host {
        display: block;
        margin-top: 1rem;
        margin-bottom: 1rem;
      }
    `,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NouisliderComponent),
      multi: true,
    },
  ],
  standalone: true,
})
export class NouisliderComponent
  implements ControlValueAccessor, OnChanges, OnDestroy
{
  public slider: any;
  public handles: any[] = [];
  @Input() public disabled!: boolean;
  @Input() public behaviour!: string;
  @Input() public connect!: boolean[] | boolean;
  @Input() public limit!: number;
  @Input() public min!: number;
  @Input() public max!: number;
  @Input() public snap!: boolean;
  @Input() public animate!: boolean | boolean[];
  @Input() public range!: any;
  @Input() public step!: number;
  @Input() public format!: NouiFormatter;
  @Input() public pageSteps!: number;
  @Input() public config: any = {};
  @Input() public keyboard!: boolean;
  @Input() public onKeydown: any;
  @Input() public tooltips!: Array<any>;
  @Output() public change: EventEmitter<any> = new EventEmitter(true);
  @Output() public update: EventEmitter<any> = new EventEmitter(true);
  @Output() public slide: EventEmitter<any> = new EventEmitter(true);
  @Output() public set: EventEmitter<any> = new EventEmitter(true);
  @Output() public start: EventEmitter<any> = new EventEmitter(true);
  @Output() public end: EventEmitter<any> = new EventEmitter(true);
  private value: any;
  private onChange: any = Function.prototype;
  private cleanups: VoidFunction[] = [];

  constructor(
    private ngZone: NgZone,
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (
      this.slider &&
      (changes.min || changes.max || changes.step || changes.range)
    ) {
      this.ngZone.runOutsideAngular(() => {
        setTimeout(() => {
          this.slider.updateOptions({
            range: Object.assign(
              {},
              {
                min: this.min,
                max: this.max,
              },
              this.range || {}
            ),
            step: this.step,
          });
        });
      });
    }
  }

  ngOnDestroy(): void {
    this.slider.destroy();

    while (this.cleanups.length) {
      this.cleanups.pop()?.();
    }
  }

  toValues(values: string[]): any | any[] {
    let v = values.map(this.config.format.from);
    return v.length == 1 ? v[0] : v;
  }

  writeValue(value: any): void {
    if (this.slider) {
      this.ngZone.runOutsideAngular(() => {
        setTimeout(() => {
          this.slider.set(value);
        });
      });
    } else if (value !== null) {
      this.value = value;
      this.createSlider(value);
    }
  }

  registerOnChange(fn: (value: any) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {}

  setDisabledState(isDisabled: boolean): void {
    isDisabled
      ? this.renderer.setAttribute(
          this.el.nativeElement.childNodes[0],
          'disabled',
          'true'
        )
      : this.renderer.removeAttribute(
          this.el.nativeElement.childNodes[0],
          'disabled'
        );
  }

  private eventHandler = (
    emitter: EventEmitter<any>,
    values: string[],
    handle: number,
    unencoded: number[]
  ) => {
    let v = this.toValues(values);
    let emitEvents = false;
    if (this.value === undefined) {
      this.value = v;
      return;
    }
    if (Array.isArray(v) && this.value[handle] != v[handle]) {
      emitEvents = true;
    }
    if (!Array.isArray(v) && this.value != v) {
      emitEvents = true;
    }
    if (emitEvents) {
      this.ngZone.run(() => {
        if (emitter.observers.length > 0) {
          emitter.emit(v);
        }
        this.onChange(v);
      });
    }
    if (Array.isArray(v)) {
      this.value[handle] = v[handle];
    } else {
      this.value = v;
    }
  };

  private defaultKeyHandler = (e: KeyboardEvent) => {
    let stepSize: any[] = this.slider.steps();
    let index = parseInt(
      (e.target as HTMLElement).getAttribute('data-handle') as string
    );
    let sign = 1;
    let multiplier: number = 1;
    let step = 0;
    let delta = 0;

    switch (e.which) {
      case 34: // PageDown
        multiplier = this.config.pageSteps;
        break;
      case 40: // ArrowDown
      case 37: // ArrowLeft
        sign = -1;
        step = stepSize[index][0];
        e.preventDefault();
        break;

      case 33: // PageUp
        multiplier = this.config.pageSteps;
        break;
      case 38: // ArrowUp
      case 39: // ArrowRight
        step = stepSize[index][1];
        e.preventDefault();
        break;

      default:
        break;
    }

    delta = sign * multiplier * step;
    let newValue: number | number[];

    if (Array.isArray(this.value)) {
      newValue = [...this.value];
      newValue[index] = newValue[index] + delta;
    } else {
      newValue = this.value + delta;
    }

    this.slider.set(newValue);
  };

  private createSlider(initialValue: any): void {
    let inputsConfig = JSON.parse(
      JSON.stringify({
        behaviour: this.behaviour,
        connect: this.connect,
        limit: this.limit,
        start: initialValue,
        step: this.step,
        pageSteps: this.pageSteps,
        keyboard: this.keyboard,
        onKeydown: this.onKeydown,
        range: this.range ||
          this.config.range || { min: this.min, max: this.max },
        tooltips: this.tooltips,
        snap: this.snap,
        animate: this.animate,
      })
    );
    inputsConfig.tooltips = this.tooltips || this.config.tooltips;
    inputsConfig.format =
      this.format || this.config.format || new DefaultFormatter();

    this.ngZone.runOutsideAngular(() => {
      this.slider = noUiSlider.create(
        this.el.nativeElement.querySelector('div'),
        Object.assign(this.config, inputsConfig)
      );
    });

    this.handles = [].slice.call(
      this.el.nativeElement.querySelectorAll('.noUi-handle')
    );

    if (this.config.keyboard) {
      if (this.config.pageSteps === undefined) {
        this.config.pageSteps = 10;
      }

      for (const handle of this.handles) {
        handle.setAttribute('tabindex', 0);

        const onKeydown = this.config.onKeydown || this.defaultKeyHandler;

        this.ngZone.runOutsideAngular(() => {
          this.cleanups.push(
            this.renderer.listen(handle, 'keydown', onKeydown),
            this.renderer.listen(handle, 'click', () => {
              handle.focus();
            })
          );
        });
      }
    }

    this.slider.on(
      'set',
      (values: string[], handle: number, unencoded: number[]) => {
        this.eventHandler(this.set, values, handle, unencoded);
      }
    );

    this.slider.on(
      'update',
      (values: string[], handle: number, unencoded: number[]) => {
        if (this.update.observers.length > 0) {
          this.ngZone.run(() => {
            this.update.emit(this.toValues(values));
          });
        }
      }
    );

    this.slider.on(
      'change',
      (values: string[], handle: number, unencoded: number[]) => {
        if (this.change.observers.length > 0) {
          this.ngZone.run(() => {
            this.change.emit(this.toValues(values));
          });
        }
      }
    );

    this.slider.on(
      'slide',
      (values: string[], handle: number, unencoded: number[]) => {
        this.eventHandler(this.slide, values, handle, unencoded);
      }
    );

    this.slider.on(
      'start',
      (values: string[], handle: number, unencoded: number[]) => {
        if (this.start.observers.length > 0) {
          this.ngZone.run(() => {
            this.start.emit(this.toValues(values));
          });
        }
      }
    );

    this.slider.on(
      'end',
      (values: string[], handle: number, unencoded: number[]) => {
        if (this.end.observers.length > 0) {
          this.ngZone.run(() => {
            this.end.emit(this.toValues(values));
          });
        }
      }
    );
  }
}
