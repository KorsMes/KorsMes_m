import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PopupTaskPage } from './popup-task';

@NgModule({
  declarations: [
    PopupTaskPage,
  ],
  imports: [
    IonicPageModule.forChild(PopupTaskPage),
  ],
})
export class PopupTaskPageModule {}
