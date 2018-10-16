import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Sfa05detail1Page } from './sfa05detail1';

import { PipesModule } from '../../../../pipes/pipes.module';

@NgModule({
  declarations: [
    Sfa05detail1Page,
  ],
  imports: [
    IonicPageModule.forChild(Sfa05detail1Page),
    PipesModule
  ],
})
export class Sfa05detail1PageModule {}
