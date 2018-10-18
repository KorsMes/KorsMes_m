import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Pec12detail1Page } from './pec12detail1';

import { PipesModule } from '../../../../pipes/pipes.module';

@NgModule({
  declarations: [
    Pec12detail1Page,
  ],
  imports: [
    IonicPageModule.forChild(Pec12detail1Page),
    PipesModule
  ],
})
export class Pec12detail1PageModule {}
