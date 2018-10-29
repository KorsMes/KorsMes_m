import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ApiProvider } from '../../../../providers/api';
import { AlertProvider } from '../../../../providers/alert';
import { CommoncodeProvider } from '../../../../providers/commoncode';

/**
 * Generated class for the Peg01detail1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'detail_page',
  templateUrl: 'peg01detail1.html',
})
export class Peg01detail1Page {
  public obj: any = {};

  public commonCode1; //단위
  public commonCode28; //품목구분

  constructor(
                public navCtrl: NavController,
                public navParams: NavParams,
                public commoncodeProvider: CommoncodeProvider,
                public alertProvider: AlertProvider,
                public apiProvider: ApiProvider) {
                  this.obj = navParams.get('obj');

                  //단위 가져오기
                  this.commonCode1 = this.commoncodeProvider.getCommonCode1();
                  //품목구분 가져오기
                  this.commonCode28 = this.commoncodeProvider.getCommonCode28();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Peg01detail1Page');
  }

  //팝업 닫기
  closemodal(){
    this.navCtrl.pop();
  }

}
