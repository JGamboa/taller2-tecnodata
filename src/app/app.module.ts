import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { WelcomePageModule } from '../pages/welcome/welcome.module';
import { LoginPageModule } from '../pages/login/login.module';
import { SignupPageModule } from '../pages/signup/signup.module';
import { LugaresPageModule } from "../pages/lugares/lugares.module";
import { LugaresCreatePageModule } from "../pages/lugares-create/lugares-create.module";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { SQLite } from '@ionic-native/sqlite';
import { LugaresService } from '../providers/lugares-service/lugares-service';
import { IonicStorageModule } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';

import { Camera } from '@ionic-native/camera';
import { UserProvider } from '../providers/user/user';
import { ApiProvider } from '../providers/api/api';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';



@NgModule({
  declarations: [
        MyApp,
        HomePage,
        ListPage,
  ],
  imports: [
        BrowserModule,
        HttpClientModule,
        IonicStorageModule.forRoot(),
        IonicModule.forRoot(MyApp),
        LugaresPageModule,
        LugaresCreatePageModule,
        LoginPageModule,
        SignupPageModule,
        WelcomePageModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
      SQLite,
      LugaresService,
      Geolocation,
      Camera,
      UserProvider,
      ApiProvider,
      AuthServiceProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},

  ]
})
export class AppModule {}
