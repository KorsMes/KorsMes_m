import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SHB04 } from './shb04';

import { PipesModule } from '../../../../pipes/pipes.module';

import {HideFabOnscrollModule} from 'ionic-hide-fab-onscroll';

@NgModule({
  declarations: [
    SHB04,
  ],
  imports: [
    IonicPageModule.forChild(SHB04),
    PipesModule,
    HideFabOnscrollModule
  ],
})
export class Shb04PageModule {}
