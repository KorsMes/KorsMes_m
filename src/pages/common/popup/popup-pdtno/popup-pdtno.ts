import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ApiProvider } from '../../../../providers/api';
import { AlertProvider } from '../../../../providers/alert';

/**
 * Generated class for the PopupPdtnoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-popup-pdtno',
  templateUrl: 'popup-pdtno.html',
})
export class PopupPdtnoPage {

  public date = new Date();

  //조회조건
  public company_cd;
  public plant_cd;
  public pjtno;
  public pjtnm;
  public date1 = new Date(new Date().getFullYear() - 10).toISOString();
  public date2 = new Date().toISOString();

  //조회결과
  public result;

  constructor(
              public navCtrl: NavController,
              public navParams: NavParams,
              public apiProvider: ApiProvider,
              public alertProvider: AlertProvider,
              public viewController: ViewController,
              public storage: Storage) {

              this.storage.get("[COMPANY]").then((data) => {
                this.company_cd = data.company_cd;
              });

              this.storage.get("[PLANT]").then((data) => {
                this.plant_cd = data.plant_cd;
              });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopupPdtnoPage');
  }



  //조회
  retrive(){

    //필수 조회조건 체크
    if(this.date1 > this.date2){
      this.alertProvider.call_alert("조회", "수주일자, 시작일보다 종료일이 작습니다.", "확인");
      return;
    }

    let api_url = "/common/popup/pdtno_list";
    let param = JSON.stringify({company_cd: this.company_cd, plant_cd: this.plant_cd, date1: this.date1, date2: this.date2, pjtno: this.pjtno, pjtnm: this.pjtnm});
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
      pjtno: selData.PJTNO,
      pjtnm: selData.PJTNM
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
