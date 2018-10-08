import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ApiProvider } from '../../../../providers/api';
import { AlertProvider } from '../../../../providers/alert';
import { CommoncodeProvider } from '../../../../providers/commoncode';

/**
 * Generated class for the Pdh04Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pdh04',
  templateUrl: 'pdh04.html',
})
export class PDH04 {

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
  public pdtno1;
  public pdtnm1;

  public pdtno2;
  public pdtnm2;

  /* 조회결과 */
  public result;


  constructor(
              public navCtrl: NavController,
              public navParams: NavParams,
              public storage: Storage,
              public modalController: ModalController,
              public commoncodeProvider: CommoncodeProvider,
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

              //로그인정보 가져오기
              this.g_user = this.commoncodeProvider.getUserInfo();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Pdh04Page');
  }


  condition_yn(yn){
    if(yn === ''){
      this.pdtno1 = null;
      this.pdtnm1 = null;

      this.pdtno2 = null;
      this.pdtnm2 = null;
    }
    this.searchCondition = yn;
  }

  //조회조건 PDTNO 초기화
  Clear_Pdtnm1(){
    this.pdtno1 = null;
    this.pdtnm1 = null;
  }

  Clear_Pdtnm2(){
    this.pdtno2 = null;
    this.pdtnm2 = null;
  }

  //PDTNO 팝업
  getPdtno_popup1(){
    var modal = this.modalController.create('PopupPdtnoPage');
    modal.onDidDismiss(data => {
      this.pdtno1 = data.pjtno;
      this.pdtnm1 = data.pjtnm;
    });
    modal.present();
  }

  getPdtno_popup2(){
    var modal = this.modalController.create('PopupPdtnoPage');
    modal.onDidDismiss(data => {
      this.pdtno2 = data.pjtno;
      this.pdtnm2 = data.pjtnm;
    });
    modal.present();
  }


}
