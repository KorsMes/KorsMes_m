import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PopupPjtnoPage } from './popup-pjtno';

import { PipesModule } from '../../../../pipes/pipes.module';

@NgModule({
  declarations: [
    PopupPjtnoPage,
  ],
  imports: [
    IonicPageModule.forChild(PopupPjtnoPage),
    PipesModule,
  ],
})
export class PopupPjtnoPageModule {}
