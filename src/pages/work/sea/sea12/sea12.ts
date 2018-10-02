import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ApiProvider } from '../../../../providers/api';
import { AlertProvider } from '../../../../providers/alert';

/**
 * Generated class for the Sea12Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sea12',
  templateUrl: 'sea12.html',
})
export class SEA12 {

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
  public cust_cd;
  public cust_nm;
  public dept_cd;
  public dept_nm;
  public opt = "A";

  /* 조회결과 */
  public result1; //상세
  public result2; //업체별
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
                public apiProvider: ApiProvider
                ) {

                this.storage.get("[PAGE_AUTH]").then((data) => {
                  for(var n in data){
                    if("SEA12" == data[n].PGM_ID){
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
    console.log('ionViewDidLoad Sea12Page');
  }

  condition_yn(yn){
    if(yn === ''){
      this.date_fr;
      this.date_to;
      this.cust_cd = "";
      this.cust_nm = "";
      this.dept_cd = "";
      this.dept_nm = "";
      this.opt = "A";
    }
    this.searchCondition = yn;
  }

  //조회조건 부서 초기화
  Clear_Dept(){
    this.dept_cd = null;
    this.dept_nm = null;
  }

  //조회조건 거래처 초기화
  Clear_Buyer(){
    this.cust_cd = null;
    this.cust_nm = null;
  }

  //부서 팝업
  getDept_popup(){
    var modal = this.modalController.create('PopupDeptPage');
    modal.onDidDismiss(data => {
      this.dept_cd = data.dept_cd;
      this.dept_nm = data.dept_nm;
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

    //상세
    let api_url1 = "/sea/sea12_list1";
    let param1 = JSON.stringify({company_cd: this.company_cd, plant_cd: this.plant_cd, date_fr: this.date_fr, date_to: this.date_to, cust_cd: this.cust_cd, dept_cd: this.dept_cd, opt: this.opt});

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

    //업체별
    let api_url2 = "/sea/sea12_list2";
    let param2 = JSON.stringify({company_cd: this.company_cd, plant_cd: this.plant_cd, date_fr: this.date_fr, date_to: this.date_to, cust_cd: this.cust_cd, dept_cd: this.dept_cd, opt: this.opt});

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
    let api_url3 = "/sea/sea12_list3";
    let param3 = JSON.stringify({company_cd: this.company_cd, plant_cd: this.plant_cd, date_fr: this.date_fr, date_to: this.date_to, cust_cd: this.cust_cd, dept_cd: this.dept_cd, opt: this.opt});

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
