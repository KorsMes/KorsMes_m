import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ApiProvider } from '../../../../providers/api';
import { AlertProvider } from '../../../../providers/alert';
import { CommoncodeProvider } from '../../../../providers/commoncode';

/**
 * Generated class for the Pdb13detail6Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'detail_page',
  templateUrl: 'pdb13detail6.html',
})
export class Pdb13detail6Page {
  public obj: any = {};

  public commonCode1; //단위
  public commonCode2; //조달구분
  public commonCode20; //발주형태
  public commonCode21; //지불방법

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
                //발주형태 가져오기
                this.commonCode20 = this.commoncodeProvider.getCommonCode20();
                //지불방법 가져오기
                this.commonCode21 = this.commoncodeProvider.getCommonCode21();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Pdb13detail6Page');
  }

  //팝업 닫기
  closemodal(){
    this.navCtrl.pop();
  }
}
