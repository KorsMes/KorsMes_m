import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Pdb13detail5Page } from './pdb13detail5';

import { PipesModule } from '../../../../pipes/pipes.module';

@NgModule({
  declarations: [
    Pdb13detail5Page,
  ],
  imports: [
    IonicPageModule.forChild(Pdb13detail5Page),
    PipesModule
  ],
})
export class Pdb13detail5PageModule {}
