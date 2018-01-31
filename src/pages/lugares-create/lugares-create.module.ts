import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LugaresCreatePage } from './lugares-create';

@NgModule({
  declarations: [
    LugaresCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(LugaresCreatePage),
  ],
})
export class LugaresCreatePageModule {}
