import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Pec12detail2Page } from './pec12detail2';

import { PipesModule } from '../../../../pipes/pipes.module';

@NgModule({
  declarations: [
    Pec12detail2Page,
  ],
  imports: [
    IonicPageModule.forChild(Pec12detail2Page),
    PipesModule
  ],
})
export class Pec12detail2PageModule {}
