import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LugaresPage } from './lugares';

@NgModule({
  declarations: [
    LugaresPage,
  ],
  imports: [
    IonicPageModule.forChild(LugaresPage),
  ],
})
export class LugaresPageModule {}
