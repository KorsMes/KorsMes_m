import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ApiProvider } from '../../../../providers/api';
import { AlertProvider } from '../../../../providers/alert';
import { CommoncodeProvider } from '../../../../providers/commoncode';

/**
 * Generated class for the Pda12Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pda12',
  templateUrl: 'pda12.html',
})
export class PDA12 {

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
  public user_id; //사번
  public user_nm; //성명

  public cust_cd; //거래처코드
  public cust_nm; //거래처명



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
                  if("PDA12" == data[n].PGM_ID){
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
    console.log('ionViewDidLoad Pda12Page');
  }

  condition_yn(yn){
    if(yn === ''){
      this.user_id = null;
      this.user_nm = null;

      this.cust_cd = null;
      this.cust_nm = null;
    }
    this.searchCondition = yn;
  }

  //조회조건 사용자정보 초기화
  clear_user(){
    this.user_id = null;
    this.user_nm = null;
  }

  //조회조건 거래처 초기화
  clear_buyer(){
    this.cust_cd = null;
    this.cust_nm = null;
  }

  //사용자 팝업
  PopupUser(){
    var modal = this.modalController.create('PopupUserPage');
    modal.onDidDismiss(data => {
      this.user_id = data.user_id;
      this.user_nm = data.user_nm;
    });
    modal.present();
  }

  //거래처 팝업
  PopupBuyer(){
    var modal = this.modalController.create('PopupBuyerPage');
    modal.onDidDismiss(data => {
      this.cust_cd = data.cust_cd;
      this.cust_nm = data.cust_nm;
    });
    modal.present();
  }

  //조회
  retrive(){
    let api_url = "/pda/pda12_list";
    let param = JSON.stringify({user_id: this.user_id, c_code: this.g_user.c_code});

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

}
