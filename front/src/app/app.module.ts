import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GojsAngularModule } from 'gojs-angular';
import { AppComponent } from './app.component';
import { InspectorComponent } from './inspector/inspector.component';
import { AppService } from './services/app.service';


@NgModule({
  declarations: [
    AppComponent,
    InspectorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    GojsAngularModule,
    HttpClientModule,
    MatButtonModule,
    MatFormFieldModule,
    MatProgressSpinnerModule
  ],
  providers: [
    AppService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
