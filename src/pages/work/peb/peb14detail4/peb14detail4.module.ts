import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Peb14detail4Page } from './peb14detail4';

import { PipesModule } from '../../../../pipes/pipes.module';

@NgModule({
  declarations: [
    Peb14detail4Page,
  ],
  imports: [
    IonicPageModule.forChild(Peb14detail4Page),
    PipesModule
  ],
})
export class Peb14detail4PageModule {}
