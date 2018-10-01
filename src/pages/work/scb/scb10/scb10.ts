import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ApiProvider } from '../../../../providers/api';
import { AlertProvider } from '../../../../providers/alert';

/**
 * Generated class for the Scb10Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-scb10',
  templateUrl: 'scb10.html',
})
export class SCB10 {

  /* 프로그램 버튼 권한 */
  public acc_btn_add;
  public acc_btn_save;
  public acc_btn_delete;
  public acc_btn_retrive;
  public acc_btn_print;

  /* 조건검색 유무 */
  public searchCondition;

  /* 조건검색 */
  public pjt_no;
  public pjt_nm;

  constructor(
                public navCtrl: NavController,
                public navParams: NavParams,
                public storage: Storage,
                public modalController: ModalController,
                public alertProvider: AlertProvider,
                public apiProvider: ApiProvider) {

                this.storage.get("[PAGE_AUTH]").then((data) => {
                  for(var n in data){
                    if("SCB10" == data[n].PGM_ID){
                      this.acc_btn_add = data[n].ACC_BTN_ADD;
                      this.acc_btn_save = data[n].ACC_BTN_SAVE;
                      this.acc_btn_delete = data[n].ACC_BTN_DELETE;
                      this.acc_btn_retrive = data[n].ACC_BTN_RETRIVE;
                      this.acc_btn_print = data[n].ACC_BTN_PRINT;
                    }
                  }
                });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Scb10Page');
  }


  condition_yn(yn){
    if(yn === ''){
      this.pjt_no = null;
      this.pjt_nm = null;
    }
    this.searchCondition = yn;
  }

  //조회조건 프로젝트번호 초기화
  Clear_Pjtno(){
    this.pjt_no = null;
    this.pjt_nm = null;
  }

  //거래처 팝업
  getPjtno_popup(){
    var modal = this.modalController.create('PopupPjtnoPage');
    modal.onDidDismiss(data => {
      this.pjt_no = data.pjt_no;
      this.pjt_nm = data.pjt_nm;
    });
    modal.present();
  }

  //조회
  retrive(){

  }

}
