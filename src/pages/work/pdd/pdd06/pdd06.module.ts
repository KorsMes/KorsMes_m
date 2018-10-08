import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PDD06 } from './pdd06';

import { PipesModule } from '../../../../pipes/pipes.module';

@NgModule({
  declarations: [
    PDD06,
  ],
  imports: [
    IonicPageModule.forChild(PDD06),
    PipesModule
  ],
})
export class Pdd06PageModule {}
