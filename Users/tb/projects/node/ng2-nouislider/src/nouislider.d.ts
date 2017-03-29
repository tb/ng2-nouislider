import { ElementRef, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { ControlValueAccessor, FormControl } from '@angular/forms';
export interface NouiFormatter {
    to(value: number): string;
    from(value: string): number;
}
export declare class DefaultFormatter implements NouiFormatter {
    to(value: number): string;
    from(value: string): number;
}
export declare class NouisliderComponent implements ControlValueAccessor, OnInit, OnChanges {
    private el;
    slider: any;
    handles: any[];
    disabled: boolean;
    behaviour: string;
    connect: boolean[];
    limit: number;
    min: number;
    max: number;
    step: number;
    format: NouiFormatter;
    pageSteps: number;
    config: any;
    ngModel: number | number[];
    keyboard: boolean;
    onKeydown: any;
    formControl: FormControl;
    tooltips: Array<any>;
    change: EventEmitter<any>;
    update: EventEmitter<any>;
    slide: EventEmitter<any>;
    set: EventEmitter<any>;
    start: EventEmitter<any>;
    end: EventEmitter<any>;
    private value;
    private onChange;
    private onTouched;
    constructor(el: ElementRef);
    ngOnInit(): void;
    ngOnChanges(changes: any): void;
    toValues(values: string[]): any | any[];
    writeValue(value: any): void;
    registerOnChange(fn: (value: any) => void): void;
    registerOnTouched(fn: () => {}): void;
    private defaultKeyHandler;
}
export declare class NouisliderModule {
}
