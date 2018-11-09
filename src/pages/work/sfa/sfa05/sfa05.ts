import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Content } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ApiProvider } from '../../../../providers/api';
import { AlertProvider } from '../../../../providers/alert';
import { CommoncodeProvider } from '../../../../providers/commoncode';

/**
 * Generated class for the Sfa05Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'search_page',
  templateUrl: 'sfa05.html',
})
export class SFA05 {
  @ViewChild(Content) content: Content;

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

  public plant_cd;
  public date_fr = new Date().getUTCFullYear()+"-"+"01-01"; //매출기간from
  public date_to = new Date().toISOString(); //매출기간to
  public dptno; //부서코드
  public dptnm; //부서명
  public cust_cd; //거래처코드
  public cust_nm; //거래처명

  public commonCode8; //부서
  public commonCode12; //매출담당
  public commonCode13; //거래처

  /* 조회결과 */
  public result1; //상세현황
  public result2; //거래처별
  public result3; //부서별

  /* 탭 페이지 */
  public Tab1 = "1";
  public Tab2;
  public Tab3;

  /*버튼 색상 변경*/
  buttonColor1: string = '#FFDF24';
  buttonColor2: string = 'white';
  buttonColor3: string = 'white';

  /* 전체 필터 색상*/
  borderColor1: string = '#007087';
  borderColor2: string = '#D5D5D5';

  all_search_Color1: string = '#007087';
  all_search_Color2: string = 'white';

  text_color1: string = "white";
  text_color2: string = "#D5D5D5";


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
                  if("SFA05" == data[n].PGM_ID){
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

              //부서 가져오기
              this.commonCode8 = this.commoncodeProvider.getCommonCode8();

              //매출담당 가져오기
              this.commonCode12 = this.commoncodeProvider.getCommonCode12();

              //거래처 가져오기
              this.commonCode13 = this.commoncodeProvider.getCommonCode13();
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad Sfa05Page');
  }

  //조회조건 전체 초기화
  condition_yn(yn){
    if(yn === ''){
      this.date_fr = new Date().getUTCFullYear()+"-"+"01-01";
      this.date_to = new Date().toISOString();
      this.dptno = "";
      this.dptnm = "";
      this.cust_cd = "";
      this.cust_nm = "";
    }
    this.searchCondition = yn;
  }


  //조회조건 부서 초기화
  clear_dept(){
    this.dptno = null;
    this.dptnm = null;
  }

  //조회조건 거래처 초기화
  clear_buyer(){
    this.cust_cd = null;
    this.cust_nm = null;
  }


  //부서 팝업
  PopupDept(){
    var modal = this.modalController.create('PopupDeptPage');
    modal.onDidDismiss(data => {
      this.dptno = data.dept_cd;
      this.dptnm = data.dept_nm;
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

    //상세현황
    let api_url1 = "/sfa/sfa05_list1";
    let param1 = JSON.stringify({company_cd: this.g_company[0].COMPANY, plant_cd: this.plant_cd, date_fr: this.date_fr, date_to: this.date_to, dptno: this.dptno, cust_cd: this.cust_cd, c_code: this.g_user.c_code});

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

    //거래처별
    let api_url2 = "/sfa/sfa05_list2";
    let param2 = JSON.stringify({company_cd: this.g_company[0].COMPANY, plant_cd: this.plant_cd, date_fr: this.date_fr, date_to: this.date_to, dptno: this.dptno, cust_cd: this.cust_cd, c_code: this.g_user.c_code});

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

    //부서별
    let api_url3 = "/sfa/sfa05_list3";
    let param3 = JSON.stringify({company_cd: this.g_company[0].COMPANY, plant_cd: this.plant_cd, date_fr: this.date_fr, date_to: this.date_to, dptno: this.dptno, cust_cd: this.cust_cd, c_code: this.g_user.c_code});

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
    }
  }

  //상세팝업1
  openDetail1(obj: any){
    this.modalController.create('Sfa05detail1Page', {obj: obj}).present();
  }

  //버튼 컬러 change
  btn_change1(){
    this.buttonColor1 = '#FFDF24';
    this.buttonColor2 = 'white';
    this.buttonColor3 = 'white';
  }

  btn_change2(){
    this.buttonColor1 = 'white';
    this.buttonColor2 = '#FFDF24';
    this.buttonColor3 = 'white';

  }

  btn_change3(){
    this.buttonColor1 = 'white';
    this.buttonColor2 = 'white';
    this.buttonColor3 = '#FFDF24';
  }

  scrollToTop() {
    this.content.scrollToTop();
  }

  all_btn(){
    this.borderColor1 = '#007087';
    this.borderColor2 = '#D5D5D5';

    this.all_search_Color1 = '#007087';
    this.all_search_Color2 = 'white';

    this.text_color1 = 'white';
    this.text_color2 = '#D5D5D5';
  }

  filter_btn(){
    this.borderColor1 = '#D5D5D5';
    this.borderColor2 = '#007087';

    this.all_search_Color1 = 'white';
    this.all_search_Color2 = '#007087';

    this.text_color1 = '#D5D5D5';
    this.text_color2 = 'white';
  }

}
