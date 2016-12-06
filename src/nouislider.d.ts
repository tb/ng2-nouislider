import { ElementRef, OnInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
export declare function toValue(value: string[]): any | any[];
export interface NouiFormatter {
    to(value: any): any;
    from(value: any): any;
}
export declare class DefaultFormatter implements NouiFormatter {
    to(value: any): any;
    from(value: any): any;
}
export declare class NouisliderComponent implements ControlValueAccessor, OnInit {
    private el;
    slider: any;
    handles: any[];
    private disabled;
    private behaviour;
    private connect;
    private limit;
    private min;
    private max;
    private step;
    private format;
    private pageSteps;
    private config;
    private ngModel;
    private keyboard;
    private onKeydown;
    private formControl;
    private tooltips;
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
    private defaultKeyHandler;
}
export declare class NouisliderModule {
}
