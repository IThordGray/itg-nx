import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { FormsComponent } from './pages/forms/forms.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';


import { InputComponent } from './components/forms/input/input.component';


const routes: Routes = [
  { path: 'landing', component: LandingComponent },
  { path: 'forms', component: FormsComponent },
  { path: '', pathMatch: 'full', redirectTo: 'landing' },
  { path: '**', redirectTo: 'landing' },
]

@NgModule({
  declarations: [AppComponent, LandingComponent, FormsComponent, InputComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,

    MatInputModule,
    MatFormFieldModule,


    RouterModule.forRoot(routes, { initialNavigation: 'enabled' })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
