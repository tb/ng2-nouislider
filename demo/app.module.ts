import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NouisliderModule } from '../src/nouislider';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    NouisliderModule,
  ],
  declarations: [
    AppComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
