import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { Component, DebugElement } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { DefaultFormatter, NouisliderModule, NouisliderComponent } from '../src/nouislider.ts';

describe('Default Formatter', () => {
  let formatter: DefaultFormatter;

  beforeEach(async(() => {
    formatter = new DefaultFormatter();
  }));

  describe('to', () => {
    it('should transform numbers to strings with default formatting', () => {
      expect(formatter.to(0)).toEqual('0');
      expect(formatter.to(0.001)).toEqual('0');
      expect(formatter.to(0.5)).toEqual('0.5');
      expect(formatter.to(1)).toEqual('1');
    });
  });

  describe('from', () => {
    it('should transform strings with default formatting to numbers', () => {
      expect(formatter.from('0')).toEqual(0);
      expect(formatter.from('0.5')).toEqual(0.5);
      expect(formatter.from('1')).toEqual(1);
    });
  });
});

describe('Nouislider Component', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        NouisliderModule,
        ReactiveFormsModule
      ],
      declarations: [
        TestSingleSliderComponent,
        TestRangeSliderComponent,
        TestSingleFormSliderComponent,
        TestRangeFormSliderComponent
      ]
    });
  }));

  describe('single slider', () => {
    let fixture: ComponentFixture<TestSingleSliderComponent>;
    let componentInstance: TestSingleSliderComponent;
    let sliderDebugElement: DebugElement;
    let sliderNativeElement: HTMLElement;
    let sliderInstance: NouisliderComponent;

    beforeEach(async(() => {
      fixture = TestBed.createComponent(TestSingleSliderComponent);
      componentInstance = fixture.debugElement.componentInstance;
      sliderDebugElement = fixture.debugElement.query(By.directive(NouisliderComponent));
      sliderNativeElement = sliderDebugElement.nativeElement;
      sliderInstance = sliderDebugElement.componentInstance;
      spyOn(componentInstance, 'onEvent');
      fixture.detectChanges();
    }));

    it('should set config', () => {
      const defaultOptions = {
        start: 5,
        step: 0.05,
        range: {
          min: -10,
          max: 10
        },
        format: {
          to: function (value: any) : any {
            return value;
          },
          from: function (value: any) : any {
            return parseFloat(value);
          }
        }
      };

      expect(JSON.parse(JSON.stringify(sliderInstance['config']))).toEqual(JSON.parse(JSON.stringify(defaultOptions)));
      expect(JSON.parse(JSON.stringify(sliderInstance.slider.options))).toEqual(JSON.parse(JSON.stringify(defaultOptions)));
    });

    it('should set default formatter', () => {
      expect(sliderInstance['config'].format instanceof DefaultFormatter).toBeTruthy();
      expect(sliderInstance.slider.options.format instanceof DefaultFormatter).toBeTruthy();
    });

    it('should trigger events on model change', async(() => {
      componentInstance.someValue = componentInstance.someValue + 1;
      fixture.detectChanges();
      fixture.whenStable().then((isStable) => {
        fixture.detectChanges();
        expect(isStable).toBe(true, 'isStable');
        expect(componentInstance.someValue).toEqual(6);
        expect((<any>componentInstance.onEvent).calls.allArgs()).toEqual([
          ['ngModelChange', 6],
          ['set', 6]
        ]);
      });
    }));

    it('should trigger events on limit change', async(() => {
      componentInstance.someLimit = 4;
      fixture.detectChanges();
      fixture.whenStable().then((isStable) => {
        fixture.detectChanges();
        expect(isStable).toBe(true, 'isStable');
        expect(componentInstance.someLimit).toEqual(4);
        expect(componentInstance.someValue).toEqual(4);
        expect((<any>componentInstance.onEvent).calls.allArgs()).toEqual([
          ['ngModelChange', 4],
          ['set', 4]
        ]);
      });
    }));

    it('should trigger events on slider set', async(() => {
      sliderInstance.slider.set('6');
      setTimeout(() => {
        expect(componentInstance.someValue).toEqual(6);
        expect((<any>componentInstance.onEvent).calls.allArgs()).toEqual([
          ['ngModelChange', 6],
          ['set', 6]
        ]);
      });
    }));
  });

  describe('single slider (as form control)', () => {
    let fixture: ComponentFixture<TestSingleFormSliderComponent>;
    let componentInstance: TestSingleFormSliderComponent;
    let sliderDebugElement: DebugElement;
    let sliderInstance: NouisliderComponent;

    beforeEach(async(() => {
      fixture = TestBed.createComponent(TestSingleFormSliderComponent);
      componentInstance = fixture.debugElement.componentInstance;
      sliderDebugElement = fixture.debugElement.query(By.directive(NouisliderComponent));
      sliderInstance = sliderDebugElement.componentInstance;
      fixture.detectChanges();
    }));

    it('should set config', () => {
      const defaultOptions = {
        start: 8,
        step: 0.05,
        range: {
          min: 0,
          max: 10
        },
        format: {
          to: function (value: any) : any {
            return value;
          },
          from: function (value: any) : any {
            return parseFloat(value);
          }
        }
      };

      expect(JSON.parse(JSON.stringify(sliderInstance['config']))).toEqual(JSON.parse(JSON.stringify(defaultOptions)));
      expect(JSON.parse(JSON.stringify(sliderInstance.slider.options))).toEqual(JSON.parse(JSON.stringify(defaultOptions)));
    });

    it('should set default formatter', () => {
      expect(sliderInstance['config'].format instanceof DefaultFormatter).toBeTruthy();
      expect(sliderInstance.slider.options.format instanceof DefaultFormatter).toBeTruthy();
    });

    it('should change the form value on slider set', async(() => {

      // Initial value
      expect(componentInstance.form.value).toEqual({ single: 8 });

      // Change value via noUiSlider object
      sliderInstance.slider.set(4);
      expect(componentInstance.form.value).toEqual({ single: 4 });
    }));
  });

  describe('range slider', () => {
    let fixture: ComponentFixture<TestRangeSliderComponent>;
    let componentInstance: TestRangeSliderComponent;
    let sliderDebugElement: DebugElement;
    let sliderNativeElement: HTMLElement;
    let sliderInstance: NouisliderComponent;

    beforeEach(async(() => {
      fixture = TestBed.createComponent(TestRangeSliderComponent);
      componentInstance = fixture.debugElement.componentInstance;
      sliderDebugElement = fixture.debugElement.query(By.directive(NouisliderComponent));
      sliderNativeElement = sliderDebugElement.nativeElement;
      sliderInstance = sliderDebugElement.componentInstance;
      spyOn(componentInstance, 'onEvent');
      fixture.detectChanges();
    }));

    it('should set config', () => {
      const defaultOptions = {
        start: [3, 7],
        step: 1,
        range: {
          min: 0,
          max: 10
        },
        format: {
          to: function (value: any) : any {
            return value;
          },
          from: function (value: any) : any {
            return parseFloat(value);
          }
        }
      };
      expect(JSON.parse(JSON.stringify(sliderInstance['config']))).toEqual(JSON.parse(JSON.stringify(defaultOptions)));
      expect(JSON.parse(JSON.stringify(sliderInstance.slider.options))).toEqual(JSON.parse(JSON.stringify(defaultOptions)));
    });

    it('should set default formatter', () => {
      expect(sliderInstance['config'].format instanceof DefaultFormatter).toBeTruthy();
      expect(sliderInstance.slider.options.format instanceof DefaultFormatter).toBeTruthy();
    });

    it('should trigger events on model change', async(() => {
      componentInstance.someRange = [componentInstance.someRange[0] + 1, componentInstance.someRange[1]];
      fixture.detectChanges();
      fixture.whenStable().then((isStable) => {
        fixture.detectChanges();
        expect(isStable).toBe(true, 'isStable');
        expect(componentInstance.someRange).toEqual([4, 7]);
        expect((<any>componentInstance.onEvent).calls.allArgs()).toEqual([
          ['ngModelChange', [4, 7]],
          ['set', [4, 7]]
        ]);
      });
    }));

    it('should trigger events on slider set', async(() => {
      sliderInstance.slider.set(['4', '7']);
      setTimeout(() => {
        expect(componentInstance.someRange).toEqual([4, 7]);
        expect((<any>componentInstance.onEvent).calls.allArgs()).toEqual([
          ['ngModelChange', [4, 7]],
          ['set', [4, 7]]
        ]);
      });
    }));
  });

  describe('range slider (as form control)', () => {
    let fixture: ComponentFixture<TestRangeFormSliderComponent>;
    let componentInstance: TestRangeFormSliderComponent;
    let sliderDebugElement: DebugElement;
    let sliderInstance: NouisliderComponent;

    beforeEach(async(() => {
      fixture = TestBed.createComponent(TestRangeFormSliderComponent);
      componentInstance = fixture.debugElement.componentInstance;
      sliderDebugElement = fixture.debugElement.query(By.directive(NouisliderComponent));
      sliderInstance = sliderDebugElement.componentInstance;
      fixture.detectChanges();
    }));

    it('should set config', () => {
      const defaultOptions = {
        start: [2, 8],
        step: 1,
        range: { min: 0, max: 10 },
        format: {
          to: function (value: any) : any {
            return value;
          },
          from: function (value: any) : any {
            return parseFloat(value);
          }
        }
      };

      expect(JSON.parse(JSON.stringify(sliderInstance['config']))).toEqual(JSON.parse(JSON.stringify(defaultOptions)));
      expect(JSON.parse(JSON.stringify(sliderInstance.slider.options))).toEqual(JSON.parse(JSON.stringify(defaultOptions)));
    });

    it('should set default formatter', () => {
      expect(sliderInstance['config'].format instanceof DefaultFormatter).toBeTruthy();
      expect(sliderInstance.slider.options.format instanceof DefaultFormatter).toBeTruthy();
    });

    it('should change the form value on slider set', async(() => {

      // Initial value
      expect(componentInstance.form.value).toEqual({ range: [2, 8] });

      // Change value via noUiSlider object
      sliderInstance.slider.set([4, 6]);
      expect(componentInstance.form.value).toEqual({ range: [4, 6] });
    }));
  });
});

