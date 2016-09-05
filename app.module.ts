import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { App } from './app';
import { Nouislider } from 'ng2nouislider';

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    App,
    Nouislider
  ],
  providers: [],
  bootstrap: [App]
})
export class AppModule {}
