import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ApiProvider } from '../../../../providers/api';
import { AlertProvider } from '../../../../providers/alert';
import { CommoncodeProvider } from '../../../../providers/commoncode';

/**
 * Generated class for the Peb14detail1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'detail_page',
  templateUrl: 'peb14detail1.html',
})
export class Peb14detail1Page {
  public obj: any = {};

  public commonCode28; //품목구분
  public commonCode13; //거래처
  public commonCode14; //부서
  public commonCode15; //사용자
  public commonCode29; //입고유형
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

                  //품목구분 가져오기
                  this.commonCode28 = this.commoncodeProvider.getCommonCode28();

                  //거래처 가져오기
                  this.commonCode13 = this.commoncodeProvider.getCommonCode13();

                  //단위 가져오기
                  this.commonCode1 = this.commoncodeProvider.getCommonCode1();

                  //조달구분 가져오기
                  this.commonCode2 = this.commoncodeProvider.getCommonCode2();

                  //입고유형 가져오기
                  this.commonCode29 = this.commoncodeProvider.getCommonCode29();

                  //통화 가져오기
                  this.commonCode3 = this.commoncodeProvider.getCommonCode3();
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad Peb14detail1Page');
  }

  //팝업 닫기
  closemodal(){
    this.navCtrl.pop();
  }
}
