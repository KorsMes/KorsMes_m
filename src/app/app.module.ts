import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';
import { HideFabOnscrollModule } from 'ionic-hide-fab-onscroll';

/* COMMON PAGES */
import { SplashscreenPage } from '../pages/common/splashscreen/splashscreen';
import { HomePage } from '../pages/common/home/home';
import { MainTemplatePage } from '../pages/common/main-template/main-template';
import { MainPage } from '../pages/common/main/main';

import { AlertProvider } from '../providers/alert';
import { ApiProvider } from '../providers/api';
import { SidemenuListProvider } from '../providers/sidemenu-list';
import { CompanyProvider } from '../providers/company';
import { CommoncodeProvider } from '../providers/commoncode';

import { PipesModule } from '../pipes/pipes.module';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MainTemplatePage,
    MainPage,
    SplashscreenPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule,
    HttpModule,
    PipesModule,
    HideFabOnscrollModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MainTemplatePage,
    MainPage,
    SplashscreenPage
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
