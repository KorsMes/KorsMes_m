import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Pda12detailPage } from './pda12detail';

import { PipesModule } from '../../../../pipes/pipes.module';

@NgModule({
  declarations: [
    Pda12detailPage,
  ],
  imports: [
    IonicPageModule.forChild(Pda12detailPage),
    PipesModule
  ],
})
export class Pda12detailPageModule {}
