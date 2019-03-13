import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {LoginComponent} from './login/login.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'calendar', loadChildren: './modules/calendar/calendar.module#CalendarModule'},
  { path: '**', pathMatch: 'full', redirectTo: '/' } // catch any unfound routes and redirect to home page
];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
   exports: [ RouterModule ]
})

export class AppRoutingModule { }
