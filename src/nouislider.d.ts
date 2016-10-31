import { ElementRef, OnInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
export declare function toValue(value: string[]): number | number[];
export declare class NouisliderComponent implements ControlValueAccessor, OnInit {
    private el;
    slider: any;
    private behaviour;
    private connect;
    private limit;
    private min;
    private max;
    private step;
    private config;
    private ngModel;
    private change;
    private update;
    private slide;
    private set;
    private start;
    private end;
    private value;
    private onChange;
    private onTouched;
    constructor(el: ElementRef);
    ngOnInit(): void;
    writeValue(value: any): void;
    registerOnChange(fn: (value: any) => void): void;
    registerOnTouched(fn: () => {}): void;
}
export declare class NouisliderModule {
}
