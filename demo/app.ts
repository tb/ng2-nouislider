//our root app component
import {Component} from 'angular2/core';
import {Control} from 'angular2/common'
import {Nouislider} from 'ng2nouislider';

@Component({
  selector: 'my-app',
  directives: [Nouislider],
  templateUrl: 'demo/app.html'
})
export class App {
  public someValue: any = 5;
  public someRange: any = [3,7];

  changeSomeValue(value: number) {
    this.someValue = this.someValue + value;
  }

  changeSomeRange(index: number, value: number) {
    let newRange = [this.someRange[0], this.someRange[1]];
    newRange[index] = newRange[index] + value;
    this.someRange = newRange;
  }
}
