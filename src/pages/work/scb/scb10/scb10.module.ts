import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SCB10 } from './scb10';

import { PipesModule } from '../../../../pipes/pipes.module';

@NgModule({
  declarations: [
    SCB10,
  ],
  imports: [
    IonicPageModule.forChild(SCB10),
    PipesModule
  ],
})
export class Scb10PageModule {}
