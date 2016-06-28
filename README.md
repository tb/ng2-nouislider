# ng2-nouislider

Angular2 nouislider directive

See [demos](http://tb.github.io/ng2-nouislider/)

## Install

    npm i --save nouislider ng2-nouislider

## Import

    import {Nouislider} from 'ng2-nouislider';

Styles

    @import "~nouislider/distribute/nouislider.min.css";

## Usage

    <div nouislider [connect]="true" [min]="0" [max]="15" [(ngModel)]="someRange"></div>

## Start development

    git clone --recursive https://github.com/tb/ng2-nouislider.git
    npm install
    npm build
    npm start # check http://localhost:8080 in browser

## License

MIT
