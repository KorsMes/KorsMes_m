import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PopupItnbr2Page } from './popup-itnbr2';

import { PipesModule } from '../../../../pipes/pipes.module';

@NgModule({
  declarations: [
    PopupItnbr2Page,
  ],
  imports: [
    IonicPageModule.forChild(PopupItnbr2Page),
    PipesModule
  ],
})
export class PopupItnbr2PageModule {}
