import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ApiProvider } from '../../../../providers/api';
import { AlertProvider } from '../../../../providers/alert';
import { CommoncodeProvider } from '../../../../providers/commoncode';

/**
 * Generated class for the Sea02detailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sea02detail',
  templateUrl: 'sea02detail.html',
})
export class Sea02detailPage {
  public obj: any = {};

  public g_user;

  public commonCode13; //거래처
  public commonCode14; //영업부서
  public commonCode15; //영업담당
  public commonCode38; //설치지역
  public commonCode39; //생산구분
  public commonCode40; //주문구분
  public commonCode41; //계약유무
  public commonCode42; //수주구분
  public commonCode43; //사업구분
  public commonCode44; //결재조건

  //조회결과
  public result;

  constructor(
                public navCtrl: NavController,
                public navParams: NavParams,
                public commoncodeProvider: CommoncodeProvider,
                public alertProvider: AlertProvider,
                public apiProvider: ApiProvider) {

                  //로그인정보 가져오기
                  this.g_user = this.commoncodeProvider.getUserInfo();

                  this.obj = navParams.get('obj');

                  let api_url = "/sea/sea02_detail";
                  let param = JSON.stringify({company_cd: this.obj.COMPANY, plant_cd: this.obj.PLANT, pjtno: this.obj.PJTNO, c_code: this.g_user.c_code});

                  this.apiProvider.data_api(api_url, param)
                  .then(data => {
                    if(Object.keys(data).length === 0){
                      this.alertProvider.call_alert("조회", "검색결과가 없습니다.", "확인");
                    }
                    this.result = data;
                  });

                  //거래처 가져오기
                  this.commonCode13 = this.commoncodeProvider.getCommonCode13();
                  //영업부서 가져오기
                  this.commonCode14 = this.commoncodeProvider.getCommonCode14();
                  //영업담당 가져오기
                  this.commonCode15 = this.commoncodeProvider.getCommonCode15();
                  //설치지역 가져오기
                  this.commonCode38 = this.commoncodeProvider.getCommonCode38();
                  //생산구분 가져오기
                  this.commonCode39 = this.commoncodeProvider.getCommonCode39();
                  //주문구분 가져오기
                  this.commonCode40 = this.commoncodeProvider.getCommonCode40();
                  //계약유무 가져오기
                  this.commonCode41 = this.commoncodeProvider.getCommonCode41();
                  //수주구분 가져오기
                  this.commonCode42 = this.commoncodeProvider.getCommonCode42();
                  //사업구분 가져오기
                  this.commonCode43 = this.commoncodeProvider.getCommonCode43();
                  //결재조건 가져오기
                  this.commonCode44 = this.commoncodeProvider.getCommonCode44();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Sea02detailPage');
  }

  //팝업 닫기
  closemodal(){
    this.navCtrl.pop();
  }

}
