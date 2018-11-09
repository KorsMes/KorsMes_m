import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ApiProvider } from '../../../../providers/api';
import { AlertProvider } from '../../../../providers/alert';
import { CommoncodeProvider } from '../../../../providers/commoncode';

/**
 * Generated class for the Paf06DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'detail_page',
  templateUrl: 'paf06-detail.html',
})
export class PAF06DETAIL {
  public obj: any = {};

  public commonCode1; //단위
  public commonCode2; //조달구분
  public commonCode3; //통화

  constructor(
                public navCtrl: NavController,
                public navParams: NavParams,
                public commoncodeProvider: CommoncodeProvider,
                public alertProvider: AlertProvider,
                public apiProvider: ApiProvider) {
                  this.obj = navParams.get('obj');

                  //단위 가져오기
                  this.commonCode1 = this.commoncodeProvider.getCommonCode1();
                  //조달구분 가져오기
                  this.commonCode2 = this.commoncodeProvider.getCommonCode2();
                  //통화 가져오기
                  this.commonCode3 = this.commoncodeProvider.getCommonCode3();
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad Paf06DetailPage');
  }

  ionViewDidEnter(){
  }

  //팝업 닫기
  closemodal(){
    this.navCtrl.pop();
  }

}
