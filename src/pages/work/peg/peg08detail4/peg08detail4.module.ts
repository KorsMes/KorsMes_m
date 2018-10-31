import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Peg08detail4Page } from './peg08detail4';

import { PipesModule } from '../../../../pipes/pipes.module';

@NgModule({
  declarations: [
    Peg08detail4Page,
  ],
  imports: [
    IonicPageModule.forChild(Peg08detail4Page),
    PipesModule
  ],
})
export class Peg08detail4PageModule {}
