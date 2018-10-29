import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ApiProvider } from '../../../../providers/api';
import { AlertProvider } from '../../../../providers/alert';
import { CommoncodeProvider } from '../../../../providers/commoncode';

/**
 * Generated class for the Pda12detailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'detail_page',
  templateUrl: 'pda12detail.html',
})
export class Pda12detailPage {
  public obj: any = {};

  public commonCode6; //계정과목
  public commonCode15; //사용자
  public commonCode30; //상태

  constructor(
               public navCtrl: NavController,
               public navParams: NavParams,
               public commoncodeProvider: CommoncodeProvider,
               public alertProvider: AlertProvider,
               public apiProvider: ApiProvider) {
                this.obj = navParams.get('obj');

                //계정과목 가져오기
                this.commonCode6 = this.commoncodeProvider.getCommonCode6();
                //사용자 가져오기
                this.commonCode15 = this.commoncodeProvider.getCommonCode15();
                //상태 가져오기
                this.commonCode30 = this.commoncodeProvider.getCommonCode30();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Pda12detailPage');
  }

  //팝업 닫기
  closemodal(){
    this.navCtrl.pop();
  }
}
