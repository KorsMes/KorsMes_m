import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Content } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ApiProvider } from '../../../../providers/api';
import { AlertProvider } from '../../../../providers/alert';
import { CommoncodeProvider } from '../../../../providers/commoncode';

/**
 * Generated class for the Pha03Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'search_page',
  templateUrl: 'pha03.html',
})
export class PHA03 {
  @ViewChild(Content) content: Content;

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
  public itnbr_cd2; //품목코드from
  public itnbr_nm2; //품목명from
  public itnbr_cd3; //품목코드to
  public itnbr_nm3; //품목명to
  public date1 = new Date().getUTCFullYear()+"-"+"01-01"; //검사일자 from
  public date2 = new Date().toISOString(); //검사일자 to

  /* 조회결과 */
  public result;

  constructor(  public navCtrl: NavController,
                public navParams: NavParams,
                public storage: Storage,
                public modalController: ModalController,
                public alertProvider: AlertProvider,
                public commoncodeProvider: CommoncodeProvider,
                public apiProvider: ApiProvider) {

                //버튼권한
                this.storage.get("[PAGE_AUTH]").then((data) => {
                  for(var n in data){
                    if("PHA03" == data[n].PGM_ID){
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
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Pha03Page');
  }


  //조회조건 전체 초기화
  condition_yn(yn){
    if(yn === ''){
      this.date1 = new Date().getUTCFullYear()+"-"+"01-01";
      this.date2 = new Date().toISOString();

      this.itnbr_cd2 = null;
      this.itnbr_nm2 = null;

      this.itnbr_cd3 = null;
      this.itnbr_nm3 = null;
    }
    this.searchCondition = yn;
  }



  //품목코드 팝업1
  PopupItnbr2(){
    var modal = this.modalController.create('PopupItnbr2Page');
    modal.onDidDismiss(data => {
      this.itnbr_cd2 = data.itnbr_cd2;
      this.itnbr_nm2 = data.itnbr_nm2;
    });
    modal.present();
  }

  //조회조건 품목코드1 초기화
  clear_itnbr2(){
    this.itnbr_cd2 = "";
    this.itnbr_nm2 = "";
  }

  //품목코드 팝업2
  PopupItnbr3(){
    var modal = this.modalController.create('PopupItnbr2Page');
    modal.onDidDismiss(data => {
      this.itnbr_cd3 = data.itnbr_cd2;
      this.itnbr_nm3 = data.itnbr_nm2;
    });
    modal.present();
  }

  //조회조건 품목코드2 초기화
  clear_itnbr3(){
    this.itnbr_cd3 = "";
    this.itnbr_nm3 = "";
  }

 //조회
  retrive(){

    //필수 조회조건 체크
    if(this.date1 > this.date2){
      this.alertProvider.call_alert("조회", "검사일자, 시작일보다 종료일이 작습니다.", "확인");
      return;
    }
    let api_url = "/pha/pha03_list";
    let param = JSON.stringify({company_cd: this.g_company[0].COMPANY, plant_cd: this.plant_cd, insp_date_fr: this.date1, insp_date_to: this.date2, item1: this.itnbr_cd2, item2: this.itnbr_cd3, c_code: this.g_user.c_code});
    this.apiProvider.data_api(api_url, param)
    .then(data => {
      if(Object.keys(data).length === 0){
        this.alertProvider.call_alert("조회", "검색결과가 없습니다.", "확인");
      }else{
        this.result = data;
      }
    });
  }

  scrollToTop() {
    this.content.scrollToTop();
  }
}
