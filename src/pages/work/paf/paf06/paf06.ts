import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ApiProvider } from '../../../../providers/api';
import { AlertProvider } from '../../../../providers/alert';

//import { PAF06DETAIL } from '../paf06-detail/paf06-detail';

/**
 * Generated class for the Paf06Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-paf06',
  templateUrl: 'paf06.html',
})
export class PAF06 {

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
  public itnbr;
  public itnbr_nm;

  public by_cd;
  public by_nm;

  /* 조회결과 */
  public result;

  constructor(
                public navController: NavController,
                public navParams: NavParams,
                public storage: Storage,
                public modalController: ModalController,
                public alertProvider: AlertProvider,
                public apiProvider: ApiProvider) {

                this.storage.get("[PAGE_AUTH]").then((data) => {
                  for(var n in data){
                    if("PAF06" == data[n].PGM_ID){
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
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Paf06Page');
  }

  condition_yn(yn){
    if(yn === ''){
      this.itnbr = null;
      this.itnbr_nm = null;

      this.by_cd = null;
      this.by_nm = null;
    }
    this.searchCondition = yn;
  }

  //조회조건 품목코드 초기화
  Clear_itnbr(){
    this.itnbr = null;
    this.itnbr_nm = null;
  }

  //조회조건 협력업체 초기화
  Clear_buyer(){
    this.by_cd = null;
    this.by_nm = null;
  }


  //품목코드 팝업
  getItnbr_popup(){
    var modal = this.modalController.create('PopupItnbrPage');
    modal.onDidDismiss(data => {
      this.itnbr = data.itnbr;
      this.itnbr_nm = data.itnbr_nm;
    });
    modal.present();
  }

  //협력업체 팝업
  getBuyer_popup(){
    var modal = this.modalController.create('PopupBuyerPage');
    modal.onDidDismiss(data => {
      this.by_cd = data.by_cd;
      this.by_nm = data.by_nm;
    });
    modal.present();
  }

  //조회
  retrive(){
    let api_url = "/paf/paf06_list";
    let param = JSON.stringify({itnbr: this.itnbr, by_cd: this.by_cd, company_cd:this.company_cd});

    this.apiProvider.data_api(api_url, param)
    .then(data => {
      if(Object.keys(data).length === 0){
        this.alertProvider.call_alert("조회", "검색결과가 없습니다.", "확인");
      }else{
        this.result = data;
        this.searchCondition = "";
      }
    });
  }

  //상세 프로그램
  /*goDetail(idx){
    console.log(idx);
    this.navController.push('PAF06DETAIL', {
      ilst : this.result,
      index : idx
    });
  }*/

  add(){

  }

  save(){

  }

  delete(){

  }

  print(){

  }

}
