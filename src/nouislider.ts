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
  FormControl,
  NG_VALUE_ACCESSOR
} from '@angular/forms';

export function toValue(value: string[]): any | any[] {
  if (value.length == 1) {
    return value[0];
  } else if (value.length > 1) {
    return value;
  } else {
    return 0;
  }
}

export interface NouiFormatter {
  to(value: any): any;
  from(value: any): any;
}

export class DefaultFormatter implements NouiFormatter {
  to(value: any): any {
    return parseFloat(value);
  };

  from(value: any): any {
    return parseFloat(value).toFixed(2);
  }
}

@Component({
  selector: 'nouislider',
  host: {
    '[class.ng2-nouislider]': 'true'
  },
  template: '<div [attr.disabled]="disabled ? true : undefined"></div>',
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
  @Input() private disabled: boolean; // tslint:disable-line
  @Input() private behaviour: string;
  @Input() private connect: boolean[];
  @Input() private limit: number;
  @Input() private min: number;
  @Input() private max: number;
  @Input() private step: number;
  @Input() private format: NouiFormatter;
  @Input() private pageSteps: number;
  @Input() private config: any = {};
  @Input() private ngModel: number | number[];
  @Input() private keyboard: boolean;
  @Input() private onKeydown: any;
  @Input() private formControl: FormControl;
  @Input() private tooltips: Array<any>;
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
      start: this.ngModel || this.formControl.value,
      step: this.step,
      pageSteps: this.pageSteps,
      keyboard: this.keyboard,
      onKeydown: this.onKeydown,
      range: this.config.range || {min: this.min, max: this.max},
      tooltips: this.tooltips,
    }));

    inputsConfig.format = this.format || this.config.format || new DefaultFormatter();

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
      if (this.value !== undefined) {
        this.set.emit(v);
        this.onChange(v);
      }
      this.value = v;
    });

    this.slider.on('update', (values: string[]) => {
      this.update.emit(toValue(values));
    });

    this.slider.on('change', (values: string[]) => {
      this.change.emit(toValue(values));
    });

    this.slider.on('slide', (values: string[]) => {
      this.slide.emit(toValue(values));
    });

    this.slider.on('start', (values: string[]) => {
      this.start.emit(toValue(values));
    });

    this.slider.on('end', (values: string[]) => {
      this.end.emit(toValue(values));
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

    if(Array.isArray(this.value)) {
      newValue = [].concat(this.value);
      newValue[index] = this.config.format.to(parseFloat(this.config.format.from(newValue[index])) + delta);
    } else {
      newValue = this.config.format.to(parseFloat(this.config.format.from(this.value)) + delta);
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