@Component({
  selector: 'test-single-slider',
  template: `
    <nouislider
      [min]="-10"
      [max]="someLimit"
      [step]="0.05"
      [(ngModel)]="someValue"
      (ngModelChange)="onEvent('ngModelChange', $event)"
      (change)="onEvent('change', $event)"
      (set)="onEvent('set', $event)"
    ></nouislider>
  `,
})
class TestSingleSliderComponent {
  public someValue: number = 5;
  public someLimit: number = 10;
  public onEvent(event: string, value: number) { };
}

@Component({
  selector: 'test-single-form-slider',
  template: `
    <form [formGroup]="form">
      <nouislider
        [min]="0"
        [max]="10"
        [step]="0.05"
        [formControl]="form.controls.single"
      ></nouislider>
    </form>
  `,
})
class TestSingleFormSliderComponent {
  public form: FormGroup;
  constructor (private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({ 'single': [ 8 ] });
  }
}

@Component({
  selector: 'test-range-slider',
  template: `
    <nouislider
      [min]="0"
      [max]="10"
      [step]="1"
      [(ngModel)]="someRange"
      (ngModelChange)="onEvent('ngModelChange', $event)"
      (change)="onEvent('change', $event)"
      (set)="onEvent('set', $event)"
    ></nouislider>
  `,
})
class TestRangeSliderComponent {
  public someRange: number[] = [3, 7];
  public onEvent(event: string, value: number[]) { };
}

@Component({
  selector: 'test-range-form-slider',
  template: `
    <form [formGroup]="form">
      <nouislider
        [min]="0"
        [max]="10"
        [step]="1"
        [formControl]="form.controls.range"
      ></nouislider>
    </form>
  `,
})
class TestRangeFormSliderComponent {
  public form: FormGroup;
  constructor (private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({ 'range': [[2, 8]] });
  }
}
