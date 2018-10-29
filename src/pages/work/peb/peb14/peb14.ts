import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Content } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ApiProvider } from '../../../../providers/api';
import { AlertProvider } from '../../../../providers/alert';
import { CommoncodeProvider } from '../../../../providers/commoncode';

/**
 * Generated class for the Peb14Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'search_page',
  templateUrl: 'peb14.html',
})
export class PEB14 {
  @ViewChild(Content) content: Content;

  /* 통합코드 */
  public commonCode28; //품목구분
  public commonCode13; //거래처
  public commonCode14; //부서
  public commonCode15; //사용자
  public commonCode29; //입고유형
  public commonCode1; //단위
  public commonCode2; //조달구분
  public commonCode3; //통화

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

  public date1 = new Date().getUTCFullYear()+"-"+"01-01"; //입고일자from
  public date2 = new Date().toISOString(); //입고일자to
  public cust_cd; //거래처코드
  public cust_nm; //거래처명
  public item; //품목코드
  public item_nm; //품목명
  public item_type; //품목구분

  /* 조회결과 */
  public result1; //일자별 자재입고현황
  public result2; //작업지시별 입고현황
  public result3; //거래처별 입고현황
  public result4; //작업지시별/품번별 입고현황

  /* 탭 페이지 */
  public Tab1 = "1";
  public Tab2;
  public Tab3;
  public Tab4;

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
                public apiProvider: ApiProvider) {

                //버튼권한
                this.storage.get("[PAGE_AUTH]").then((data) => {
                  for(var n in data){
                    if("PEB14" == data[n].PGM_ID){
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

                //품목구분 가져오기
                this.commonCode28 = this.commoncodeProvider.getCommonCode28();

                //거래처 가져오기
                this.commonCode13 = this.commoncodeProvider.getCommonCode13();

                //단위 가져오기
                this.commonCode1 = this.commoncodeProvider.getCommonCode1();

                //조달구분 가져오기
                this.commonCode2 = this.commoncodeProvider.getCommonCode2();

                //입고유형 가져오기
                this.commonCode29 = this.commoncodeProvider.getCommonCode29();

                //통화 가져오기
                this.commonCode3 = this.commoncodeProvider.getCommonCode3();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Peb14Page');
  }


  //조회조건 전체 초기화
  condition_yn(yn){
    if(yn === ''){
      this.date1 = new Date().getUTCFullYear()+"-"+"01-01";
      this.date2 = new Date().toISOString();
      this.cust_cd = "";
      this.cust_nm = "";
      this.item = "";
      this.item_nm = "";
      this.item_type = "";
    }
    this.searchCondition = yn;
  }

  //조회조건 품목코드 초기화
  clear_itnbr(){
    this.item = null;
    this.item_nm = null;
  }

  //조회조건 거래처 초기화
  clear_buyer(){
    this.cust_cd = null;
    this.cust_nm = null;
  }

  //품목코드 팝업
  PopupItnbr(){
    var modal = this.modalController.create('PopupItnbrPage');
    modal.onDidDismiss(data => {
      this.item = data.itnbr_cd;
      this.item_nm = data.itnbr_nm;
    });
    modal.present();
  }

  //거래처 팝업
  PopupBuyer(){
    var modal = this.modalController.create('PopupBuyerPage');
    modal.onDidDismiss(data => {
      this.cust_cd = data.cust_cd;
      this.cust_nm = data.cust_nm;
    });
    modal.present();
  }


  //조회
  retrive(){

    //일자별 자재입고현황
    let api_url1 = "/peb/peb14_list1";
    let param1 = JSON.stringify({ company_cd: this.g_company[0].COMPANY,
                                  plant_cd: this.plant_cd,
                                  date1: this.date1,
                                  date2: this.date2,
                                  cust_cd: this.cust_cd,
                                  item: this.item,
                                  item_type: this.item_type,
                                  c_code: this.g_user.c_code
                                });

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

    //작업지시별 입고현황
    let api_url2 = "/peb/peb14_list2";
    let param2 = JSON.stringify({ company_cd: this.g_company[0].COMPANY,
                                  plant_cd: this.plant_cd,
                                  date1: this.date1,
                                  date2: this.date2,
                                  cust_cd: this.cust_cd,
                                  item: this.item,
                                  item_type: this.item_type,
                                  c_code: this.g_user.c_code
                                });

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

    //거래처별 입고현황
    let api_url3 = "/peb/peb14_list3";
    let param3 = JSON.stringify({ company_cd: this.g_company[0].COMPANY,
                                  plant_cd: this.plant_cd,
                                  date1: this.date1,
                                  date2: this.date2,
                                  cust_cd: this.cust_cd,
                                  item: this.item,
                                  item_type: this.item_type,
                                  c_code: this.g_user.c_code
                                });

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

    //작업지시별/품번별 입고현황
    let api_url4 = "/peb/peb14_list4";
    let param4 = JSON.stringify({ company_cd: this.g_company[0].COMPANY,
                                  plant_cd: this.plant_cd,
                                  date1: this.date1,
                                  date2: this.date2,
                                  cust_cd: this.cust_cd,
                                  item: this.item,
                                  item_type: this.item_type,
                                  c_code: this.g_user.c_code
                                });

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

}

  //탭페이지 전환
  changeTab(showIdx){
    if(showIdx === "1"){
      this.Tab1 = showIdx;
      this.Tab2 = "";
      this.Tab3 = "";
    }else if(showIdx === "2"){
      this.Tab2 = showIdx;
      this.Tab1 = "";
      this.Tab3 = "";
    }else if(showIdx === "3"){
      this.Tab3 = showIdx;
      this.Tab1 = "";
      this.Tab2 = "";
    }else if(showIdx === "4"){
      this.Tab4 = showIdx;
      this.Tab1 = "";
      this.Tab2 = "";
      this.Tab3 = "";
    }
  }


  //상세팝업
  openDetail(idx, obj: any){
    if(idx === "tab1"){
      this.modalController.create('Peb14detail1Page', {obj: obj}).present();
    }

    if(idx === "tab4"){
      this.modalController.create('Peb14detail4Page', {obj: obj}).present();
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
