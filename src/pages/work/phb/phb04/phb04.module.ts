import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PHB04 } from './phb04';

import { PipesModule } from '../../../../pipes/pipes.module';

@NgModule({
  declarations: [
    PHB04,
  ],
  imports: [
    IonicPageModule.forChild(PHB04),
    PipesModule
  ],
})
export class Phb04PageModule {}
