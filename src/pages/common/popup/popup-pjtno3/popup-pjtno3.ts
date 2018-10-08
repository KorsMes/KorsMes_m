import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ApiProvider } from '../../../../providers/api';
import { AlertProvider } from '../../../../providers/alert';
import { CommoncodeProvider } from '../../../../providers/commoncode';

/**
 * Generated class for the PopupPjtno3Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-popup-pjtno3',
  templateUrl: 'popup-pjtno3.html',
})
export class PopupPjtno3Page {

  public date = new Date();

  //조회조건
  public g_user;
  public g_company; //회사정보
  public g_plant; //공장정보

  public plant_cd;

  public ym_fr = new Date().getUTCFullYear()+"-"+"01-01"; //견적의뢰일자fr
  public ym_to = new Date().toISOString(); //견적의뢰일자to

  //조회결과
  public result;

  constructor(
                public navCtrl: NavController,
                public navParams: NavParams,
                public viewController: ViewController,
                public apiProvider: ApiProvider,
                public alertProvider: AlertProvider,
                public commoncodeProvider: CommoncodeProvider,
                public storage: Storage) {

                //로그인정보 가져오기
                this.g_user = this.commoncodeProvider.getUserInfo();

                //회사코드 가져오기
                this.g_company = this.commoncodeProvider.getCompanyInfo();

                //공장코드 가져오기
                this.g_plant = this.commoncodeProvider.getPlantInfo();
                this.plant_cd = this.g_plant[0].PLANT;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopupPjtno3Page');
  }


  //조회
  retrive(){
    //필수 조회조건 체크
    if(this.ym_fr > this.ym_to){
      this.alertProvider.call_alert("조회", "Q.C 검사일, 시작년월보다 종료년월이 작습니다.", "확인");
      return;
    }

    let api_url = "/common/popup/pjtno_list3";
    let param = JSON.stringify({company_cd: this.g_company[0].COMPANY, plant_cd: this.plant_cd, ym_fr: this.ym_fr, ym_to: this.ym_to, c_code: this.g_user.c_code});
    this.apiProvider.data_api(api_url, param)
    .then(data => {
      if(Object.keys(data).length === 0){
        this.alertProvider.call_alert("조회", "검색결과가 없습니다.", "확인");
      }else{
        this.result = data;
      }
    });
  }

  //리스트 선택 시
  selectItem(selData){
    let data = {
      pjtno: selData.MO_NO,
      pjtnm: selData.PJT_NM
    }
    this.viewController.dismiss(data);
  }

  //팝업 닫기
  closeModal(){
    let data = {
      pjtno : '',
      pjtnm : ''
    }
    this.viewController.dismiss(data);
  }

}
