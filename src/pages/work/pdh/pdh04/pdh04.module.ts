import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PDH04 } from './pdh04';

import { PipesModule } from '../../../../pipes/pipes.module';

import {HideFabOnscrollModule} from 'ionic-hide-fab-onscroll';

@NgModule({
  declarations: [
    PDH04,
  ],
  imports: [
    IonicPageModule.forChild(PDH04),
    PipesModule,
    HideFabOnscrollModule
  ],
})
export class Pdh04PageModule {}
