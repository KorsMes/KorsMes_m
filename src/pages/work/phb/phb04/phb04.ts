import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ApiProvider } from '../../../../providers/api';
import { AlertProvider } from '../../../../providers/alert';

/**
 * Generated class for the Phb04Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-phb04',
  templateUrl: 'phb04.html',
})
export class PHB04 {

  /* 프로그램 버튼 권한 */
  public acc_btn_add;
  public acc_btn_save;
  public acc_btn_delete;
  public acc_btn_retrive;
  public acc_btn_print;

  /* 조건검색 유무 */
  public searchCondition;

  /* 조건검색 */
  public task_cd; //공정코드
  public task_nm; //공정명

  public pjtno; //불합격 PJT번호
  public pjtnm; //불합격 PJT명


  constructor(
                public navCtrl: NavController,
                public navParams: NavParams,
                public storage: Storage,
                public modalController: ModalController,
                public alertProvider: AlertProvider,
                public apiProvider: ApiProvider) {

                this.storage.get("[PAGE_AUTH]").then((data) => {
                  for(var n in data){
                    if("PHD04" == data[n].PGM_ID){
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
    console.log('ionViewDidLoad Phb04Page');
  }


  condition_yn(yn){
    if(yn === ''){
      this.pjtno = null;
      this.pjtnm = null;

      this.task_cd = null;
      this.task_nm = null;
    }
    this.searchCondition = yn;
  }

  //조회조건 불합격PJT번호 정보 초기화
  Clear_Pjtno_list3(){
    this.pjtno = null;
    this.pjtnm = null;
  }

  //불합격PJT번호 팝업
  getPjtno_list3_popup(){
    var modal = this.modalController.create('PopupPjtno3Page');
    modal.onDidDismiss(data => {
      this.pjtno = data.pjtno;
      this.pjtnm = data.pjtnm;
    });
    modal.present();
  }

 //조회조건 공정 정보 초기화
  Clear_Task(){
    this.task_cd = null;
    this.task_nm = null;
  }

  //공정 팝업
  getTask_popup(){
    var modal = this.modalController.create('PopupTaskPage');
    modal.onDidDismiss(data => {
      this.task_cd = data.task_cd;
      this.task_nm = data.task_nm;
    });
    modal.present();
  }

}
