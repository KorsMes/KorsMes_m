import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MainTemplatePage } from './main-template';

@NgModule({
  declarations: [
    MainTemplatePage,
  ],
  imports: [
    IonicPageModule.forChild(MainTemplatePage),
  ],
})
export class MainTemplatePageModule {}
