import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PDB13 } from './pdb13';

import { PipesModule } from '../../../../pipes/pipes.module';

import {HideFabOnscrollModule} from 'ionic-hide-fab-onscroll';

@NgModule({
  declarations: [
    PDB13,
  ],
  imports: [
    IonicPageModule.forChild(PDB13),
    PipesModule,
    HideFabOnscrollModule
  ],
})
export class Pdb13PageModule {}
