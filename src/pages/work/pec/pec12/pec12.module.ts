import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PEC12 } from './pec12';

import { PipesModule } from '../../../../pipes/pipes.module';

@NgModule({
  declarations: [
    PEC12,
  ],
  imports: [
    IonicPageModule.forChild(PEC12),
    PipesModule
  ],
})
export class Pec12PageModule {}
