import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ApiProvider } from '../../../../providers/api';
import { AlertProvider } from '../../../../providers/alert';
import { CommoncodeProvider } from '../../../../providers/commoncode';

/**
 * Generated class for the Peg08detail3Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-peg08detail3',
  templateUrl: 'peg08detail3.html',
})
export class Peg08detail3Page {
  public obj: any = {};

  constructor(
                public navCtrl: NavController,
                public navParams: NavParams,
                public commoncodeProvider: CommoncodeProvider,
                public alertProvider: AlertProvider,
                public apiProvider: ApiProvider) {
                  this.obj = navParams.get('obj');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Peg08detail3Page');
  }

  //팝업 닫기
  closemodal(){
    this.navCtrl.pop();
  }
}
