import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SEA12 } from './sea12';

import { PipesModule } from '../../../../pipes/pipes.module';

@NgModule({
  declarations: [
    SEA12,
  ],
  imports: [
    IonicPageModule.forChild(SEA12),
    PipesModule
  ],
})
export class Sea12PageModule {}
