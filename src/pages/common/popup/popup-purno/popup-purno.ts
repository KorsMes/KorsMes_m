import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ApiProvider } from '../../../../providers/api';
import { AlertProvider } from '../../../../providers/alert';
import { CommoncodeProvider } from '../../../../providers/commoncode';

/**
 * Generated class for the PopupPurnoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-popup-purno',
  templateUrl: 'popup-purno.html',
})
export class PopupPurnoPage {

  //조회조건
  public g_user;
  public g_company; //회사정보
  public g_plant; //공장정보

  public plant_cd;

  //조회결과
  public result;

  //return값
  public purno;


  constructor(
              public navCtrl: NavController,
              public navParams: NavParams,
              public viewController: ViewController,
              public modalController: ModalController,
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
    console.log('ionViewDidLoad PopupPurnoPage');
  }

  //조회
  retrive(){
    let api_url = "/common/popup/purno_list";
    let param = JSON.stringify({company_cd: this.g_company[0].COMPANY, plant_cd: this.plant_cd, c_code: this.g_user.c_code});
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
      purno: selData.PUR_NO,
    }
    this.viewController.dismiss(data);
  }

  //팝업 닫기
  closeModal(){
    let data = {
      purno : ''
    }
    this.viewController.dismiss(data);
  }

}
