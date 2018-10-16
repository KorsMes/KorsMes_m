import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ApiProvider } from '../../../../providers/api';
import { AlertProvider } from '../../../../providers/alert';
import { CommoncodeProvider } from '../../../../providers/commoncode';

/**
 * Generated class for the Shb04detail1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shb04detail1',
  templateUrl: 'shb04detail1.html',
})
export class Shb04detail1Page {
  public obj: any = {};

  public commonCode8; //부서
  public commonCode12; //매출담당
  public commonCode13; //거래처
  public commonCode17; //수금구분
  public commonCode18; //입금구분

  constructor(
                public navCtrl: NavController,
                public navParams: NavParams,
                public commoncodeProvider: CommoncodeProvider,
                public alertProvider: AlertProvider,
                public apiProvider: ApiProvider) {
                  this.obj = navParams.get('obj');

                  //부서 가져오기
                  this.commonCode8 = this.commoncodeProvider.getCommonCode8();
                  //매출담당 가져오기
                  this.commonCode12 = this.commoncodeProvider.getCommonCode12();
                  //거래처 가져오기
                  this.commonCode13 = this.commoncodeProvider.getCommonCode13();
                  //수금구분 가져오기
                  this.commonCode17 = this.commoncodeProvider.getCommonCode17();
                  //입금구분 가져오기
                  this.commonCode18 = this.commoncodeProvider.getCommonCode18();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Shb04detail1Page');
  }

  //팝업 닫기
  closemodal(){
    this.navCtrl.pop();
  }

}
