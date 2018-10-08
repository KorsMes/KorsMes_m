import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PHA03 } from './pha03';

import { PipesModule } from '../../../../pipes/pipes.module';

@NgModule({
  declarations: [
    PHA03,
  ],
  imports: [
    IonicPageModule.forChild(PHA03),
    PipesModule
  ],
})
export class Pha03PageModule {}
