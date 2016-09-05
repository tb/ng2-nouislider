import { Component } from '@angular/core';
import './app.component.scss';

@Component({
  selector: 'app',
  template: require('./app.component.html')
})
export class AppComponent {
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
}
