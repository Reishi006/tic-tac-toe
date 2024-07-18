import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { KeyboardControlComponent } from './keyboard-control/keyboard-control.component';


export const routes: Routes = [{path: '', component: HomeComponent}, {path: 'keyboard-control', component: KeyboardControlComponent}];
