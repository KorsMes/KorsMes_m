import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SFA05 } from './sfa05';

import { PipesModule } from '../../../../pipes/pipes.module';

import {HideFabOnscrollModule} from 'ionic-hide-fab-onscroll';

@NgModule({
  declarations: [
    SFA05,
  ],
  imports: [
    IonicPageModule.forChild(SFA05),
    PipesModule,
    HideFabOnscrollModule
  ],
})
export class Sfa05PageModule {}
