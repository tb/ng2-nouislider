import * as noUiSlider from 'nouislider';
import {Directive, OnInit, ElementRef, forwardRef, Provider, Input, Output, EventEmitter} from 'angular2/core';
import {ControlValueAccessor} from 'angular2/common';

import {NG_VALUE_ACCESSOR} from 'angular2/src/common/forms/directives/control_value_accessor';

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

  @Input() connect: boolean = false;
  @Input() min: number = 0;
  @Input() max: number = 10;
  @Input() step: number = 1;
  @Output() ngModelChange: EventEmitter<any> = new EventEmitter();

  public constructor(el:ElementRef) {
    this.el = el;
  }

  ngOnInit(): void {
    this.slider = noUiSlider.create(this.el.nativeElement, {
      start: this.value || 0,
      step: this.step,
      connect: this.connect,
      range: {
        min: this.min,
        max: this.max
      }
    });

    this.slider.on('set', (value) => {
      this.writeValue(toValue(value));
    });
  }

  public writeValue(value: any): void {
    if (this.value == value || String(this.value) == String(value))
      return;

    this.ngModelChange.emit(value);
    this.value = value;
    if (this.slider) {
      this.slider.set(value);
    }
  }

  public registerOnChange(fn:(_:any) => {}):void {
    this.onTouched = fn;
  }

  public registerOnTouched(fn:() => {}):void {
    this.onTouched = fn;
  }
}
