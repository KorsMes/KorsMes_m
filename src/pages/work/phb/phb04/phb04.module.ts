import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PHB04 } from './phb04';

import { PipesModule } from '../../../../pipes/pipes.module';

import {HideFabOnscrollModule} from 'ionic-hide-fab-onscroll';

@NgModule({
  declarations: [
    PHB04,
  ],
  imports: [
    IonicPageModule.forChild(PHB04),
    PipesModule,
    HideFabOnscrollModule
  ],
})
export class Phb04PageModule {}
