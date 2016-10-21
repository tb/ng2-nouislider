import { ElementRef, EventEmitter, OnInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/common';
export declare function toValue(value: string[]): number | number[];
export declare class Nouislider implements ControlValueAccessor, OnInit {
    el: ElementRef;
    slider: any;
    value: any;
    onChange: any;
    onTouched: any;
    behaviour: string;
    connect: boolean;
    limit: number;
    min: number;
    max: number;
    step: number;
    config: any;
    ngModel: number | number[];
    ngModelChange: EventEmitter<any>;
    constructor(el: ElementRef);
    ngOnInit(): void;
    writeValue(value: any): void;
    registerOnChange(fn: (_: any) => {}): void;
    registerOnTouched(fn: () => {}): void;
}
