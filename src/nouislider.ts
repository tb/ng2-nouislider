import * as noUiSlider from 'nouislider';
import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output
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

const NOUISLIDER_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => Nouislider),
  multi: true
};

@Component({
  selector: 'nouislider',
  host: { '[class.ng2-nouislider]': 'true' },
  template: '<div></div>',
  styles: [`
    :host {
      display: block;
      margin-top: 1rem;
      margin-bottom: 1rem;
    }
  `],
  providers: [NOUISLIDER_CONTROL_VALUE_ACCESSOR]
})
export class Nouislider implements ControlValueAccessor, OnInit {
  @Input() private behaviour: string;
  @Input() private connect: boolean;
  @Input() private limit: number;
  @Input() private min: number;
  @Input() private max: number;
  @Input() private step: number;
  @Input() private config: any = {};
  @Input() private ngModel: number | number[];
  @Output() private ngModelChange: EventEmitter<any> = new EventEmitter(true);
  @Output() private change: EventEmitter<any> = new EventEmitter(true);
  @Output() private update: EventEmitter<any> = new EventEmitter(true);
  @Output() private slide: EventEmitter<any> = new EventEmitter(true);
  @Output() private set: EventEmitter<any> = new EventEmitter(true);
  @Output() private start: EventEmitter<any> = new EventEmitter(true);
  @Output() private end: EventEmitter<any> = new EventEmitter(true);

  private slider: any;
  private value: any;
  private onChange: any = Function.prototype;
  private onTouched: any = Function.prototype;

  constructor(private el: ElementRef) {
    this.change = this.ngModelChange;
  }

  ngOnInit(): void {
    let inputsConfig = JSON.parse(JSON.stringify({
      behaviour: this.behaviour,
      connect: this.connect,
      limit: this.limit,
      start: this.ngModel,
      step: this.step,
      range: this.config.range || {min: this.min, max: this.max}
    }));

    this.slider = noUiSlider.create(
      this.el.nativeElement.querySelector('div'),
      Object.assign(this.config, inputsConfig)
    );

    this.slider.on('set', (value: any) => {
      this.writeValue(toValue(value));
      this.set.emit();
    });

    this.slider.on('update', () => {
      this.update.emit();
    });

    this.slider.on('slide', () => {
      this.slide.emit();
    });

    this.slider.on('start', () => {
      this.start.emit();
    });

    this.slider.on('end', () => {
      this.end.emit();
    });
  }

  writeValue(value: any): void {
    if (this.value == value || String(this.value) == String(value)) {
      return;
    }

    // avoid triggering change event on slider initialization
    if (this.value !== undefined) {
      this.ngModelChange.emit(value);
    }

    this.value = value;

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
}
