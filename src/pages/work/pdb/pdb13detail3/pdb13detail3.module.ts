import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Pdb13detail3Page } from './pdb13detail3';

import { PipesModule } from '../../../../pipes/pipes.module';

@NgModule({
  declarations: [
    Pdb13detail3Page,
  ],
  imports: [
    IonicPageModule.forChild(Pdb13detail3Page),
    PipesModule
  ],
})
export class Pdb13detail3PageModule {}
