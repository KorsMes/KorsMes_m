import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ApiProvider } from '../../../../providers/api';
import { AlertProvider } from '../../../../providers/alert';

/**
 * Generated class for the PopupItnbrPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-popup-itnbr',
  templateUrl: 'popup-itnbr.html',
})
export class PopupItnbrPage {

  //조회조건 : 품목형태 리스트
  public iform_list;

  //조회조건
  public itnbr = ""; //품목코드
  public itnbr_nm = ""; //품목명칭
  public spec1 = ""; //규격1
  public jijic = ""; //재질/형명
  public iform = ""; // 품목형태
  public company_cd; //회사코드

  //품목코드 조회 결과 (리스트)
  public result;

  constructor(
              public navCtrl: NavController,
              public navParams: NavParams,
              public apiProvider: ApiProvider,
              public alertProvider: AlertProvider,
              public viewController: ViewController,
              public storage: Storage) {

              let api_url = "/common/component/getIform";
              let param = JSON.stringify({a:'abc'});
              this.apiProvider.data_api(api_url, param)
              .then(data => {
                this.iform_list = data;
              });


              this.storage.get("[COMPANY]").then((data) => {
                  this.company_cd = data.company_cd;
              });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopupItnbrPage');
  }

  //조회
  retrive(){
    let api_url = "/common/popup/itnbr";
    let param = JSON.stringify({itnbr: this.itnbr, itnbr_nm: this.itnbr_nm, spec1: this.spec1, jijic: this.jijic, iform: this.iform, company_cd: this.company_cd});
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
      itnbr: selData.ITNBR,
      itnbr_nm: selData.ITDSC
    }
    this.viewController.dismiss(data);
  }

  //팝업 닫기
  closeModal(){
    let data = {
      itnbr : '',
      itnbr_nm : ''
    }
    this.viewController.dismiss(data);
  }


}
