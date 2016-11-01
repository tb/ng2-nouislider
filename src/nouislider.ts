import * as noUiSlider from 'nouislider';
import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
  NgModule,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR
} from '@angular/forms';

export function toValue(value: string[]): number|number[] {
  if (value.length == 1) {
    return parseFloat(value[0]);
  } else if (value.length > 1) {
    return value.map(parseFloat);
  } else {
    return 0;
  }
}

@Component({
  selector: 'nouislider',
  host: {
    '[class.ng2-nouislider]': 'true'
  },
  template: '<div></div>',
  styles: [`
    :host {
      display: block;
      margin-top: 1rem;
      margin-bottom: 1rem;
    }
  `],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NouisliderComponent),
      multi: true
    }
  ]
})
export class NouisliderComponent implements ControlValueAccessor, OnInit {
  public slider: any;
  public handles: any[];
  @Input() private behaviour: string;
  @Input() private connect: boolean[];
  @Input() private limit: number;
  @Input() private min: number;
  @Input() private max: number;
  @Input() private step: number;
  @Input() private pageSteps: number;
  @Input() private config: any = {};
  @Input() private ngModel: number | number[];
  @Input() private keyboard: boolean;
  @Input() private onKeydown: any;
  @Output() private change: EventEmitter<any> = new EventEmitter(true);
  @Output() private update: EventEmitter<any> = new EventEmitter(true);
  @Output() private slide: EventEmitter<any> = new EventEmitter(true);
  @Output() private set: EventEmitter<any> = new EventEmitter(true);
  @Output() private start: EventEmitter<any> = new EventEmitter(true);
  @Output() private end: EventEmitter<any> = new EventEmitter(true);
  private value: any;
  private onChange: any = Function.prototype;
  private onTouched: any = Function.prototype;

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    let inputsConfig = JSON.parse(JSON.stringify({
      behaviour: this.behaviour,
      connect: this.connect,
      limit: this.limit,
      start: this.ngModel,
      step: this.step,
      pageSteps: this.pageSteps,
      keyboard: this.keyboard,
      onKeydown: this.onKeydown,
      range: this.config.range || {min: this.min, max: this.max}
    }));

    this.slider = noUiSlider.create(
      this.el.nativeElement.querySelector('div'),
      Object.assign(this.config, inputsConfig)
    );

    this.handles = [].slice.call(this.el.nativeElement.querySelectorAll('.noUi-handle'));

    if(this.config.keyboard) {
      if(this.config.pageSteps === undefined) {
        this.config.pageSteps = 10;
      }
      for(let handle of this.handles) {
        handle.setAttribute('tabindex', 0);
        handle.addEventListener('click', () => {
          handle.focus();
        });
        if(this.config.onKeydown === undefined) {
          handle.addEventListener('keydown', this.defaultKeyHandler);
        } else {
          handle.addEventListener('keydown', this.config.onKeydown);
        }
      }
    }

    this.slider.on('set', (value: any) => {
      let v = toValue(value);
      if (this.value == v || String(this.value) == String(v)) {
        return;
      }
      if(this.value !== undefined) {
        this.set.emit(v);
        this.onChange(v);
      }
      this.value = v;
    });

    this.slider.on('update', () => {
      this.update.emit(this.value);
    });

    this.slider.on('change', () => {
      this.change.emit(this.value);
    });

    this.slider.on('slide', () => {
      this.slide.emit(this.value);
    });

    this.slider.on('start', () => {
      this.start.emit(this.value);
    });

    this.slider.on('end', () => {
      this.end.emit(this.value);
    });
  }

  writeValue(value: any): void {
    if (this.slider) {
      this.slider.set(value);
    }
  }

  registerOnChange(fn: (value: any) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  private defaultKeyHandler = (e: KeyboardEvent) => {
    let stepSize: any[] = this.slider.steps();
    let index = parseInt((<HTMLElement>e.target).getAttribute('data-handle'));
    let sign = 1;
    let multiplier: number = 1;
    let step = 0;
    let delta = 0;

    switch ( e.which ) {
      case 34:  // PageDown
        multiplier = this.config.pageSteps;
      case 40:  // ArrowDown
      case 37:  // ArrowLeft
        sign = -1;
        step = stepSize[index][0];
        e.preventDefault();
        break;

      case 33:  // PageUp
        multiplier = this.config.pageSteps;
      case 38:  // ArrowUp
      case 39:  // ArrowRight
        step = stepSize[index][1];
        e.preventDefault();
        break;

      default:
        break;
    }

    delta = sign * multiplier * step;
    let newValue: number | number[];

    if (typeof(this.value) == "number") {
      newValue = this.value + delta;
    } else {
      newValue = [].concat(this.value);
      newValue[index] += delta;
    }
    this.slider.set(newValue);
  }
}


@NgModule({
  imports: [],
  exports: [NouisliderComponent],
  declarations: [NouisliderComponent],
})
export class NouisliderModule { }
