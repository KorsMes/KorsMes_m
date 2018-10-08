import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SFA05 } from './sfa05';

import { PipesModule } from '../../../../pipes/pipes.module';

@NgModule({
  declarations: [
    SFA05,
  ],
  imports: [
    IonicPageModule.forChild(SFA05),
    PipesModule
  ],
})
export class Sfa05PageModule {}
