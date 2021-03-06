import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PDD02 } from './pdd02';

import { PipesModule } from '../../../../pipes/pipes.module';

import {HideFabOnscrollModule} from 'ionic-hide-fab-onscroll';

@NgModule({
  declarations: [
    PDD02,
  ],
  imports: [
    IonicPageModule.forChild(PDD02),
    PipesModule,
    HideFabOnscrollModule
  ],
})
export class Pdd02PageModule {}
