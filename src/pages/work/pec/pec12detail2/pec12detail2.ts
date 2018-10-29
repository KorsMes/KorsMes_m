import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ApiProvider } from '../../../../providers/api';
import { AlertProvider } from '../../../../providers/alert';
import { CommoncodeProvider } from '../../../../providers/commoncode';

/**
 * Generated class for the Pec12detail2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'detail_page',
  templateUrl: 'pec12detail2.html',
})
export class Pec12detail2Page {
  public obj: any = {};

  public commonCode13; //거래처

  constructor(
                public navCtrl: NavController,
                public navParams: NavParams,
                public commoncodeProvider: CommoncodeProvider,
                public alertProvider: AlertProvider,
                public apiProvider: ApiProvider) {
                  this.obj = navParams.get('obj');

                  //거래처 가져오기
                  this.commonCode13 = this.commoncodeProvider.getCommonCode13();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Pec12detail2Page');
  }

  //팝업 닫기
  closemodal(){
    this.navCtrl.pop();
  }
}
