import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { ApiProvider } from '../../../../providers/api';
import { AlertProvider } from '../../../../providers/alert';
import { CommoncodeProvider } from '../../../../providers/commoncode';

/**
 * Generated class for the PopupDeptPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-popup-dept',
  templateUrl: 'popup-dept.html',
})
export class PopupDeptPage {

  public g_user;

  //소속부서 조회 결과 (리스트)
  public result;

  constructor(
              public navCtrl: NavController,
              public navParams: NavParams,
              public apiProvider: ApiProvider,
              public alertProvider: AlertProvider,
              public commoncodeProvider: CommoncodeProvider,
              public viewController: ViewController) {

              //로그인정보 가져오기
              this.g_user = this.commoncodeProvider.getUserInfo();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopupDeptPage');
  }


  //조회
  retrive(){
    let api_url = "/common/popup/dept_list";
    let param = JSON.stringify({c_code: this.g_user.c_code});
    this.apiProvider.data_api(api_url, param)
           .then(data => {
             if(Object.keys(data).length === 0){
               this.alertProvider.call_alert("조회", "검색결과가 없습니다.", "확인");
             }
             this.result = data;
           });
  }

  //리스트 선택 시
  selectItem(selData){
    let data = {
      dept_cd: selData.DEPT_CD,
      dept_nm: selData.DEPT_NAME
    }
    this.viewController.dismiss(data);
  }

  //팝업 닫기
  closeModal(){
    let data = {
      dept_cd : '',
      dept_nm : '',
    }
    this.viewController.dismiss(data);
  }

}
