import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PopupBuyerPage } from './popup-buyer';

@NgModule({
  declarations: [
    PopupBuyerPage,
  ],
  imports: [
    IonicPageModule.forChild(PopupBuyerPage),
  ],
})
export class PopupBuyerPageModule {}
