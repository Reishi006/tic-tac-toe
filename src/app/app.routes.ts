import { Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { KeyboardControlComponent } from './keyboard-control/keyboard-control.component';


export const routes: Routes = [{path: '', component: AppComponent}, {path: 'keyboard-control', component: KeyboardControlComponent}];
