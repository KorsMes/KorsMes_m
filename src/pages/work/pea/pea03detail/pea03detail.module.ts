import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Pea03detailPage } from './pea03detail';

import { PipesModule } from '../../../../pipes/pipes.module';

@NgModule({
  declarations: [
    Pea03detailPage,
  ],
  imports: [
    IonicPageModule.forChild(Pea03detailPage),
    PipesModule
  ],
})
export class Pea03detailPageModule {}
