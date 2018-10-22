import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ApiProvider } from '../../../../providers/api';
import { AlertProvider } from '../../../../providers/alert';
import { CommoncodeProvider } from '../../../../providers/commoncode';

/**
 * Generated class for the Phb04detailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-phb04detail',
  templateUrl: 'phb04detail.html',
})
export class Phb04detailPage {
  public obj: any = {};

  public commonCode35; //검사구분
  public commonCode36; //공정

  constructor(
                public navCtrl: NavController,
                public navParams: NavParams,
                public commoncodeProvider: CommoncodeProvider,
                public alertProvider: AlertProvider,
                public apiProvider: ApiProvider) {
                  this.obj = navParams.get('obj');

                  //검사구분 가져오기
                  this.commonCode35 = this.commoncodeProvider.getCommonCode35();

                  //공정 가져오기
                  this.commonCode36 = this.commoncodeProvider.getCommonCode36();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Phb04detailPage');
  }

  //팝업 닫기
  closemodal(){
    this.navCtrl.pop();
  }

}
