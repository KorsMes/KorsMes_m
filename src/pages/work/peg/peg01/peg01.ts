import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Content } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ApiProvider } from '../../../../providers/api';
import { AlertProvider } from '../../../../providers/alert';
import { CommoncodeProvider } from '../../../../providers/commoncode';

/**
 * Generated class for the Peg01Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'search_page',
  templateUrl: 'peg01.html',
})
export class PEG01 {
  @ViewChild(Content) content: Content;

  /* 통합코드 */
  public commonCode1; //단위
  public commonCode28; //품목형태


  /* 프로그램 버튼 권한 */
  public acc_btn_add;
  public acc_btn_save;
  public acc_btn_delete;
  public acc_btn_retrive;
  public acc_btn_print;

  /* 조건검색 유무 */
  public searchCondition;

  /* 조건검색 */
  public g_user;
  public g_company; //회사정보
  public g_plant; //공장정보

  public plant_cd;

  public yymm = new Date().toISOString(); //조회년월

  /* 조회결과 */
  public result;

  constructor(
                public navCtrl: NavController,
                public navParams: NavParams,
                public storage: Storage,
                public modalController: ModalController,
                public commoncodeProvider: CommoncodeProvider,
                public alertProvider: AlertProvider,
                public apiProvider: ApiProvider
                ) {

                //버튼권한
                this.storage.get("[PAGE_AUTH]").then((data) => {
                  for(var n in data){
                    if("PEG01" == data[n].PGM_ID){
                      this.acc_btn_add = data[n].ACC_BTN_ADD;
                      this.acc_btn_save = data[n].ACC_BTN_SAVE;
                      this.acc_btn_delete = data[n].ACC_BTN_DELETE;
                      this.acc_btn_retrive = data[n].ACC_BTN_RETRIVE;
                      this.acc_btn_print = data[n].ACC_BTN_PRINT;
                    }
                  }
                });

                //로그인정보 가져오기
                this.g_user = this.commoncodeProvider.getUserInfo();

                //회사코드 가져오기
                this.g_company = this.commoncodeProvider.getCompanyInfo();

                //공장코드 가져오기
                this.g_plant = this.commoncodeProvider.getPlantInfo();
                this.plant_cd = this.g_plant[0].PLANT;

                //단위 가져오기
                this.commonCode1 = this.commoncodeProvider.getCommonCode1();
                //품목형태 가져오기
                this.commonCode28 = this.commoncodeProvider.getCommonCode28();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Peg01Page');
  }


  //조회조건 전체 초기화
  condition_yn(yn){
    if(yn === ''){
      this.yymm = new Date().toISOString();
    }
    this.searchCondition = yn;
  }


  //조회
  retrive(){

    let api_url = "/peg/peg01_list";
    let param = JSON.stringify({company_cd: this.g_company[0].COMPANY, plant_cd: this.plant_cd, yymm: this.yymm, c_code: this.g_user.c_code});

    this.apiProvider.data_api(api_url, param)
    .then(data => {
      if(Object.keys(data).length === 0){
        this.alertProvider.call_alert("조회", "검색결과가 없습니다.", "확인");
      }else{
        this.searchCondition = "";
      }
      this.result = data;
    });

  }

  //상세팝업
  openDetail(obj: any){
    this.modalController.create('Peg01detail1Page', {obj: obj}).present();
  }

  scrollToTop() {
    this.content.scrollToTop();
  }

}
