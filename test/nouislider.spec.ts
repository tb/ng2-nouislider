import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { Component, DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Nouislider } from '../src/nouislider';

describe('Nouislider Component', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      declarations: [
        Nouislider,
        TestSingleSliderComponent
      ]
    });

    TestBed.compileComponents();
  }));

  describe('single slider', () => {
    let fixture: ComponentFixture<TestSingleSliderComponent>;
    let fixtureInstance: TestSingleSliderComponent;
    let sliderDebugElement: DebugElement;
    let sliderNativeElement: HTMLElement;
    let sliderInstance: Nouislider;

    beforeEach(() => {
      fixture = TestBed.createComponent(TestSingleSliderComponent);
      fixture.detectChanges();
      fixtureInstance = fixture.componentInstance;

      sliderDebugElement = fixture.debugElement.query(By.directive(Nouislider));
      sliderNativeElement = sliderDebugElement.nativeElement;
      sliderInstance = sliderDebugElement.componentInstance;
    });

    it('should set config', () => {
      expect(sliderInstance['config']).toEqual({
        start: 5,
        step: 0.05,
        range: {
          min: 0,
          max: 10}
      });
    });

    it('should update model and trigger change event', async(() => {
      spyOn(fixtureInstance, 'onChange');
      sliderInstance.writeValue('7');
      fixture.whenStable().then(() => {
        expect(fixtureInstance.someValue).toEqual(7);
        expect(fixtureInstance.onChange).toHaveBeenCalledWith(7);
      });
    }));
  });
});

@Component({
  selector: 'test-single-slider',
  template: '<nouislider [min]="0" [max]="10" [step]="0.05" [(ngModel)]="someValue" (change)="onChange($event)"></nouislider>',
})
class TestSingleSliderComponent {
  public someValue: number = 5;
  public onChange(v: boolean) {}
}
