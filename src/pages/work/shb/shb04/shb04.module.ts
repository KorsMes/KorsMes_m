import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SHB04 } from './shb04';

import { PipesModule } from '../../../../pipes/pipes.module';

@NgModule({
  declarations: [
    SHB04,
  ],
  imports: [
    IonicPageModule.forChild(SHB04),
    PipesModule
  ],
})
export class Shb04PageModule {}
