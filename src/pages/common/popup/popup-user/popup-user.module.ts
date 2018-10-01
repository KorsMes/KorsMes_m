import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PopupUserPage } from './popup-user';

@NgModule({
  declarations: [
    PopupUserPage,
  ],
  imports: [
    IonicPageModule.forChild(PopupUserPage),
  ],
})
export class PopupUserPageModule {}
