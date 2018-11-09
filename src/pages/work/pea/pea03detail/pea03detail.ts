import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ApiProvider } from '../../../../providers/api';
import { AlertProvider } from '../../../../providers/alert';
import { CommoncodeProvider } from '../../../../providers/commoncode';

/**
 * Generated class for the Pea03detailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'detail_page',
  templateUrl: 'pea03detail.html',
})
export class Pea03detailPage {
  public obj: any = {};

  public commonCode13; //거래처정보
  public commonCode1; //단위
  public commonCode26; //검사구분
  public commonCode27; //상태

  constructor(
                public navCtrl: NavController,
                public navParams: NavParams,
                public commoncodeProvider: CommoncodeProvider,
                public alertProvider: AlertProvider,
                public apiProvider: ApiProvider) {
                  this.obj = navParams.get('obj');

                  //거래처정보 가져오기
                  this.commonCode13 = this.commoncodeProvider.getCommonCode13();

                  //단위 가져오기
                  this.commonCode1 = this.commoncodeProvider.getCommonCode1();

                  //검사구분 가져오기
                  this.commonCode26 = this.commoncodeProvider.getCommonCode26();

                  //상태 가져오기
                  this.commonCode27 = this.commoncodeProvider.getCommonCode27();
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad Pea03detailPage');
  }

  //팝업 닫기
  closemodal(){
    this.navCtrl.pop();
  }

}
