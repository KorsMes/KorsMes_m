import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ApiProvider } from '../../../../providers/api';
import { AlertProvider } from '../../../../providers/alert';

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
  public company_cd;
  public plant_cd;
  public pjtno_fr = new Date().toISOString();
  public pjtno_to = new Date().toISOString();

  //조회결과
  public result;

  constructor(
              public navCtrl: NavController,
              public navParams: NavParams,
              public viewController: ViewController,
              public apiProvider: ApiProvider,
              public alertProvider: AlertProvider,
              public modalController: ModalController,
              public storage: Storage) {

              this.storage.get("[COMPANY]").then((data) => {
                this.company_cd = data.company_cd;
              });

              this.storage.get("[PLANT]").then((data) => {
                this.plant_cd = data.plant_cd;
              });
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
    let param = JSON.stringify({company_cd: this.company_cd, plant_cd: this.plant_cd, pjtno_fr: this.pjtno_fr, pjtno_to: this.pjtno_to});
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
