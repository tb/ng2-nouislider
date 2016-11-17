import { Component } from '@angular/core';
import './app.component.scss';

@Component({
  selector: 'app',
  template: require('./app.component.html')
})
export class AppComponent {
  public keyupLabelOn: boolean = false;
  public keydownLabelOn: boolean = false;

  public someValue: number = 5;
  public someFormValue: number = 7;
  public someRange: number[] = [3, 7];
  public someRange2: number[] = [10, 15];
  public someRange2config: any = {
    behaviour: 'drag',
    connect: true,
    margin: 1,
    limit: 5,
    range: {
      min: 0,
      max: 20
    },
    pips: {
      mode: 'steps',
      density: 5
    }
  };

  public someKeyboard: number[] = [1, 3];

  public someKeyboardConfig: any = {
    behaviour: 'drag',
    connect: true,
    start: [0, 5],
    keyboard: true,
    step: 0.1,
    pageSteps: 10,  // number of page steps, defaults to 10
    range: {
      min: 0,
      max: 5
    },
    pips: {
      mode: 'count',
      density: 2,
      values: 6,
      stepped: true
    }
  };

  public someKeyboard2: number[] = [1, 3];

  public someKeyboardConfig2: any = {
    behaviour: 'drag',
    connect: true,
    start: [0, 5],
    step: 0.1,
    range: {
      min: 0,
      max: 5
    },
    pips: {
      mode: 'count',
      density: 2,
      values: 6,
      stepped: true
    },
    keyboard: true,
    onKeydown: this.someKeyboard2EventHandler
  };

  public someKeyboard2EventHandler = (e: KeyboardEvent) => {
    console.log("overridden keyboard handler");

    // determine which handle triggered the event
    let index = parseInt((<HTMLElement>e.target).getAttribute('data-handle'));

    let multiplier: number = 0;
    let stepSize = 0.1;

    switch ( e.which ) {
      case 40:  // ArrowDown
      case 37:  // ArrowLeft
        multiplier = -2;
        e.preventDefault();
        break;

      case 38:  // ArrowUp
      case 39:  // ArrowRight
        multiplier = 3;
        e.preventDefault();
        break;

      default:
        break;
    }

    let delta = multiplier * stepSize;
    let newValue = [].concat(this.someKeyboard2);
    newValue[index] += delta;
    this.someKeyboard2 = newValue;
  };

  changeSomeValue(value: number) {
    this.someValue = this.someValue + value;
  }

  changeSomeFormValue(value: number) {
    this.someFormValue = this.someFormValue + value;
  }

  changeSomeRange(index: number, value: number) {
    let newRange = [this.someRange[0], this.someRange[1]];
    newRange[index] = newRange[index] + value;
    this.someRange = newRange;
  }

  onChange(value: any) {
    console.log('Value changed to', value);
  }

  blinkKeyupLabel() {
    this.keyupLabelOn = true;
    setTimeout(() => {
      this.keyupLabelOn = false;
    }, 450);
  }

  blinkKeydownLabel() {
    this.keydownLabelOn = true;
    setTimeout(() => {
      this.keydownLabelOn = false;
    }, 450);
  }
}
