import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Peg01detail1Page } from './peg01detail1';

import { PipesModule } from '../../../../pipes/pipes.module';

@NgModule({
  declarations: [
    Peg01detail1Page,
  ],
  imports: [
    IonicPageModule.forChild(Peg01detail1Page),
    PipesModule
  ],
})
export class Peg01detail1PageModule {}
