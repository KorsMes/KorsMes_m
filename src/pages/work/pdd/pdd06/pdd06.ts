import { Component, ViewChild  } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ApiProvider } from '../../../../providers/api';
import { AlertProvider } from '../../../../providers/alert';
import { CommoncodeProvider } from '../../../../providers/commoncode';

//import { Chart } from 'chart.js';

/**
 * Generated class for the Pdd06Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pdd06',
  templateUrl: 'pdd06.html',
})
export class PDD06 {

  /* 프로그램 버튼 권한 */
  public acc_btn_add;
  public acc_btn_save;
  public acc_btn_delete;
  public acc_btn_retrive;
  public acc_btn_print;

  /* 조건검색 */
  public g_user;
  public g_company; //회사정보
  public g_plant; //공장정보
  public plant_cd; //공장코드

  /* 조회결과 */
  public result;

  @ViewChild('barCanvas') barCanvas;

  barChart: any;

  constructor(
              public navCtrl: NavController,
              public navParams: NavParams,
              public storage: Storage,
              public modalController: ModalController,
              public commoncodeProvider: CommoncodeProvider,
              public alertProvider: AlertProvider,
              public apiProvider: ApiProvider) {

              this.storage.get("[PAGE_AUTH]").then((data) => {
                for(var n in data){
                  if("PDD06" == data[n].PGM_ID){
                    this.acc_btn_add = data[n].ACC_BTN_ADD;
                    this.acc_btn_save = data[n].ACC_BTN_SAVE;
                    this.acc_btn_delete = data[n].ACC_BTN_DELETE;
                    this.acc_btn_retrive = data[n].ACC_BTN_RETRIVE;
                    this.acc_btn_print = data[n].ACC_BTN_PRINT;
                  }
                }
              });

              //로그인정보 가져오기
              this.g_user = this.commoncodeProvider.getUserInfo();

              //회사코드 가져오기
              this.g_company = this.commoncodeProvider.getCompanyInfo();

              //공장코드 가져오기
              this.g_plant = this.commoncodeProvider.getPlantInfo();
              this.plant_cd = this.g_plant[0].PLANT;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Pdd06Page');

}
    //조회
    retrive(){
      let api_url = "/pdd/pdd06_list1";
      let param = JSON.stringify({c_code: this.g_user.c_code, company: this.g_company[0].COMPANY, plant: this.plant_cd, user_id: 'MASTER'});

      this.apiProvider.data_api(api_url, param)
      .then(data => {
        if(Object.keys(data).length === 0){
          this.alertProvider.call_alert("조회", "검색결과가 없습니다.", "확인");
        }
        this.result = data;
    });
    }

}
