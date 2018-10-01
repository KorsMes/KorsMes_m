import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ApiProvider } from '../../../../providers/api';
import { AlertProvider } from '../../../../providers/alert';

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
  public cust_cd;
  public cust_nm;
  public date1 = new Date(new Date().getFullYear() - 10).toISOString();
  public date2 = new Date().toISOString();
  public status = 0;
  public user;
  public user_1;
  public balju;
  public balju_1;
  public company_cd;



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
                public modalController: ModalController,
                public storage: Storage) {

                let api_url = "/common/component/getStatus";
                let param = JSON.stringify({a:'abc'});
                this.apiProvider.data_api(api_url, param)
                .then(data => {
                  this.status_list = data;
                });

                this.storage.get("[COMPANY]").then((data) => {
                  this.company_cd = data.company_cd;
                });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopupPjtnoPage');
  }


  //조회조건 담당자 초기화
  Clear_User(){
    this.user = null;
    this.user_1 = null;
  }

  //담당자 팝업
  getUser_popup(){
    var modal = this.modalController.create('PopupUserPage');
    modal.onDidDismiss(data => {
      this.user = data.user_id;
      this.user_1 = data.user_nm;
    });
    modal.present();
  }



  //조회조건 발주처 초기화
  Clear_Balju(){
    this.balju = null;
    this.balju_1 = null;
  }

  //발주처 팝업
  getBalju_popup(){
    var modal = this.modalController.create('PopupBuyerPage');
    modal.onDidDismiss(data => {
      this.balju = data.by_cd;
      this.balju_1 = data.by_nm;
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

    let api_url = "/common/popup/pjtno_list";
    let param = JSON.stringify({user: this.user, date1: this.date1, date2: this.date2, status: this.status, balju: this.balju, pjtno: this.cust_cd, pjtnm: this.cust_nm, company_cd: this.company_cd});
    this.apiProvider.data_api(api_url, param)
    .then(data => {
      if(Object.keys(data).length === 0){
        this.alertProvider.call_alert("조회", "검색결과가 없습니다.", "확인");
      }else{
        this.result = data;
      }
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
