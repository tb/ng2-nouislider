# ng2-nouislider

[![Build Status](https://travis-ci.org/tb/ng2-nouislider.svg?branch=master)](https://travis-ci.org/tb/ng2-nouislider)
[![npm version](https://badge.fury.io/js/ng2-nouislider.svg)](http://badge.fury.io/js/ng2-nouislider)
[![Downloads](http://img.shields.io/npm/dm/ng2-nouislider.svg)](https://npmjs.org/package/ng2-nouislider)

Angular2 nouislider component

See [demos](http://tb.github.io/ng2-nouislider/)

## Install

    npm i --save nouislider ng2-nouislider

## Import

    import {Nouislider} from 'ng2-nouislider';

Styles

    @import "~nouislider/distribute/nouislider.min.css";

## Usage

    <nouislider [connect]="true" [min]="0" [max]="15" [(ngModel)]="someRange"></nouislider>

## Start development

    git clone --recursive https://github.com/tb/ng2-nouislider.git
    cd ng2-nouislider
    npm install
    npm start
    # check http://localhost:8080 in browser

## License

MIT
