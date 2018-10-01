import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { ApiProvider } from '../../../../providers/api';
import { AlertProvider } from '../../../../providers/alert';

/**
 * Generated class for the PopupBuyerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-popup-buyer',
  templateUrl: 'popup-buyer.html',
})
export class PopupBuyerPage {

  //조회조건
  public by_cd;
  public by_nm;
  public bu_cd
  public by_prsn;
  public ven_user;
  public use_gubun;

  //조회결과
  public result;

  constructor(
              public navCtrl: NavController,
              public navParams: NavParams,
              public viewController: ViewController,
              public alertProvider: AlertProvider,
              public apiProvider: ApiProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopupBuyerPage');
  }

  //조회
  retrive(){
    let api_url = "/common/popup/buyer";
    let param = JSON.stringify({by_cd: this.by_cd, by_nm: this.by_nm, bu_cd: this.bu_cd, by_prsn: this.by_prsn, ven_user: this.ven_user, use_gubun: this.use_gubun});
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
      by_cd: selData.BY_CD,
      by_nm: selData.BY_NM
    }
    this.viewController.dismiss(data);
  }

  //팝업 닫기
  closeModal(){
    let data = {
      by_cd : '',
      by_nm : ''
    }
    this.viewController.dismiss(data);
  }

}
