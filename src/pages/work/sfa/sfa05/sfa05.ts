import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ApiProvider } from '../../../../providers/api';
import { AlertProvider } from '../../../../providers/alert';

/**
 * Generated class for the Sfa05Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sfa05',
  templateUrl: 'sfa05.html',
})
export class SFA05 {
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
  public date_fr;
  public date_to;
  public dptno;
  public dptnm;
  public cust_cd;
  public cust_nm;

  /* 조회결과 */
  public result1; //상세현황
  public result2; //거래처별
  public result3; //부서별

  /* 탭 페이지 */
  public Tab1 = "1";
  public Tab2;
  public Tab3;

  constructor(
              public navCtrl: NavController,
              public navParams: NavParams,
              public storage: Storage,
              public modalController: ModalController,
              public alertProvider: AlertProvider,
              public apiProvider: ApiProvider) {

              this.storage.get("[PAGE_AUTH]").then((data) => {
                for(var n in data){
                  if("SFA05" == data[n].PGM_ID){
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
    console.log('ionViewDidLoad Sfa05Page');
  }


  condition_yn(yn){
    if(yn === ''){
      this.date_fr = "";
      this.date_to = "";
      this.dptno = "";
      this.dptnm = "";
      this.cust_cd = "";
      this.cust_nm = "";
    }
    this.searchCondition = yn;
  }


  //조회조건 부서 초기화
  Clear_Dept(){
    this.dptno = null;
    this.dptnm = null;
  }

  //조회조건 거래처 초기화
  Clear_buyer(){
    this.cust_cd = null;
    this.cust_nm = null;
  }


  //부서 팝업
  getDept_popup(){
    var modal = this.modalController.create('PopupDeptPage');
    modal.onDidDismiss(data => {
      this.dptno = data.dept_cd;
      this.dptnm = data.dept_nm;
    });
    modal.present();
  }

  //거래처 팝업
  getBuyer_popup(){
    var modal = this.modalController.create('PopupBuyerPage');
    modal.onDidDismiss(data => {
      this.cust_cd = data.by_cd;
      this.cust_nm = data.by_nm;
    });
    modal.present();
  }


  //조회
  retrive(){

    //상세현황
    let api_url1 = "/sfa/sfa05_list1";
    let param1 = JSON.stringify({company_cd: this.company_cd, plant_cd: this.plant_cd, date_fr: this.date_fr, date_to: this.date_to, dptno: this.dptno, cust_cd: this.cust_cd});

    this.apiProvider.data_api(api_url1, param1)
    .then(data => {
      if(Object.keys(data).length === 0){
        if(this.Tab1 === "1"){
          this.alertProvider.call_alert("조회", "검색결과가 없습니다.", "확인");
        }
      }else{
        this.searchCondition = "";
      }
      this.result1 = data;
    });

    //거래처별
    let api_url2 = "/sfa/sfa05_list2";
    let param2 = JSON.stringify({company_cd: this.company_cd, plant_cd: this.plant_cd, date_fr: this.date_fr, date_to: this.date_to, dptno: this.dptno, cust_cd: this.cust_cd});

    this.apiProvider.data_api(api_url2, param2)
    .then(data => {
      if(Object.keys(data).length === 0){
        if(this.Tab2 === "2"){
          this.alertProvider.call_alert("조회", "검색결과가 없습니다.", "확인");
        }
      }else{
        this.searchCondition = "";
      }
      this.result2 = data;
    });

    //부서별
    let api_url3 = "/sfa/sfa05_list3";
    let param3 = JSON.stringify({company_cd: this.company_cd, plant_cd: this.plant_cd, date_fr: this.date_fr, date_to: this.date_to, dptno: this.dptno, cust_cd: this.cust_cd});

    this.apiProvider.data_api(api_url3, param3)
    .then(data => {
      if(Object.keys(data).length === 0){
        if(this.Tab3 === "3"){
          this.alertProvider.call_alert("조회", "검색결과가 없습니다.", "확인");
        }
      }else{
        this.searchCondition = "";
      }
      this.result3 = data;
    });
  }

  //탭페이지 전환
  changeTab(showIdx){
    if(showIdx === "1"){
      this.Tab1 = showIdx;
      this.Tab2 = "";
      this.Tab3 = "";
    }else if(showIdx === "2"){
      this.Tab2 = showIdx;
      this.Tab1 = "";
      this.Tab3 = "";
    }else if(showIdx === "3"){
      this.Tab3 = showIdx;
      this.Tab1 = "";
      this.Tab2 = "";
    }
  }



}
