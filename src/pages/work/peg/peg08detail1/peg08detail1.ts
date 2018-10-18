import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ApiProvider } from '../../../../providers/api';
import { AlertProvider } from '../../../../providers/alert';
import { CommoncodeProvider } from '../../../../providers/commoncode';

/**
 * Generated class for the Peg08detail1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-peg08detail1',
  templateUrl: 'peg08detail1.html',
})
export class Peg08detail1Page {
  public obj: any = {};

  public commonCode13; //제조사

  constructor(
                public navCtrl: NavController,
                public navParams: NavParams,
                public commoncodeProvider: CommoncodeProvider,
                public alertProvider: AlertProvider,
                public apiProvider: ApiProvider) {
                  this.obj = navParams.get('obj');

                  //제조사 가져오기
                  this.commonCode13 = this.commoncodeProvider.getCommonCode13();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Peg08detail1Page');
  }

  //팝업 닫기
  closemodal(){
    this.navCtrl.pop();
  }
}
