import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Peb14detail1Page } from './peb14detail1';

import { PipesModule } from '../../../../pipes/pipes.module';

@NgModule({
  declarations: [
    Peb14detail1Page,
  ],
  imports: [
    IonicPageModule.forChild(Peb14detail1Page),
    PipesModule
  ],
})
export class Peb14detail1PageModule {}
