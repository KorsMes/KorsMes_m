import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PHA03 } from './pha03';

import { PipesModule } from '../../../../pipes/pipes.module';

import {HideFabOnscrollModule} from 'ionic-hide-fab-onscroll';

@NgModule({
  declarations: [
    PHA03,
  ],
  imports: [
    IonicPageModule.forChild(PHA03),
    PipesModule,
    HideFabOnscrollModule
  ],
})
export class Pha03PageModule {}
