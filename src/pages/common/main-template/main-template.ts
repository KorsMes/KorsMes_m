import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav, MenuController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { MainPage } from '../main/main';
import { HomePage } from '../home/home';


import { SidemenuListProvider } from '../../../providers/sidemenu-list';
import { AlertProvider } from '../../../providers/alert';
import { ApiProvider } from '../../../providers/api';
import { CommoncodeProvider } from '../../../providers/commoncode';

/**
 * Generated class for the MainTemplatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-main-template',
  templateUrl: 'main-template.html',
})
export class MainTemplatePage {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = MainPage;
  tot_pages: any;
  page_auth: any;
  pages: any;

  user_id: any;

  public userInfo; //로그인정보


  showLevel1 = null;
  showLevel2 = null;


  constructor(
              public navController: NavController,
              public navParams: NavParams,
              public storage: Storage,
              public menuController: MenuController,
              public sidemenuListProvider: SidemenuListProvider,
              public alertProvider: AlertProvider,
              public apiProvider: ApiProvider,
              public commoncodeProvider: CommoncodeProvider) {

              /* 전체 페이지 정보 가져오기 */
              this.pages = sidemenuListProvider.getSideMenus();
              /* 로그인정보 가져오기 */
              this.userInfo = this.commoncodeProvider.getUserInfo();

              /* 페이지 정보 및 권한 정보 가져오기 */
              let api_url = "/common/getMenus";
              let param = JSON.stringify({user_id: this.userInfo.user_id, user_pswd: this.userInfo.user_pswd, c_code: this.userInfo.c_code});
              this.apiProvider.data_api(api_url, param)
              .then(data => {
                this.page_auth = data;

                //프로그램 권한 저장소 저장
                this.storage.remove("[PAGE_AUTH]");
                this.storage.set('[PAGE_AUTH]', data);
              });
  }

  ionViewDidLoad() {
    this.userInfo = this.commoncodeProvider.getUserInfo();
    if(this.userInfo === null){
      this.navController.setRoot(HomePage);
    }
  }

  isLevel1Shown(idx) {
    return this.showLevel1 === idx;
  };

  isLevel2Shown(idx) {
    return this.showLevel2 === idx;
  };

  toggleLevel1(page, idx) {
    if(page.component){
      this.goPage(page);
    }

    if (this.isLevel1Shown(idx)) {
      this.showLevel1 = null;
      this.showLevel2 = null;
    } else {
      this.showLevel1 = idx;
    }
  };

  toggleLevel2(page, idx) {
    if(page.component){
      this.goPage(page);
    }
    if (this.isLevel2Shown(idx)) {
      this.showLevel1 = null;
      this.showLevel2 = null;
    } else {
      this.showLevel1 = idx;
      this.showLevel2 = idx;
    }
  };

  toggleLevel3(page){
    if(page.component){
      this.goPage(page);
    }
  }

  goPage(page){
    var auth_check = false;

    for(var w in this.page_auth){
      if(page.component === this.page_auth[w].PGM_ID){
        //console.log(page.component + " ::: " +this.page_auth[w].PGM_ID);
        auth_check = true;
        //console.log(page.component + " : " + this.page_auth[w].PGM_ID);
      }
    }

    if(auth_check){
      //param : 프로그램 버튼 권한
      //console.log(page.component);
      this.nav.push(page.component);
    }else{
      this.alertProvider.call_alert("접근", page.title + "의 권한이 없습니다.", "확인");
    }
    this.menuController.close();
  }


  /* 로그아웃 */
  doLogout(){
    let confirm = this.alertProvider.call_confirm("로그아웃", "로그아웃 하시겠습니까?", "YES", "NO");
    confirm.present();

    confirm.onDidDismiss((data) => {
      if(data){
        this.storage.clear();
        this.navController.setRoot(HomePage);
      }
    });
  }
}



