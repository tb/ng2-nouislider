//our root app component
import {Component} from '@angular/core';
import {Nouislider} from 'ng2nouislider';
import './app.scss';

@Component({
  selector: 'app',
  directives: [Nouislider],
  template: require('./app.html')
})
export class App {
  public someValue: number = 5;
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

  changeSomeRange(index: number, value: number) {
    let newRange = [this.someRange[0], this.someRange[1]];
    newRange[index] = newRange[index] + value;
    this.someRange = newRange;
  }
}
