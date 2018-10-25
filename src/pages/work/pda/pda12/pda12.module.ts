import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PDA12 } from './pda12';

import { PipesModule } from '../../../../pipes/pipes.module';

import {HideFabOnscrollModule} from 'ionic-hide-fab-onscroll';

@NgModule({
  declarations: [
    PDA12,
  ],
  imports: [
    IonicPageModule.forChild(PDA12),
    PipesModule,
    HideFabOnscrollModule
  ],
})
export class Pda12PageModule {}
