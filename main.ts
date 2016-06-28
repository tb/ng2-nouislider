import {bootstrap} from '@angular/platform-browser-dynamic';
import {disableDeprecatedForms, provideForms} from '@angular/forms';
import {App} from './app';

document.addEventListener('DOMContentLoaded', function main() {
  bootstrap(App, [
    disableDeprecatedForms(),
    provideForms()
  ])
    .catch(err => console.error(err));
});
