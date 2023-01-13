import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {appRoutes} from './app.routes';
import {HttpClientModule} from "@angular/common/http";
import {ClassValidatorFormBuilderModule} from "ngx-reactive-form-class-validator";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ClassValidatorFormBuilderModule.forRoot(),
    RouterModule.forRoot(appRoutes, {initialNavigation: 'enabledBlocking'}),
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
