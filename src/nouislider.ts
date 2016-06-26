import * as noUiSlider from 'nouislider';
import {
  Directive,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
  Provider
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR
} from '@angular/common';

export function toValue(value: string[]): number|number[] {
  if (value.length == 1) {
    return parseFloat(value[0]);
  } else if (value.length > 1) {
    return value.map(parseFloat);
  } else {
    return 0;
  }
}

const NOUISLIDER_CONTROL_VALUE_ACCESSOR = new Provider(
  NG_VALUE_ACCESSOR, {
    useExisting: forwardRef(() => Nouislider),
    multi: true
  });

@Directive({
  selector: '[nouislider]',
  providers: [NOUISLIDER_CONTROL_VALUE_ACCESSOR]
})
export class Nouislider implements ControlValueAccessor, OnInit {
  public el: ElementRef;
  public slider: any;
  public value: any;
  public onChange: any = Function.prototype;
  public onTouched: any = Function.prototype;

  @Input() behaviour: string;
  @Input() connect: boolean;
  @Input() limit: number;
  @Input() min: number;
  @Input() max: number;
  @Input() step: number;
  @Input() config: any = {};
  @Input() ngModel: number | number[];
  @Output() ngModelChange: EventEmitter<any> = new EventEmitter(true);

  public constructor(el: ElementRef) {
    this.el = el;
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
      this.el.nativeElement,
      Object.assign(this.config, inputsConfig)
    );

    this.slider.on('set', (value: any) => {
      this.writeValue(toValue(value));
    });
  }

  public writeValue(value: any): void {
    if (this.value == value || String(this.value) == String(value)) {
      return;
    }

    this.ngModelChange.emit(value);
    this.value = value;
    if (this.slider) {
      this.slider.set(value);
    }
  }

  public registerOnChange(fn: (_: any) => {}): void {
    this.onTouched = fn;
  }

  public registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }
}
