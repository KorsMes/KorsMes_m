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

import { AlertProvider } from '../providers/alert';
import { ApiProvider } from '../providers/api';
import { SidemenuListProvider } from '../providers/sidemenu-list';
import { CompanyProvider } from '../providers/company';
import { CommoncodeProvider } from '../providers/commoncode';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MainTemplatePage,
    MainPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule,
    HttpModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MainTemplatePage,
    MainPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AlertProvider,
    ApiProvider,
    SidemenuListProvider,
    CompanyProvider,
    CommoncodeProvider
  ],
})
export class AppModule {
}
