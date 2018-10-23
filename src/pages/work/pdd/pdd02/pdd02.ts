import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ApiProvider } from '../../../../providers/api';
import { AlertProvider } from '../../../../providers/alert';
import { CommoncodeProvider } from '../../../../providers/commoncode';

/**
 * Generated class for the Pdd02Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pdd02',
  templateUrl: 'pdd02.html',
})
export class PDD02 {

  /* 프로그램 버튼 권한 */
  public acc_btn_add;
  public acc_btn_save;
  public acc_btn_delete;
  public acc_btn_retrive;
  public acc_btn_print;

  /* 조건검색 유무 */
  public searchCondition;

  /* 조건검색 */
  public g_user;
  public g_company; //회사정보
  public g_plant; //공장정보

  public plant_cd; //공장코드
  public yymm = new Date().toISOString(); //조회년월

  /* 조회결과 */
  public result;
  public result2;

  /*보고내용 header*/
  public gubun_a; //당월 자재 투입 집계
  public gubun_b; //누적 자재 투입 집계
  public gubun_c; //Fail 발생 집계
  public gubun_d; //수주기준 투입비용 집계

  constructor(
                public navCtrl: NavController,
                public navParams: NavParams,
                public storage: Storage,
                public modalController: ModalController,
                public commoncodeProvider: CommoncodeProvider,
                public alertProvider: AlertProvider,
                public apiProvider: ApiProvider
                ) {

                //버튼권한
                this.storage.get("[PAGE_AUTH]").then((data) => {
                  for(var n in data){
                    if("PDD02" == data[n].PGM_ID){
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
    console.log('ionViewDidLoad Pdd02Page');
  }


  //조회조건 전체 초기화
  condition_yn(yn){
    if(yn === ''){
      this.yymm = new Date().toISOString();
    }
    this.searchCondition = yn;
  }

  //조회
  retrive(){
    this.gubun_a = "";
    this.gubun_b = "";
    this.gubun_c = "";
    this.gubun_d = "";

    /* 월말요약 보고서 헤더 조회 */
    let api_url1 = "/pdd/pdd02_list";
    let param1 = JSON.stringify({company_cd:this.g_company[0].COMPANY, c_code: this.g_user.c_code, plant_cd: this.plant_cd, yymm: this.yymm});

    this.apiProvider.data_api(api_url1, param1)
    .then(data => {
      if(Object.keys(data).length === 0){
        this.alertProvider.call_alert("조회", "검색결과가 없습니다.", "확인");
      }
      this.result = data;

      if(this.result.length > 0){
        for(var i=0; i<this.result.length; i++){
          if(this.result[i].GUBUN_GR === "A"){
            this.gubun_a = "a";
          }
          if(this.result[i].GUBUN_GR === "B"){
            this.gubun_b = "b";
          }
          if(this.result[i].GUBUN_GR === "C"){
            this.gubun_c = "c";
          }
          if(this.result[i].GUBUN_GR === "D"){
            this.gubun_d = "d";
          }
        }
      }

    });

    /*월말 요약 보고서 푸터 조회*/
    let api_url2 = "/pdd/pdd02_list2";
    let param2 = JSON.stringify({company_cd:this.g_company[0].COMPANY, c_code: this.g_user.c_code, plant_cd: this.plant_cd, yymm: this.yymm});

    this.apiProvider.data_api(api_url2, param2)
    .then(data => {
      if(Object.keys(data).length === 0){
        this.alertProvider.call_alert("조회", "검색결과가 없습니다.", "확인");
      }
      this.result2 = data;
    });


  }

}
