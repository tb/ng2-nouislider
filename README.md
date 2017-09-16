# ng2-nouislider

[![Build Status](https://travis-ci.org/tb/ng2-nouislider.svg?branch=master)](https://travis-ci.org/tb/ng2-nouislider)
[![npm version](https://badge.fury.io/js/ng2-nouislider.svg)](http://badge.fury.io/js/ng2-nouislider)
[![Downloads](http://img.shields.io/npm/dm/ng2-nouislider.svg)](https://npmjs.org/package/ng2-nouislider)
[![All Contributors](https://img.shields.io/badge/all_contributors-12-orange.svg?style=flat-square)](#contributors)

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
    <nouislider [min]="0" [max]="20" [step]="0.5" [formControl]="form.controls.single"></nouislider>
</form>
```
## Nouislider documentation

This component based on [nouislider](https://refreshless.com/nouislider/). Documentation about additional settings (passed in [config] @Input) can found [here](https://refreshless.com/nouislider/slider-options/).


## Start development

    npm i
    npm start
    open http://localhost:8080

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
| [<img src="https://avatars2.githubusercontent.com/u/71683?v=4" width="100px;"/><br /><sub>Tomasz Bak</sub>](http://twitter.com/tomaszbak)<br />[💻](https://github.com/tb/ng2-nouislider/commits?author=tb "Code") [👀](#review-tb "Reviewed Pull Requests") | [<img src="https://avatars2.githubusercontent.com/u/18688794?v=4" width="100px;"/><br /><sub>Giacomo Mazzamuto</sub>](https://github.com/gmazzamuto)<br />[💻](https://github.com/tb/ng2-nouislider/commits?author=gmazzamuto "Code") [👀](#review-gmazzamuto "Reviewed Pull Requests") | [<img src="https://avatars3.githubusercontent.com/u/7102450?v=4" width="100px;"/><br /><sub>Ryan Morris</sub>](https://github.com/ryan-morris)<br />[💻](https://github.com/tb/ng2-nouislider/commits?author=ryan-morris "Code") | [<img src="https://avatars2.githubusercontent.com/u/2569015?v=4" width="100px;"/><br /><sub>Sven Flickinger</sub>](https://github.com/naeramarth7)<br />[💻](https://github.com/tb/ng2-nouislider/commits?author=naeramarth7 "Code") | [<img src="https://avatars0.githubusercontent.com/u/8615481?v=4" width="100px;"/><br /><sub>Riku Kallio</sub>](https://github.com/RichieRock)<br />[💻](https://github.com/tb/ng2-nouislider/commits?author=RichieRock "Code") | [<img src="https://avatars3.githubusercontent.com/u/5350861?v=4" width="100px;"/><br /><sub>John Pinkster</sub>](https://github.com/jpinkster)<br />[💻](https://github.com/tb/ng2-nouislider/commits?author=jpinkster "Code") | [<img src="https://avatars1.githubusercontent.com/u/477298?v=4" width="100px;"/><br /><sub>Oleg Romanovskyi</sub>](https://olg.io/)<br />[💻](https://github.com/tb/ng2-nouislider/commits?author=shedar "Code") |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| [<img src="https://avatars1.githubusercontent.com/u/5629145?v=4" width="100px;"/><br /><sub>ATeal</sub>](http://www.alexrteal.com)<br />[💻](https://github.com/tb/ng2-nouislider/commits?author=ATeal "Code") | [<img src="https://avatars1.githubusercontent.com/u/2158235?v=4" width="100px;"/><br /><sub>Jérémy Leherpeur</sub>](https://github.com/amenophis)<br />[💻](https://github.com/tb/ng2-nouislider/commits?author=amenophis "Code") | [<img src="https://avatars1.githubusercontent.com/u/6425649?v=4" width="100px;"/><br /><sub>Matt Lewis</sub>](https://mattlewis.me/)<br />[💻](https://github.com/tb/ng2-nouislider/commits?author=mattlewis92 "Code") | [<img src="https://avatars1.githubusercontent.com/u/5819263?v=4" width="100px;"/><br /><sub>anysite</sub>](https://github.com/anysite)<br />[📖](https://github.com/tb/ng2-nouislider/commits?author=anysite "Documentation") | [<img src="https://avatars1.githubusercontent.com/u/3389712?v=4" width="100px;"/><br /><sub>flmg</sub>](https://github.com/flmg)<br />[💻](https://github.com/tb/ng2-nouislider/commits?author=flmg "Code") |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification.
Contributions of any kind are welcome!

## License

MIT
