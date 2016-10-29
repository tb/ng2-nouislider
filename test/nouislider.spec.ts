import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { Component, DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { toValue, NouisliderModule, NouisliderComponent } from '../src/nouislider.ts';

describe('toValue', () => {
  it('should transform strings array to values', () => {
    expect(toValue(['0'])).toEqual(0);
    expect(toValue(['1'])).toEqual(1);
    expect(toValue(['2','3'])).toEqual([2,3]);
  });
});

describe('Nouislider Component', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        NouisliderModule
      ],
      declarations: [
        TestSingleSliderComponent,
        TestRangeSliderComponent
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
          min: 0,
          max: 10
        }
      };
      expect(sliderInstance['config']).toEqual(defaultOptions);
      expect(sliderInstance.slider.options).toEqual(defaultOptions);
    });

    it('should trigger events on model change', async(() => {
      componentInstance.someValue = componentInstance.someValue + 1;
      fixture.detectChanges();
      fixture.whenStable().then((isStable) => {
        fixture.detectChanges();
        expect(isStable).toBe(true, 'isStable');
        expect(componentInstance.someValue).toEqual(6);
        expect((<any>componentInstance.onEvent).calls.allArgs()).toEqual([
          [ 'set', 5 ],
          [ 'ngModelChange', 6 ],
          [ 'change', 6 ],
          [ 'set', 6 ]
        ]);
      });
    }));

    it('should trigger events on slider set', async(() => {
      sliderInstance.slider.set('6');
      setTimeout(() => {
        expect(componentInstance.someValue).toEqual(6);
        expect((<any>componentInstance.onEvent).calls.allArgs()).toEqual([
          [ 'set', 5 ],
          [ 'ngModelChange', 6 ],
          [ 'change', 6 ],
          [ 'set', 6 ]
        ]);
      });
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
        start: [ 3 , 7 ],
        step: 1,
        range: {
          min: 0,
          max: 10
        }
      };
      expect(sliderInstance['config']).toEqual(defaultOptions);
      expect(sliderInstance.slider.options).toEqual(defaultOptions);
    });

    it('should trigger events on model change', async(() => {
      componentInstance.someRange = [componentInstance.someRange[0]+1, componentInstance.someRange[1]];
      fixture.detectChanges();
      fixture.whenStable().then((isStable) => {
        fixture.detectChanges();
        expect(isStable).toBe(true, 'isStable');
        expect(componentInstance.someRange).toEqual([ 4, 7 ]);
        expect((<any>componentInstance.onEvent).calls.allArgs()).toEqual([
          [ 'set', [ 3, 7 ] ],
          [ 'set', [ 3, 7 ] ],
          [ 'ngModelChange', [ 4, 7 ] ],
          [ 'change', [ 4, 7 ] ],
          [ 'set', [ 4, 7 ] ],
          [ 'set', [ 4, 7 ] ]
        ]);
      });
    }));

    it('should trigger events on slider set', async(() => {
      sliderInstance.slider.set([ '4', '7' ]);
      setTimeout(() => {
        expect(componentInstance.someRange).toEqual([ 4, 7 ]);
        expect((<any>componentInstance.onEvent).calls.allArgs()).toEqual([
          [ 'set', [ 3, 7 ] ],
          [ 'set', [ 3, 7 ] ],
          [ 'ngModelChange', [ 4, 7 ] ],
          [ 'change', [ 4, 7 ] ],
          [ 'set', [ 4, 7 ] ],
          [ 'set', [ 4, 7 ] ]
        ]);
      });
    }));
  });
});

@Component({
  selector: 'test-single-slider',
  template: `
    <nouislider
      [min]="0"
      [max]="10"
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
  public onEvent(event: string, value: number) {};
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
  public onEvent(event: string, value: number[]) {};
}
