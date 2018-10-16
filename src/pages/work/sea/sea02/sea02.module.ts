import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SEA02 } from './sea02';

import { PipesModule } from '../../../../pipes/pipes.module';

@NgModule({
  declarations: [
    SEA02,
  ],
  imports: [
    IonicPageModule.forChild(SEA02),
    PipesModule
  ],
})
export class Sea02PageModule {}
