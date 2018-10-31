import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Peg08detail3Page } from './peg08detail3';

import { PipesModule } from '../../../../pipes/pipes.module';

@NgModule({
  declarations: [
    Peg08detail3Page,
  ],
  imports: [
    IonicPageModule.forChild(Peg08detail3Page),
    PipesModule
  ],
})
export class Peg08detail3PageModule {}
