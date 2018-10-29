import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PEB14 } from './peb14';

import { PipesModule } from '../../../../pipes/pipes.module';

import {HideFabOnscrollModule} from 'ionic-hide-fab-onscroll';

@NgModule({
  declarations: [
    PEB14,
  ],
  imports: [
    IonicPageModule.forChild(PEB14),
    PipesModule,
    HideFabOnscrollModule
  ],
})
export class Peb14PageModule {}
