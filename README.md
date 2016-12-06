# ng2-nouislider

[![Build Status](https://travis-ci.org/tb/ng2-nouislider.svg?branch=master)](https://travis-ci.org/tb/ng2-nouislider)
[![npm version](https://badge.fury.io/js/ng2-nouislider.svg)](http://badge.fury.io/js/ng2-nouislider)
[![Downloads](http://img.shields.io/npm/dm/ng2-nouislider.svg)](https://npmjs.org/package/ng2-nouislider)

Angular2 nouislider component

See [demos](http://tb.github.io/ng2-nouislider/)

## Install

    npm i --save nouislider ng2-nouislider

## Import

    import { NouisliderModule } from 'ng2-nouislider';

### Styles

    @import "~nouislider/distribute/nouislider.min.css";

### SystemJS config

Add to map:

    'nouislider': 'node_modules/nouislider',
    'ng2-nouislider': 'node_modules/ng2-nouislider',

Add to packages:

    'nouislider': { main: 'distribute/nouislider.js', defaultExtension: 'js' },
    'ng2-nouislider': { main: 'src/nouislider.js', defaultExtension: 'js' },

## Usage

### Using ngModel

    <nouislider [connect]="true" [min]="0" [max]="15" [(ngModel)]="someRange"></nouislider>

### Within reactive forms

```js
this.form1 = this.formBuilder.group({ 'single': [ 10 ] });
```

```html
<form [formGroup]="form">
    <nouislider [min]="0" [max]="20" [step]="0.5" [formControl]="form.controls.slider"></nouislider>
</form>
```

## Start development

    npm i
    npm start
    open http://localhost:8080

## License

MIT
