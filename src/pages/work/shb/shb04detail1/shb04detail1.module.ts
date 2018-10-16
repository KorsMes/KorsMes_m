import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Shb04detail1Page } from './shb04detail1';

import { PipesModule } from '../../../../pipes/pipes.module';

@NgModule({
  declarations: [
    Shb04detail1Page,
  ],
  imports: [
    IonicPageModule.forChild(Shb04detail1Page),
    PipesModule
  ],
})
export class Shb04detail1PageModule {}
