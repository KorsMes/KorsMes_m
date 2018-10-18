import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ApiProvider } from '../../../../providers/api';
import { AlertProvider } from '../../../../providers/alert';
import { CommoncodeProvider } from '../../../../providers/commoncode';

/**
 * Generated class for the PopupPjtnoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-popup-pjtno',
  templateUrl: 'popup-pjtno.html',
})
export class PopupPjtnoPage {

  //조회조건 : 상태 리스트
  public status_list;

  public date = new Date();

  //조회조건
  public g_user;
  public g_company; //회사정보
  public cust_cd;
  public cust_nm;
  public date1 = new Date().getUTCFullYear()+"-"+"01-01"; //견적의뢰일자fr
  public date2 = new Date().toISOString(); //견적의뢰일자to
  public status = 0;
  public user;
  public user_1;
  public balju;
  public balju_1;

  public tmp_status;


  //조회결과
  public result;

  //return 값
  public pjtno;
  public pjtnm;

  constructor(
                public navCtrl: NavController,
                public navParams: NavParams,
                public viewController: ViewController,
                public apiProvider: ApiProvider,
                public alertProvider: AlertProvider,
                public commoncodeProvider: CommoncodeProvider,
                public modalController: ModalController,
                public storage: Storage) {

                //로그인정보 가져오기
                this.g_user = this.commoncodeProvider.getUserInfo();

                //회사코드 가져오기
                this.g_company = this.commoncodeProvider.getCompanyInfo();

                let api_url = "/common/component/getStatus";
                let param = JSON.stringify({c_code: this.g_user.c_code});
                this.apiProvider.data_api(api_url, param)
                .then(data => {
                  this.status_list = data;
                });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopupPjtnoPage');
  }


  //조회조건 담당자 초기화
  clear_user(){
    this.user = null;
    this.user_1 = null;
  }

  //담당자 팝업
  PopupUser(){
    var modal = this.modalController.create('PopupUserPage');
    modal.onDidDismiss(data => {
      this.user = data.user_id;
      this.user_1 = data.user_nm;
    });
    modal.present();
  }



  //조회조건 발주처 초기화
  clear_buyer(){
    this.balju = null;
    this.balju_1 = null;
  }

  //발주처 팝업
  PopupBuyer(){
    var modal = this.modalController.create('PopupBuyerPage');
    modal.onDidDismiss(data => {
      this.balju = data.cust_cd;
      this.balju_1 = data.cust_nm;
    });
    modal.present();
  }

  //조회
  retrive(){

    //필수 조회조건 체크
    if(this.date1 > this.date2){
      this.alertProvider.call_alert("조회", "견적의뢰일자, 시작일보다 종료일이 작습니다.", "확인");
      return;
    }

    if(this.status == 0){
      this.tmp_status = "";
    }else{
      this.tmp_status = this.status;
    }

    let api_url = "/common/popup/pjtno_list";
    let param = JSON.stringify({user: this.user, date1: this.date1, date2: this.date2, status: this.tmp_status, balju: this.balju, pjtno: this.cust_cd, pjtnm: this.cust_nm, company_cd: this.g_company[0].COMPANY, c_code: this.g_user.c_code});
    this.apiProvider.data_api(api_url, param)
    .then(data => {
      if(Object.keys(data).length === 0){
        this.alertProvider.call_alert("조회", "검색결과가 없습니다.", "확인");
      }
      this.result = data;
    });
  }

  //리스트 선택 시
  selectItem(selData){
    let data = {
      pjtno: selData.PJTNO,
      pjtnm: selData.PJTNM
    }
    this.viewController.dismiss(data);
  }

  //팝업 닫기
  closeModal(){
    let data = {
      pjtno : '',
      pjtnm : ''
    }
    this.viewController.dismiss(data);
  }

}
