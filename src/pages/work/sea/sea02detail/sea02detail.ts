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

  public commonCode37; //견적상태
  public commonCode14; //영업부서
  public commonCode13; //거래처

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
                    }else{
                      this.searchCondition = "";
                    }
                    this.result = data;
                  });

                  //견적상태 가져오기
                  this.commonCode37 = this.commoncodeProvider.getCommonCode37();
                  //영업부서 가져오기
                  this.commonCode14 = this.commoncodeProvider.getCommonCode14();
                  //거래처 가져오기
                  this.commonCode13 = this.commoncodeProvider.getCommonCode13();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Sea02detailPage');
  }

  //팝업 닫기
  closemodal(){
    this.navCtrl.pop();
  }

}
