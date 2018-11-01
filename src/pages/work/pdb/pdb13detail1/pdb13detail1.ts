import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ApiProvider } from '../../../../providers/api';
import { AlertProvider } from '../../../../providers/alert';
import { CommoncodeProvider } from '../../../../providers/commoncode';

/**
 * Generated class for the Pdb13detail1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'detail_page',
  templateUrl: 'pdb13detail1.html',
})
export class Pdb13detail1Page {
  public obj: any = {};

  public commonCode1; //단위
  public commonCode2; //조달구분
  public commonCode20; //발주형태
  public commonCode21; //지불방법
  public commonCode13; //업체명

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
                //업체명 가져오기
                this.commonCode13 = this.commoncodeProvider.getCommonCode13();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Pdb13detail1Page');
  }

  //팝업 닫기
  closemodal(){
    this.navCtrl.pop();
  }
}
