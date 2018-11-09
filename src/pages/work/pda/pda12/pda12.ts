import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Content } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ApiProvider } from '../../../../providers/api';
import { AlertProvider } from '../../../../providers/alert';
import { CommoncodeProvider } from '../../../../providers/commoncode';

/**
 * Generated class for the Pda12Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'search_page',
  templateUrl: 'pda12.html',
})
export class PDA12 {
  @ViewChild(Content) content: Content;

  public commonCode30; //상태
  public commonCode6; //계정과목
  public commonCode15; //사용자

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
  public user_id; //사번(기안자)
  public user_nm; //성명(기안자)
  public status_cd = '2'; //상태
  public acnt_cd; //계정과목
  public plant_cd; //공장코드
  public exp_remarks; //지출내용

  public date_fr = new Date().getUTCFullYear()+"-"+"01-01"; //기안일자from
  public date_to = new Date().toISOString(); //기안일자to

  public cust_cd; //거래처코드(거래처)
  public cust_nm; //거래처명(거래처)

  /* 전체 필터 색상*/
  borderColor1: string = '#007087';
  borderColor2: string = 'white';

  all_search_Color1: string = '#007087';
  all_search_Color2: string = 'white';

  text_color1: string = "white";
  text_color2: string = "#D5D5D5";

  /* 조회결과 */
  public result = [];

  /* infiniteScroll */
  public page = 1;
  public showInfiniteScroll = true;

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
                  if("PDA12" == data[n].PGM_ID){
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

              //상태 가져오기
              this.commonCode30 = this.commoncodeProvider.getCommonCode30();
              //계정과목 가져오기
              this.commonCode6 = this.commoncodeProvider.getCommonCode6();
              //사용자 가져오기
              ``
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad Pda12Page');
  }

  condition_yn(yn){
    if(yn === ''){
      this.user_id = null;
      this.user_nm = null;

      this.cust_cd = null;
      this.cust_nm = null;

      this.status_cd = '2';
    }
    this.searchCondition = yn;
  }

  //조회조건 사용자정보 초기화
  clear_user(){
    this.user_id = null;
    this.user_nm = null;
  }

  //사용자 팝업
  PopupUser(){
    var modal = this.modalController.create('PopupUserPage');
    modal.onDidDismiss(data => {
      this.user_id = data.user_id;
      this.user_nm = data.user_nm;
    });
    modal.present();
  }

  //조회
  retrive(flag){
    if(flag === 'search'){
      this.page = 1;
      this.result = [];
    }
    let api_url = "/pda/pda12_list";
    let param = JSON.stringify({c_code: this.g_user.c_code, cmpy_cd: this.g_company[0].COMPANY, act_unit: this.plant_cd, sabn: this.user_id, drf_date_fr: this.date_fr, drf_date_to: this.date_to, status: this.status_cd, exp_remarks: this.exp_remarks, cust_nm: this.cust_nm, ac_cd: this.acnt_cd, page: this.page});

    this.apiProvider.data_api(api_url, param)
    .then(data => {
      if(Object.keys(data).length === 0){
        this.alertProvider.call_alert("조회", "검색결과가 없습니다.", "확인");
      }else{
        this.searchCondition = "";
      }
      for(let v in data){
        if(Math.floor(30*Math.floor(this.page-1)) < Number(Number(v)+Number(1))){
          this.result.push(data[v]);
        }
      }

      if(Object.keys(data).length < Math.floor(this.page * 30)){
        this.showInfiniteScroll = false;
      }else{
        this.showInfiniteScroll = true;
      }
    });
  }

  //로딩 스크롤
  loadMore(infiniteScroll) {
    this.page++;
    setTimeout(() =>{
      this.retrive('false');
      infiniteScroll.complete();
    }, 1000);
  };

  //상세팝업
  openDetail(obj: any){
    this.modalController.create('Pda12detailPage', {obj: obj}).present();
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
