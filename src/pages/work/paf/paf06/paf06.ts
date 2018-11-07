import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Content } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ApiProvider } from '../../../../providers/api';
import { AlertProvider } from '../../../../providers/alert';
import { CommoncodeProvider } from '../../../../providers/commoncode';


/**
 * Generated class for the Paf06Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'search_page',
  templateUrl: 'paf06.html',
})
export class PAF06 {
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
  public itnbr_cd; //품목코드
  public itnbr_nm; //품목명
  public cust_cd; //협력업체코드
  public cust_nm; //협력업체명

  public commonCode1; //단위
  public commonCode2; //조달구분
  public commonCode3; //통화

  /* 조회결과 */
  public result;

  /* infiniteScroll */
  public page = 1;

  /* 전체 필터 색상*/
  borderColor1: string = '#007087';
  borderColor2: string = 'white';

  all_search_Color1: string = '#007087';
  all_search_Color2: string = 'white';

  text_color1: string = "white";
  text_color2: string = "#D5D5D5";



  constructor(
                public navController: NavController,
                public navParams: NavParams,
                public storage: Storage,
                public modalController: ModalController,
                public commoncodeProvider: CommoncodeProvider,
                public alertProvider: AlertProvider,
                public apiProvider: ApiProvider) {

                //버튼권한
                this.storage.get("[PAGE_AUTH]").then((data) => {
                  for(var n in data){
                    if("PAF06" == data[n].PGM_ID){
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

                //단위 가져오기
                this.commonCode1 = this.commoncodeProvider.getCommonCode1();
                //조달구분 가져오기
                this.commonCode2 = this.commoncodeProvider.getCommonCode2();
                //통화 가져오기
                this.commonCode3 = this.commoncodeProvider.getCommonCode3();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Paf06Page');
  }

  //조회조건 전체 초기화
  condition_yn(yn){
    if(yn === ''){
      this.itnbr_cd = null;
      this.itnbr_nm = null;

      this.cust_cd = null;
      this.cust_nm = null;
    }
    this.searchCondition = yn;
  }

  //조회조건 품목코드 초기화
  clear_itnbr(){
    this.itnbr_cd = null;
    this.itnbr_nm = null;
  }

  //조회조건 협력업체 초기화
  clear_buyer(){
    this.cust_cd = null;
    this.cust_nm = null;
  }


  //품목코드 팝업
  PopupItnbr(){
    var modal = this.modalController.create('PopupItnbrPage');
    modal.onDidDismiss(data => {
      this.itnbr_cd = data.itnbr_cd;
      this.itnbr_nm = data.itnbr_nm;
    });
    modal.present();
  }

  //협력업체 팝업
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
    let api_url = "/paf/paf06_list";
    let param = JSON.stringify({itnbr: this.itnbr_cd, by_cd: this.cust_cd, company_cd:this.g_company[0].COMPANY, c_code: this.g_user.c_code, page: this.page});

    this.apiProvider.data_api(api_url, param)
    .then(data => {
      if(Object.keys(data).length === 0){
        this.alertProvider.call_alert("조회", "검색결과가 없습니다.", "확인");
      }else{
        this.searchCondition = "";
      }
      this.result = data;
    });
  }

  //로딩 스크롤
  loadMore(infiniteScroll) {
    this.page++;
    this.content.scrollTo('0', '80%', 100);
    setTimeout(() =>{
      this.retrive();

      infiniteScroll.complete();
    }, 1000);
  };

  //상세팝업
  openDetail(obj: any){
    this.modalController.create('PAF06DETAIL', {obj: obj}).present();
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
