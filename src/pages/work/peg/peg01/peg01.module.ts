import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PEG01 } from './peg01';

import { PipesModule } from '../../../../pipes/pipes.module';

@NgModule({
  declarations: [
    PEG01,
  ],
  imports: [
    IonicPageModule.forChild(PEG01),
    PipesModule
  ],
})
export class Peg01PageModule {}
