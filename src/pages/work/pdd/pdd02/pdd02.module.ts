import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PDD02 } from './pdd02';

import { PipesModule } from '../../../../pipes/pipes.module';

@NgModule({
  declarations: [
    PDD02,
  ],
  imports: [
    IonicPageModule.forChild(PDD02),
    PipesModule
  ],
})
export class Pdd02PageModule {}
