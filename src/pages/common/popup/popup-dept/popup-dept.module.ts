import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PopupDeptPage } from './popup-dept';

@NgModule({
  declarations: [
    PopupDeptPage,
  ],
  imports: [
    IonicPageModule.forChild(PopupDeptPage),
  ],
})
export class PopupDeptPageModule {}
