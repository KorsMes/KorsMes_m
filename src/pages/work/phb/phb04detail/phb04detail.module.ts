import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Phb04detailPage } from './phb04detail';

import { PipesModule } from '../../../../pipes/pipes.module';

@NgModule({
  declarations: [
    Phb04detailPage,
  ],
  imports: [
    IonicPageModule.forChild(Phb04detailPage),
    PipesModule
  ],
})
export class Phb04detailPageModule {}
