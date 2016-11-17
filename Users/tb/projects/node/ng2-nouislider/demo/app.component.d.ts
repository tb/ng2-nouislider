import './app.component.scss';
export declare class AppComponent {
    keyupLabelOn: boolean;
    keydownLabelOn: boolean;
    someValue: number;
    someFormValue: number;
    someRange: number[];
    someRange2: number[];
    someRange2config: any;
    someKeyboard: number[];
    someKeyboardConfig: any;
    someKeyboard2: number[];
    private someKeyboard2EventHandler;
    someKeyboardConfig2: any;
    changeSomeValue(value: number): void;
    changeSomeFormValue(value: number): void;
    changeSomeRange(index: number, value: number): void;
    onChange(value: any): void;
    blinkKeyupLabel(): void;
    blinkKeydownLabel(): void;
}
