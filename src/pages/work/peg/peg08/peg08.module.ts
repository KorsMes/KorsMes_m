import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PEG08 } from './peg08';

import { PipesModule } from '../../../../pipes/pipes.module';

@NgModule({
  declarations: [
    PEG08,
  ],
  imports: [
    IonicPageModule.forChild(PEG08),
    PipesModule
  ],
})
export class Peg08PageModule {}
