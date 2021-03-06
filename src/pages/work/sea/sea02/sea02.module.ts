import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SEA02 } from './sea02';

import { PipesModule } from '../../../../pipes/pipes.module';

import {HideFabOnscrollModule} from 'ionic-hide-fab-onscroll';

@NgModule({
  declarations: [
    SEA02,
  ],
  imports: [
    IonicPageModule.forChild(SEA02),
    PipesModule,
    HideFabOnscrollModule
  ],
})
export class Sea02PageModule {}
