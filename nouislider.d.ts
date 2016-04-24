import { OnInit, ElementRef, EventEmitter } from 'angular2/core';
import { ControlValueAccessor } from 'angular2/common';
export declare function toValue(value: string[]): number | number[];
export declare class Nouislider implements ControlValueAccessor, OnInit {
    el: ElementRef;
    slider: any;
    value: any;
    onChange: any;
    onTouched: any;
    ngModelChange: EventEmitter<any>;
    constructor(el: ElementRef);
    ngOnInit(): void;
    writeValue(value: any): void;
    registerOnChange(fn: (_: any) => {}): void;
    registerOnTouched(fn: () => {}): void;
}
