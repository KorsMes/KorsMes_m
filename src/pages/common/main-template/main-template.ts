import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav, MenuController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { MainPage } from '../main/main';
import { HomePage } from '../home/home';


import { SidemenuListProvider } from '../../../providers/sidemenu-list';
import { AlertProvider } from '../../../providers/alert';
import { ApiProvider } from '../../../providers/api';

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

  showLevel1 = null;
  showLevel2 = null;


  constructor(
              public navController: NavController,
              public navParams: NavParams,
              public storage: Storage,
              public menuController: MenuController,
              public sidemenuListProvider: SidemenuListProvider,
              public alertProvider: AlertProvider,
              public apiProvider: ApiProvider) {

              /* 전체 페이지 정보 가져오기 */
              this.pages = sidemenuListProvider.getSideMenus();

              /* 페이지 정보 및 권한 정보 가져오기 */
              this.storage.get("[USERINFO]").then((result) => {
                let api_url = "/common/getMenus";
                let param = JSON.stringify({user_id: result.USER_ID, user_pswd: result.USER_PSWD});
                this.apiProvider.data_api(api_url, param)
                .then(data => {

                  this.page_auth = data;

                  //프로그램 권한 저장소 저장
                  this.storage.remove("[PAGE_AUTH]");
                  this.storage.set('[PAGE_AUTH]', data);

                  /* 사이드메뉴(페이지&권한 정보) 세팅 */
                  for(var s in this.pages){
                    console.log("메뉴A : " + this.pages[s].title);

                    if(this.pages[s].component !== undefined){
                      for(var w = 0; w < Object.keys(data).length; w++){

                        if(this.pages[s].component === data[w].PAGE){
                          this.pages[s].acc_btn_add = data[w].ACC_BTN_ADD;
                          this.pages[s].acc_btn_save = data[w].ACC_BTN_SAVE;
                          this.pages[s].acc_btn_delete = data[w].ACC_BTN_DELETE;
                          this.pages[s].acc_btn_retrive = data[w].ACC_BTN_RETRIVE;
                          this.pages[s].acc_btn_print = data[w].ACC_BTN_PRINT;
                          //console.log("페이지 : " + this.pages[s].title);
                        }
                      }
                    }

                    if(this.pages[s].subPages !== undefined){
                      for(var t in this.pages[s].subPages){

                        if(this.pages[s].subPages[t].component !== undefined){
                          for(let w = 0; w < Object.keys(data).length; w++){

                            if(this.pages[s].subPages[t].component === data[w].PAGE){
                              this.pages[s].subPages[t].acc_btn_add = data[w].ACC_BTN_ADD;
                              this.pages[s].subPages[t].acc_btn_save = data[w].ACC_BTN_SAVE;
                              this.pages[s].subPages[t].acc_btn_delete = data[w].ACC_BTN_DELETE;
                              this.pages[s].subPages[t].acc_btn_retrive = data[w].ACC_BTN_RETRIVE;
                              this.pages[s].subPages[t].acc_btn_print = data[w].ACC_BTN_PRINT;
                              //console.log("메뉴A - 페이지 : " + this.pages[s].subPages[t].title);
                            }
                          }
                        }

                        if(this.pages[s].subPages[t].thirdPages !== undefined){
                          for(let k in this.pages[s].subPages[t].thirdPages){
                            if(this.pages[s].subPages[t].thirdPages[k].component !== undefined){
                              for(let w = 0; w < Object.keys(data).length; w++){

                                if(this.pages[s].subPages[t].thirdPages[k].component === data[w].PAGE){
                                  this.pages[s].subPages[t].thirdPages[k].acc_btn_add = data[w].ACC_BTN_ADD;
                                  this.pages[s].subPages[t].thirdPages[k].acc_btn_save = data[w].ACC_BTN_SAVE;
                                  this.pages[s].subPages[t].thirdPages[k].acc_btn_delete = data[w].ACC_BTN_DELETE;
                                  this.pages[s].subPages[t].thirdPages[k].acc_btn_retrive = data[w].ACC_BTN_RETRIVE;
                                  this.pages[s].subPages[t].thirdPages[k].acc_btn_print = data[w].ACC_BTN_PRINT;
                                  //console.log("메뉴A - 메뉴B - 페이지 : " + this.pages[s].subPages[t].thirdPages[k].title);
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }

                });
              });




  }

  ionViewDidLoad() {
    this.storage.get("[USERINFO]").then((result) => {
      if(result !== null){
        this.user_id = result.USER_ID;
      }else{
        this.navController.setRoot(HomePage);
      }
    });
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
        console.log(page.component + " ::: " +this.page_auth[w].PGM_ID);
        auth_check = true;
        console.log(page.component + " : " + this.page_auth[w].PGM_ID);
      }
    }

    if(auth_check){
      //param : 프로그램 버튼 권한
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



