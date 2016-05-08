import {bootstrap} from '@angular/platform-browser-dynamic';
import {App} from './app';

document.addEventListener('DOMContentLoaded', function main() {
  bootstrap(App, [])
    .catch(err => console.error(err));
});
