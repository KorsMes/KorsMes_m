import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ApiProvider } from '../../../../providers/api';
import { AlertProvider } from '../../../../providers/alert';
import { CommoncodeProvider } from '../../../../providers/commoncode';

/**
 * Generated class for the Pdb13detail4Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pdb13detail4',
  templateUrl: 'pdb13detail4.html',
})
export class Pdb13detail4Page {
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
    console.log('ionViewDidLoad Pdb13detail4Page');
  }

  //팝업 닫기
  closemodal(){
    this.navCtrl.pop();
  }
}
