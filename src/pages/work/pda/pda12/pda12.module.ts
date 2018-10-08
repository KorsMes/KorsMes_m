import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PDA12 } from './pda12';

import { PipesModule } from '../../../../pipes/pipes.module';

@NgModule({
  declarations: [
    PDA12,
  ],
  imports: [
    IonicPageModule.forChild(PDA12),
    PipesModule
  ],
})
export class Pda12PageModule {}
