import { OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import './app.component.scss';
import { NouiFormatter } from '../src/nouislider';
export declare class TimeFormatter implements NouiFormatter {
    to(value: number): string;
    from(value: string): number;
}
export declare class AppComponent implements OnInit {
    private formBuilder;
    disabled: boolean;
    keyupLabelOn: boolean;
    keydownLabelOn: boolean;
    someValue: number;
    someMin: number;
    someMax: number;
    someRange: number[];
    someRange2: number[];
    someRange3: number[];
    simeTime: number;
    someRange2config: any;
    someKeyboard: number[];
    someKeyboardConfig: any;
    someKeyboard2: number[];
    form1: FormGroup;
    form2: FormGroup;
    someTimeConfig: any;
    constructor(formBuilder: FormBuilder);
    ngOnInit(): void;
    someKeyboard2EventHandler: (e: KeyboardEvent) => void;
    someKeyboardConfig2: any;
    changeSomeValue(value: number): void;
    changeSomeMin(value: number): void;
    changeSomeMax(value: number): void;
    changeSingleFormValue(value: number): void;
    changeRangeFormValue(index: number, value: number): void;
    changeSomeRange(index: number, value: number): void;
    onChange(value: any): void;
    blinkKeyupLabel(): void;
    blinkKeydownLabel(): void;
}
