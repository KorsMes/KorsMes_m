import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PAF06 } from './paf06';

import { PipesModule } from '../../../../pipes/pipes.module';

import {HideFabOnscrollModule} from 'ionic-hide-fab-onscroll';

@NgModule({
  declarations: [
    PAF06,
  ],
  imports: [
    IonicPageModule.forChild(PAF06),
    PipesModule,
    HideFabOnscrollModule
  ],
})
export class Paf06PageModule {}
