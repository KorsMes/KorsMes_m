import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PAF06 } from './paf06';

import { PipesModule } from '../../../../pipes/pipes.module';

@NgModule({
  declarations: [
    PAF06,
  ],
  imports: [
    IonicPageModule.forChild(PAF06),
    PipesModule
  ],
})
export class Paf06PageModule {}
