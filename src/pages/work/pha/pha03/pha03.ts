import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ApiProvider } from '../../../../providers/api';
import { AlertProvider } from '../../../../providers/alert';

/**
 * Generated class for the Pha03Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-pha03',
  templateUrl: 'pha03.html',
})
export class PHA03 {

  /* 프로그램 버튼 권한 */
  public acc_btn_add;
  public acc_btn_save;
  public acc_btn_delete;
  public acc_btn_retrive;
  public acc_btn_print;

  /* 조건검색 유무 */
  public searchCondition;

  /* 조건검색 */
  public company_cd;
  public plant_cd;
  public itnbr_cd2;
  public itnbr_nm2;
  public itnbr_cd3;
  public itnbr_nm3;

  public date1 = new Date(new Date().setYear(2017)).toISOString();   //검사일자 from
  //public date1 = new Date(new Date().setDate(1)).toISOString();  //검사일자 from
  //public date1 = new Date(new Date().setMonth(0)).toISOString();  //검사일자 from
  //public date1 = new Date(new Date().getFullYear() -1).toISOString();  //검사일자 from
  public date2 = new Date().toISOString();      //검사일자 to

  /* 조회결과 */
  public result;

  constructor(  public navCtrl: NavController,
                public navParams: NavParams,
                public storage: Storage,
                public modalController: ModalController,
                public alertProvider: AlertProvider,
                public apiProvider: ApiProvider) {

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

                this.storage.get("[COMPANY]").then((data) => {
                    this.company_cd = data.company_cd;
                });
                this.storage.get("[PLANT]").then((data) => {
                    this.plant_cd = data.plant_cd;
                });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Pha03Page');
  }


  condition_yn(yn){
    if(yn === ''){
      this.itnbr_cd2 = null;
      this.itnbr_nm2 = null;

      this.itnbr_cd3 = null;
      this.itnbr_nm3 = null;
    }
    this.searchCondition = yn;
  }



  //품목코드 팝업1
  getItnbr2_popup(){
    var modal = this.modalController.create('PopupItnbr2Page');
    modal.onDidDismiss(data => {
      this.itnbr_cd2 = data.itnbr_cd2;
      this.itnbr_nm2 = data.itnbr_nm2;
    });
    modal.present();
  }

  //조회조건 품목코드1 초기화
  Clear_Itnbr2(){
    this.itnbr_cd2 = "";
    this.itnbr_nm2 = "";
  }

  //품목코드 팝업2
  getItnbr3_popup(){
    var modal = this.modalController.create('PopupItnbr2Page');
    modal.onDidDismiss(data => {
      this.itnbr_cd3 = data.itnbr_cd2;
      this.itnbr_nm3 = data.itnbr_nm2;
    });
    modal.present();
  }

  //조회조건 품목코드2 초기화
  Clear_Itnbr3(){
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
    let param = JSON.stringify({company_cd: this.company_cd, plant_cd: this.plant_cd, insp_date_fr: this.date1, insp_date_to: this.date2, item1: this.itnbr_cd2, item2: this.itnbr_cd3} );
    this.apiProvider.data_api(api_url, param)
    .then(data => {
      if(Object.keys(data).length === 0){
        this.alertProvider.call_alert("조회", "검색결과가 없습니다.", "확인");
      }else{
        this.result = data;
      }
    });
  }

}
