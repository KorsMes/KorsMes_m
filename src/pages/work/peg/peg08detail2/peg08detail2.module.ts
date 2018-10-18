import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Peg08detail2Page } from './peg08detail2';

import { PipesModule } from '../../../../pipes/pipes.module';

@NgModule({
  declarations: [
    Peg08detail2Page,
  ],
  imports: [
    IonicPageModule.forChild(Peg08detail2Page),
    PipesModule
  ],
})
export class Peg08detail2PageModule {}
