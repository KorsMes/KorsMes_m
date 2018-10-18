import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Pdh04detail2Page } from './pdh04detail2';

import { PipesModule } from '../../../../pipes/pipes.module';

@NgModule({
  declarations: [
    Pdh04detail2Page,
  ],
  imports: [
    IonicPageModule.forChild(Pdh04detail2Page),
    PipesModule
  ],
})
export class Pdh04detail2PageModule {}
