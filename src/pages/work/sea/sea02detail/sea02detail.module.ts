import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Sea02detailPage } from './sea02detail';

import { PipesModule } from '../../../../pipes/pipes.module';

@NgModule({
  declarations: [
    Sea02detailPage,
  ],
  imports: [
    IonicPageModule.forChild(Sea02detailPage),
    PipesModule
  ],
})
export class Sea02detailPageModule {}
