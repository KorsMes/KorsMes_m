import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Pdb13detail1Page } from './pdb13detail1';

import { PipesModule } from '../../../../pipes/pipes.module';

@NgModule({
  declarations: [
    Pdb13detail1Page,
  ],
  imports: [
    IonicPageModule.forChild(Pdb13detail1Page),
    PipesModule
  ],
})
export class Pdb13detail1PageModule {}
