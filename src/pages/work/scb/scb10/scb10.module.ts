import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SCB10 } from './scb10';

import { PipesModule } from '../../../../pipes/pipes.module';

import {HideFabOnscrollModule} from 'ionic-hide-fab-onscroll';

@NgModule({
  declarations: [
    SCB10,
  ],
  imports: [
    IonicPageModule.forChild(SCB10),
    PipesModule,
    HideFabOnscrollModule
  ],
})
export class Scb10PageModule {}
