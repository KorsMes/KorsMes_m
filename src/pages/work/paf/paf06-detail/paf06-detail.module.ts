import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PAF06DETAIL } from './paf06-detail';

import { PipesModule } from '../../../../pipes/pipes.module';

@NgModule({
  declarations: [
    PAF06DETAIL,
  ],
  imports: [
    IonicPageModule.forChild(PAF06DETAIL),
    PipesModule
  ],
})
export class Paf06DetailPageModule {}
