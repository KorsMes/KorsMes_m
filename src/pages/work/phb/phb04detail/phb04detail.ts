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
  selector: 'detail_page',
  templateUrl: 'phb04detail.html',
})
export class Phb04detailPage {
  public obj: any = {};

  /* 통합코드 */
  public commonCode12; //검사자
  public commonCode31; //조치구분
  public commonCode32; //검사결과
  public commonCode33; //불량항목
  public commonCode34; //검사종류
  public commonCode35; //검사구분
  public commonCode36; //공정

  constructor(
                public navCtrl: NavController,
                public navParams: NavParams,
                public commoncodeProvider: CommoncodeProvider,
                public alertProvider: AlertProvider,
                public apiProvider: ApiProvider) {
                  this.obj = navParams.get('obj');

                  //검사자 가져오기
                  this.commonCode12 = this.commoncodeProvider.getCommonCode12();

                  //조치구분 가져오기
                  this.commonCode31 = this.commoncodeProvider.getCommonCode31();

                  //검사결과 가져오기
                  this.commonCode32 = this.commoncodeProvider.getCommonCode32();

                  //불량항목 가져오기
                  this.commonCode33 = this.commoncodeProvider.getCommonCode33();

                  //검사종류 가져오기
                  this.commonCode34 = this.commoncodeProvider.getCommonCode34();

                  //검사구분 가져오기
                  this.commonCode35 = this.commoncodeProvider.getCommonCode35();

                  //공정 가져오기
                  this.commonCode36 = this.commoncodeProvider.getCommonCode36();
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad Phb04detailPage');
  }

  //팝업 닫기
  closemodal(){
    this.navCtrl.pop();
  }

}
