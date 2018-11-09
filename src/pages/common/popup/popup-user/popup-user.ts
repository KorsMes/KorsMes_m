import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';

import { ApiProvider } from '../../../../providers/api';
import { AlertProvider } from '../../../../providers/alert';
import { CommoncodeProvider } from '../../../../providers/commoncode';

/**
 * Generated class for the PopupUserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'popup_page',
  templateUrl: 'popup-user.html',
})
export class PopupUserPage {

  //조회조건
  public g_user;
  public dept_cd; //소속부서
  public dept_nm; //소속부서명칭

  //사용자 조회 결과 (리스트)
  public result;

  constructor(
              public navCtrl: NavController,
              public navParams: NavParams,
              public apiProvider: ApiProvider,
              public alertProvider: AlertProvider,
              public commoncodeProvider: CommoncodeProvider,
              public viewController: ViewController,
              public modalController: ModalController) {

              //로그인정보 가져오기
              this.g_user = this.commoncodeProvider.getUserInfo();
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad PopupUserPage');
  }

  //조회조건 부서코드 초기화
  clear_dept(){
    this.dept_cd = null;
    this.dept_nm = null;
  }

  //부서코드 팝업
  PopupDept(){
    var modal = this.modalController.create('PopupDeptPage');
    modal.onDidDismiss(data => {
      this.dept_cd = data.dept_cd;
      this.dept_nm = data.dept_nm;
    });
    modal.present();
  }

  //조회
  retrive(){
    let api_url = "/common/popup/user_list";
    let param = JSON.stringify({dept_cd : this.dept_cd, c_code: this.g_user.c_code});
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
      user_id: selData.USER_ID,
      user_nm: selData.USER_NM
    }
    this.viewController.dismiss(data);
  }

  //팝업 닫기
  closeModal(){
    let data = {
      user_id : '',
      user_nm : ''
    }
    this.viewController.dismiss(data);
  }

}
