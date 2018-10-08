import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PEA03 } from './pea03';

import { PipesModule } from '../../../../pipes/pipes.module';

@NgModule({
  declarations: [
    PEA03,
  ],
  imports: [
    IonicPageModule.forChild(PEA03),
    PipesModule
  ],
})
export class Pea03PageModule {}
