import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { AlertProvider } from '../../../providers/alert';
import { ApiProvider } from '../../../providers/api';

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
                public modalController: ModalController) {

                this.storage.get("[COMPANY]").then((data1) => {
                  this.company_cd = data1.company_cd;
                  this.storage.get("[PLANT]").then((data2) => {
                    this.plant_cd = data2.plant_cd;

                    let api_url = "/sea/sea12_list1";
                    let param = JSON.stringify({company_cd: this.company_cd, plant_cd: this.plant_cd});

                    this.apiProvider.data_api(api_url, param)
                    .then(data => {
                      this.result = data;
                    });
                  });
                });




  }

  ionViewDidLoad() {
    this.storage.get("[USERINFO]").then((result) => {
      if(result !== null){
        this.userInfo = result;
      }else{
        this.navController.setRoot(HomePage);
      }
    });
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
