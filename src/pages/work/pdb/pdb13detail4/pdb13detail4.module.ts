import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Pdb13detail4Page } from './pdb13detail4';

import { PipesModule } from '../../../../pipes/pipes.module';

@NgModule({
  declarations: [
    Pdb13detail4Page,
  ],
  imports: [
    IonicPageModule.forChild(Pdb13detail4Page),
    PipesModule
  ],
})
export class Pdb13detail4PageModule {}
