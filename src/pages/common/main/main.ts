import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { AlertProvider } from '../../../providers/alert';
import { ApiProvider } from '../../../providers/api';
import { CommoncodeProvider } from '../../../providers/commoncode';

import { HomePage } from '../home/home';

/**
 * Generated class for the MainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {
  userInfo: any;
  public companyInfo;
  public g_user;

  /* 조회조건 */
  public company_cd;
  public plant_cd;

  /* 조회결과 */
  public result;

  constructor(
                public navController: NavController,
                public navParams: NavParams,
                public storage: Storage,
                public alertProvider: AlertProvider,
                public apiProvider:ApiProvider,
                public modalController: ModalController,
                public commoncodeProvider: CommoncodeProvider) {

                this.companyInfo = this.commoncodeProvider.getCompanyInfo();
                this.g_user = this.commoncodeProvider.getUserInfo();

                let api_url = "/sea/sea12_list1";
                let param = JSON.stringify({company_cd: this.companyInfo[0].COMPANY, plant_cd:'', c_code: this.g_user});

                this.apiProvider.data_api(api_url, param)
                .then(data => {
                  this.result = data;

                  return;
                });
  }

  ionViewDidLoad() {
    this.userInfo = this.commoncodeProvider.getUserInfo();
    if(this.userInfo === null){
      this.navController.setRoot(HomePage);
    }
  }

  quickPage(page, pagetitle){

    var page_access_check = false;

    this.storage.get("[PAGE_AUTH]").then((result) => {
      for(var w in result){
        if(page === result[w].PGM_ID){
          page_access_check = true;
        }
      }

      if(page_access_check){
        this.navController.push(page);
      }else{
        this.alertProvider.call_alert("접근", pagetitle + "의 권한이 없습니다.", "확인");
      }
    });
  }

}
