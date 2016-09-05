import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { Nouislider } from 'ng2nouislider';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
  ],
  declarations: [
    AppComponent,
    Nouislider,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
