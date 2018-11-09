import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Content } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ApiProvider } from '../../../../providers/api';
import { AlertProvider } from '../../../../providers/alert';
import { CommoncodeProvider } from '../../../../providers/commoncode';

/**
 * Generated class for the Peg08Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'search_page',
  templateUrl: 'peg08.html',
})
export class PEG08 {
  @ViewChild(Content) content: Content;

  /* 통합코드 */
  public commonCode13; //제조사

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

  public plant_cd;//공장코드

  public m = Math.floor(new Date().getMonth()) + 1;


  public yyyymm = "";
  public yyyymm2 = new Date().toISOString(); //조회년월

  /* 조회결과 */
  public result1; //월별/자재별 수불집계표
  public result2; //월별 금액집계표
  public result3; //마감(전)집계표
  public result4; //마감(후)집계표
  public result5; //실사용 재고리스트
  public result6; //기간별/자재별 수불집계표

  /* 탭 페이지 */
  public Tab1 = "1";
  public Tab2;
  public Tab3;
  public Tab4;
  public Tab5;
  public Tab6;

  /*버튼 색상 변경*/
  buttonColor1: string = '#FFDF24';
  buttonColor2: string = 'white';
  buttonColor3: string = 'white';
  buttonColor4: string = 'white';

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
                    if("PEG08" == data[n].PGM_ID){
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

                //거래처 가져오기
                this.commonCode13 = this.commoncodeProvider.getCommonCode13();

                if(this.m < 10){
                  this.m = 0 + this.m;
                }
                this.yyyymm = new Date().getUTCFullYear() +"-"+ this.m + "-01"; //조회년월
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad Peg08Page');
  }

  //조회조건 전체 초기화
  condition_yn(yn){
    if(yn === ''){
      if(this.m < 10){
        this.m = 0 + this.m;
      }
      this.yyyymm = new Date().getUTCFullYear() +"-"+ this.m + "-01"; //조회년월
      this.yyyymm2 = new Date().toISOString();
    }
    this.searchCondition = yn;
  }


  //조회
  retrive(){
    this.result1 = null;
    this.result2 = null;
    this.result3 = null;
    this.result4 = null;
    this.result5 = null;
    this.result6 = null;

    //월별/자재별 수불집계표
    let api_url1 = "/peg/peg08_list1";
    let param1 = JSON.stringify({company_cd: this.g_company[0].COMPANY, plant_cd: this.plant_cd, yyyymm: this.yyyymm, yyyymm2: this.yyyymm2, c_code: this.g_user.c_code});

    this.apiProvider.data_api(api_url1, param1)
    .then(data => {
      if(Object.keys(data).length === 0){
        if(this.Tab1 === "1"){
          this.alertProvider.call_alert("조회", "검색결과가 없습니다.", "확인");
        }
      }else{
        this.searchCondition = "";
      }
      this.result1 = data;
    });

    //월별 금액집계표
    let api_url2 = "/peg/peg08_list2";
    let param2 = JSON.stringify({company_cd: this.g_company[0].COMPANY, plant_cd: this.plant_cd, yyyymm: this.yyyymm, yyyymm2: this.yyyymm2, c_code: this.g_user.c_code});

    this.apiProvider.data_api(api_url2, param2)
    .then(data => {
      if(Object.keys(data).length === 0){
        if(this.Tab2 === "2"){
          this.alertProvider.call_alert("조회", "검색결과가 없습니다.", "확인");
        }
      }else{
        this.searchCondition = "";
      }
      this.result2 = data;
    });

    //마감(전)집계표
    let api_url3 = "/peg/peg08_list3";
    let param3 = JSON.stringify({company_cd: this.g_company[0].COMPANY, plant_cd: this.plant_cd, yyyymm: this.yyyymm, yyyymm2: this.yyyymm2, c_code: this.g_user.c_code});

    this.apiProvider.data_api(api_url3, param3)
    .then(data => {
      if(Object.keys(data).length === 0){
        if(this.Tab3 === "3"){
          this.alertProvider.call_alert("조회", "검색결과가 없습니다.", "확인");
        }
      }else{
        this.searchCondition = "";
      }
      this.result3 = data;
    });

    //마감(후)집계표
    let api_url4 = "/peg/peg08_list4";
    let param4 = JSON.stringify({company_cd: this.g_company[0].COMPANY, plant_cd: this.plant_cd, yyyymm: this.yyyymm, yyyymm2: this.yyyymm2, c_code: this.g_user.c_code});

    this.apiProvider.data_api(api_url4, param4)
    .then(data => {
      if(Object.keys(data).length === 0){
        if(this.Tab4 === "4"){
          this.alertProvider.call_alert("조회", "검색결과가 없습니다.", "확인");
        }
      }else{
        this.searchCondition = "";
      }
      this.result4 = data;
    });

    //실사용 재고리스트
    let api_url5 = "/peg/peg08_list5";
    let param5 = JSON.stringify({company_cd: this.g_company[0].COMPANY, plant_cd: this.plant_cd, yyyymm: this.yyyymm, yyyymm2: this.yyyymm2, c_code: this.g_user.c_code});

    this.apiProvider.data_api(api_url5, param5)
    .then(data => {
      if(Object.keys(data).length === 0){
        if(this.Tab5 === "5"){
          this.alertProvider.call_alert("조회", "검색결과가 없습니다.", "확인");
        }
      }else{
        this.searchCondition = "";
      }
      this.result5 = data;
    });

    //기간별/자재별 수불집계표
    let api_url6 = "/peg/peg08_list6";
    let param6 = JSON.stringify({company_cd: this.g_company[0].COMPANY, plant_cd: this.plant_cd, yyyymm: this.yyyymm, yyyymm2: this.yyyymm2, c_code: this.g_user.c_code});

    this.apiProvider.data_api(api_url6, param6)
    .then(data => {
      if(Object.keys(data).length === 0){
        if(this.Tab6 === "6"){
          this.alertProvider.call_alert("조회", "검색결과가 없습니다.", "확인");
        }
      }else{
        this.searchCondition = "";
      }
      this.result6 = data;
    });


  }

  //탭페이지 전환
  changeTab(showIdx){
    if(showIdx === "1"){
      this.Tab1 = showIdx;
      this.Tab2 = "";
      this.Tab3 = "";
      this.Tab4 = "";
      this.Tab5 = "";
      this.Tab6 = "";
    }else if(showIdx === "2"){
      this.Tab1 = "";
      this.Tab2 = showIdx;
      this.Tab3 = "";
      this.Tab4 = "";
      this.Tab5 = "";
      this.Tab6 = "";
    }else if(showIdx === "3"){
      this.Tab1 = "";
      this.Tab2 = "";
      this.Tab3 = showIdx;
      this.Tab4 = "";
      this.Tab5 = "";
      this.Tab6 = "";
    }else if(showIdx === "4"){
      this.Tab1 = "";
      this.Tab2 = "";
      this.Tab3 = "";
      this.Tab4 = showIdx;
      this.Tab5 = "";
      this.Tab6 = "";
    }else if(showIdx === "5"){
      this.Tab1 = "";
      this.Tab2 = "";
      this.Tab3 = "";
      this.Tab4 = "";
      this.Tab5 = showIdx;
      this.Tab6 = "";
    }else if(showIdx === "6"){
      this.Tab1 = "";
      this.Tab2 = "";
      this.Tab3 = "";
      this.Tab4 = "";
      this.Tab5 = "";
      this.Tab6 = showIdx;
    }
  }


  //상세팝업
  openDetail(idx, obj: any){
    if(idx === "tab1"){
      this.modalController.create('Peg08detail1Page', {obj: obj}).present();
    }

    if(idx === "tab2"){
      this.modalController.create('Peg08detail2Page', {obj: obj}).present();
    }

    if(idx === "tab3"){
      this.modalController.create('Peg08detail3Page', {obj: obj}).present();
    }

    if(idx === "tab4"){
      this.modalController.create('Peg08detail4Page', {obj: obj}).present();
    }

  }

  //버튼 컬러 change
  btn_change1(){
    this.buttonColor1 = '#FFDF24';
    this.buttonColor2 = 'white';
    this.buttonColor3 = 'white';
    this.buttonColor4 = 'white';
  }

  btn_change2(){
    this.buttonColor1 = 'white';
    this.buttonColor2 = '#FFDF24';
    this.buttonColor3 = 'white';
    this.buttonColor4 = 'white';
  }

  btn_change3(){
    this.buttonColor1 = 'white';
    this.buttonColor2 = 'white';
    this.buttonColor3 = '#FFDF24';
    this.buttonColor4 = 'white';
  }

  btn_change4(){
    this.buttonColor1 = 'white';
    this.buttonColor2 = 'white';
    this.buttonColor3 = 'white';
    this.buttonColor4 = '#FFDF24';
  }

  scrollToTop() {
    this.content.scrollToTop();
  }
}
