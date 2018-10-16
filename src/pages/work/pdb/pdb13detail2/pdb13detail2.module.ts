import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Pdb13detail2Page } from './pdb13detail2';

import { PipesModule } from '../../../../pipes/pipes.module';

@NgModule({
  declarations: [
    Pdb13detail2Page,
  ],
  imports: [
    IonicPageModule.forChild(Pdb13detail2Page),
    PipesModule
  ],
})
export class Pdb13detail2PageModule {}
