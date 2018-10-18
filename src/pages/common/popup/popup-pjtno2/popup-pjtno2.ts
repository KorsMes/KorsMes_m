import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ApiProvider } from '../../../../providers/api';
import { AlertProvider } from '../../../../providers/alert';
import { CommoncodeProvider } from '../../../../providers/commoncode';

/**
 * Generated class for the PopupPjtno2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-popup-pjtno2',
  templateUrl: 'popup-pjtno2.html',
})
export class PopupPjtno2Page {

  public date = new Date();

  //조회조건
  public g_user;
  public g_company; //회사정보
  public g_plant; //공장정보

  public plant_cd;

  public pjtno_fr = new Date().getUTCFullYear()+"-"+"01-01"; //PJT BOM확정일fr
  public pjtno_to = new Date().toISOString(); //PJT BOM확정일to

  //조회결과
  public result;

  constructor(
              public navCtrl: NavController,
              public navParams: NavParams,
              public viewController: ViewController,
              public apiProvider: ApiProvider,
              public alertProvider: AlertProvider,
              public commoncodeProvider: CommoncodeProvider,
              public modalController: ModalController,
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
    console.log('ionViewDidLoad PopupPjtno2Page');
  }


  //조회
  retrive(){
    //필수 조회조건 체크
    if(this.pjtno_fr > this.pjtno_to){
      this.alertProvider.call_alert("조회", "PJT BOM 확정일, 시작일보다 종료일이 작습니다.", "확인");
      return;
    }

    let api_url = "/common/popup/pjtno_list2";
    let param = JSON.stringify({company_cd: this.g_company[0].COMPANY, plant_cd: this.plant_cd, pjtno_fr: this.pjtno_fr, pjtno_to: this.pjtno_to, c_code: this.g_user.c_code});
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
      pjtno: selData.PDTNO,
      pjtnm: selData.PJTNO_NM
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
