import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Peg08detail1Page } from './peg08detail1';

import { PipesModule } from '../../../../pipes/pipes.module';

@NgModule({
  declarations: [
    Peg08detail1Page,
  ],
  imports: [
    IonicPageModule.forChild(Peg08detail1Page),
    PipesModule
  ],
})
export class Peg08detail1PageModule {}
