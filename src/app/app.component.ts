import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Storage } from '@ionic/storage';

import { HomePage } from '../pages/common/home/home';
import { MainTemplatePage } from '../pages/common/main-template/main-template';

import { ApiProvider } from '../providers/api';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage: any;

  showRoot = false;


  constructor(
              platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              public storage: Storage,
              public apiProvider: ApiProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      /* 로그인 상태 체크 */
      this.storage.get("[USERINFO]").then((result) => {
        if(result !== null){

          let api_url = "/common/doLogin";
          let param = JSON.stringify({user_id: result.USER_ID, user_pswd: result.USER_PSWD});

          this.apiProvider.data_api(api_url, param)
          .then(data => {
            if(Object.keys(data).length === 0){
              this.storage.clear();
              this.rootPage = HomePage;
            }else{
              this.storage.set('[COMPANY]', {company_nm: '(주)한성더스트킹', company_cd: '100'});
              this.storage.set('[PLANT]', {plant_nm: '김포공장', plant_cd: '100'});
              this.rootPage = MainTemplatePage;
            }
          });

        }else{
          this.rootPage = HomePage;
        }
      });
      this.showRoot = true;
    });
  }

}

