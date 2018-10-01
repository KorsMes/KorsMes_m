import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { AlertProvider } from '../../../providers/alert';


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

  constructor(
                public navController: NavController,
                public navParams: NavParams,
                public storage: Storage,
                public alertProvider: AlertProvider) {


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
