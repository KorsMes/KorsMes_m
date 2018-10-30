import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Pdb13detail6Page } from './pdb13detail6';

import { PipesModule } from '../../../../pipes/pipes.module';

@NgModule({
  declarations: [
    Pdb13detail6Page,
  ],
  imports: [
    IonicPageModule.forChild(Pdb13detail6Page),
    PipesModule
  ],
})
export class Pdb13detail6PageModule {}
