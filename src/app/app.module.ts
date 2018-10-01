import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';

/* COMMON PAGES */
import { HomePage } from '../pages/common/home/home';
import { MainTemplatePage } from '../pages/common/main-template/main-template';
import { MainPage } from '../pages/common/main/main';

/* WORK TAB PAGES */
import { SEA12TAB1 } from '../pages/work/sea/sea12-tab1/sea12-tab1';
import { SEA12TAB2 } from '../pages/work/sea/sea12-tab2/sea12-tab2';
import { SEA12TAB3 } from '../pages/work/sea/sea12-tab3/sea12-tab3';

import { AlertProvider } from '../providers/alert';
import { ApiProvider } from '../providers/api';
import { SidemenuListProvider } from '../providers/sidemenu-list';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MainTemplatePage,
    MainPage,

    SEA12TAB1,
    SEA12TAB2,
    SEA12TAB3
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MainTemplatePage,
    MainPage,

    SEA12TAB1,
    SEA12TAB2,
    SEA12TAB3
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AlertProvider,
    ApiProvider,
    SidemenuListProvider
  ]
})
export class AppModule {}
