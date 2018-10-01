import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ApiProvider } from '../../../../providers/api';
import { AlertProvider } from '../../../../providers/alert';

/**
 * Generated class for the Pdb13Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pdb13',
  templateUrl: 'pdb13.html',
})
export class PDB13 {

  /* 프로그램 버튼 권한 */
  public acc_btn_add;
  public acc_btn_save;
  public acc_btn_delete;
  public acc_btn_retrive;
  public acc_btn_print;

  /* 조건검색 유무 */
  public searchCondition;

  /* 조건검색 */
  public pjtno1; //PJT번호1
  public pjtnm1; //PJT명1
  public pjtno2; //PJT번호2
  public pjtnm2; //PJT명2
  public purno; //발주번호
  public itnbr_cd2; //품목코드
  public itnbr_nm2; //품목명

  constructor(
                public navCtrl: NavController,
                public navParams: NavParams,
                public storage: Storage,
                public modalController: ModalController,
                public alertProvider: AlertProvider,
                public apiProvider: ApiProvider) {

                this.storage.get("[PAGE_AUTH]").then((data) => {
                  for(var n in data){
                    if("PDB13" == data[n].PGM_ID){
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
    console.log('ionViewDidLoad Pdb13Page');
  }


  condition_yn(yn){
    if(yn === ''){
      this.pjtno1 = null;
      this.pjtnm1 = null;
      this.pjtno2 = null;
      this.pjtnm2 = null;
      this.purno  = null;
    }
    this.searchCondition = yn;
  }


  //조회조건 PJT번호 초기화
  Clear_Pjtno1(){
    this.pjtno1 = null;
    this.pjtnm1= null;
  }

  //PJT번호 팝업
  getPjtno_popup1(){
    var modal = this.modalController.create('PopupPjtno2Page');
    modal.onDidDismiss(data => {
      this.pjtno1 = data.pjtno;
      this.pjtnm1 = data.pjtnm;
    });
    modal.present();
  }


  //조회조건 PJT번호 초기화
  Clear_Pjtno2(){
    this.pjtno2 = null;
    this.pjtnm2 = null;
  }

  //PJT번호 팝업
  getPjtno_popup2(){
    var modal = this.modalController.create('PopupPjtno2Page');
    modal.onDidDismiss(data => {
      this.pjtno2 = data.pjtno;
      this.pjtnm2 = data.pjtnm;
    });
    modal.present();
  }

  //조회조건 발주번호 초기화
  Clear_Purno(){
    this.purno = null;
  }

  //발주번호 팝업
  getPurno_popup(){
    var modal = this.modalController.create('PopupPurnoPage');
    modal.onDidDismiss(data => {
      this.purno = data.purno;
    });
    modal.present();
  }


  //조회조건 품목코드 초기화
  Clear_Itnbr2(){
    this.itnbr_cd2 = "";
    this.itnbr_nm2 = "";
  }

  //품목코드 팝업
  getItnbr2_popup(){
    var modal = this.modalController.create('PopupItnbr2Page');
    modal.onDidDismiss(data => {
      this.itnbr_cd2 = data.itnbr_cd2;
      this.itnbr_nm2 = data.itnbr_nm2;
    });
    modal.present();
  }





}
