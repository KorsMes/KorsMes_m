import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ApiProvider } from '../../../../providers/api';
import { AlertProvider } from '../../../../providers/alert';
import { CommoncodeProvider } from '../../../../providers/commoncode';

/**
 * Generated class for the PopupItnbr2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'popup_page',
  templateUrl: 'popup-itnbr2.html',
})
export class PopupItnbr2Page {

  //조회조건
  public g_user;
  public g_company; //회사정보

  public itcls_list; //제품군 select box
  public mccod_list; //내외자구분 select box
  public itemtype_list; //품목형태 select box

  public item_cd; //품번
  public jijic; //형명
  public item_nm; //품명
  public itcls_pro; //물품분류
  public spec1; //규격
  public jejos; //제조회사

  public itcls_cd = ""; //제품군
  public mccod_cd = ""; //내외자구분
  public itemtype_cd = ""; //품목형태

  public commonCode1; //단위

  public searchyn;

  //조회결과
  public result;

  /* infiniteScroll */
  public page = 1;

  constructor(
                public navCtrl: NavController,
                public navParams: NavParams,
                public viewController: ViewController,
                public apiProvider: ApiProvider,
                public alertProvider: AlertProvider,
                public modalController: ModalController,
                public commoncodeProvider: CommoncodeProvider,
                public storage: Storage) {


                //로그인정보 가져오기
                this.g_user = this.commoncodeProvider.getUserInfo();

                //회사코드 가져오기
                this.g_company = this.commoncodeProvider.getCompanyInfo();

                //제품군 리스트 select box
                let api_url1 = "/common/component/getItcls";
                let param1 = JSON.stringify({c_code: this.g_user.c_code});
                this.apiProvider.data_api(api_url1, param1)
                .then(data => {
                  this.itcls_list = data;
                });

                //내외자구분 리스트 select box
                let api_url2 = "/common/component/getMccod";
                let param2 = JSON.stringify({c_code: this.g_user.c_code});
                this.apiProvider.data_api(api_url2, param2)
                .then(data => {
                  this.mccod_list = data;
                });

                //품목형태 리스트 select box
                let api_url3 = "/common/component/getItemtype";
                let param3 = JSON.stringify({c_code: this.g_user.c_code});
                this.apiProvider.data_api(api_url3, param3)
                .then(data => {
                  this.itemtype_list = data;
                });

                //단위 가져오기
                this.commonCode1 = this.commoncodeProvider.getCommonCode1();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopupItnbr2Page');
  }




  //조회
  retrive(infiniteScroll){
    if(infiniteScroll === undefined){
      this.page = 1;
    }
    let api_url = "/common/popup/itnbr_list2";
    let param = JSON.stringify({
                                  company_cd: this.g_company[0].COMPANY,
                                  item_nm: this.itnbr_nm,
                                  spec1: this.spec1,
                                  itemtype_cd: this.itemtype_cd,
                                  c_code: this.g_user.c_code,
                                  page: this.page
                               });
                              this.apiProvider.data_api(api_url, param)
                              .then(data => {
                                if(Object.keys(data).length === 0){
                                  this.alertProvider.call_alert("조회", "검색결과가 없습니다.", "확인");
                                }else{
                                  this.searchyn = "";
                                }
                                this.result = data;
                                if (infiniteScroll) {
                                  infiniteScroll.complete();
                                }
                              });

                              //회사코드 가져오기
                              this.g_company = this.commoncodeProvider.getCompanyInfo();
  }

  //로딩 스크롤
  loadMore(infiniteScroll) {
    this.page++;
    this.retrive(infiniteScroll);
  }

  //리스트 선택 시
  selectItem(selData){
    let data = {
      itnbr_cd2: selData.ITNBR,
      itnbr_nm2: selData.NAME
    }
    this.viewController.dismiss(data);
  }

  //팝업 닫기
  closeModal(){
    let data = {
      itnbr_cd2 : '',
      itnbr_nm2 : ''
    }
    this.viewController.dismiss(data);
  }


  searchCondition(){
    if(this.searchyn === "0"){
      this.searchyn = "";
    }else{
      this.searchyn = "0";
    }
  }

}
