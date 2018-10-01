import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { AlertProvider } from '../../../providers/alert';
import { ApiProvider } from '../../../providers/api';


import { MainTemplatePage } from '../main-template/main-template';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  user_id: string;
  user_pswd: string;

  constructor(
              public navController: NavController,
              public alertProvider: AlertProvider,
              public apiProvider: ApiProvider,
              public storage: Storage) {}

  ionViewDidLoad() {
    /*this.storage.get("[USERINFO]").then((result) => {
      if(result !== null){
        this.navController.setRoot(MainTemplatePage);
      }
    });*/
  }


  doLogin(){
    if(this.user_id == null || this.user_id == "" || this.user_pswd == null || this.user_pswd == ""){
      this.user_id = null;
      this.user_pswd = null;
      this.alertProvider.call_alert("로그인", "아이디/패스워드를 입력해주세요.", "확인");
      return;
    }

    let api_url = "/common/doLogin";
    let param = JSON.stringify({user_id: this.user_id, user_pswd: this.user_pswd});
    this.apiProvider.data_api(api_url, param)
    .then(data => {
      if(Object.keys(data).length === 0){
        this.user_id = "";
        this.user_pswd = "";

        this.alertProvider.call_alert("로그인", "로그인실패", "확인");
      }else{

        this.storage.set('[USERINFO]', data[0]);

        this.storage.set('[COMPANY]', {company_nm: '(주)한성더스트킹', company_cd: '100'});
        this.storage.set('[PLANT]', {plant_nm: '김포공장', plant_cd: '100'});

        this.user_id = "";
        this.user_pswd = "";
        this.navController.setRoot(MainTemplatePage);

      }

    });


  }

}
