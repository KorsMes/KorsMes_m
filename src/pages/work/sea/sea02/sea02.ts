import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Content } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ApiProvider } from '../../../../providers/api';
import { AlertProvider } from '../../../../providers/alert';
import { CommoncodeProvider } from '../../../../providers/commoncode';

/**
 * Generated class for the Sea02Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'search_page',
  templateUrl: 'sea02.html',
})
export class SEA02 {
  @ViewChild(Content) content: Content;

  /* 공통코드 */
  public commonCode37; //견적상태
  public commonCode14; //영업부서
  public commonCode13; //거래처
  public commonCode39; //생산구분
  public commonCode40; //주문구분
  public commonCode43; //사업구분

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

  public fr_yymm = new Date().getUTCFullYear()+"-"+"01-01"; //수주년월
  public to_yymm = new Date().toISOString(); //수주년월

  public pjtno; //pjt번호
  public pjtnm; //pjt명

  public status = ""; //견적상태

  /* 전체 필터 색상*/
  borderColor1: string = '#007087';
  borderColor2: string = 'white';

  all_search_Color1: string = '#007087';
  all_search_Color2: string = 'white';

  text_color1: string = "white";
  text_color2: string = "#D5D5D5";

  /* 조회결과 */
  public result;

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
                    if("SEA02" == data[n].PGM_ID){
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

                //견적상태 가져오기
                this.commonCode37 = this.commoncodeProvider.getCommonCode37();

                //영업부서 가져오기
                this.commonCode14 = this.commoncodeProvider.getCommonCode14();

                //거래처 가져오기
                this.commonCode13 = this.commoncodeProvider.getCommonCode13();

                //생산구분 가져오기
                this.commonCode39 = this.commoncodeProvider.getCommonCode39();

                //주문구분 가져오기
                this.commonCode40 = this.commoncodeProvider.getCommonCode40();

                //사업구분 가져오기
                this.commonCode43 = this.commoncodeProvider.getCommonCode43();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Sea02Page');
  }


  //조회조건 전체 초기화
  condition_yn(yn){
    if(yn === ''){
      this.fr_yymm = new Date().getUTCFullYear()+"-"+"01-01";
      this.to_yymm = new Date().toISOString();
      this.pjtno = "";
      this.pjtnm = "";
      this.status = "";
    }
    this.searchCondition = yn;
  }


  //조회조건 pjt번호 초기화
  clear_pdtno(){
    this.pjtno = null;
    this.pjtnm = null;
  }


  //pjt번호 팝업
  PopupPdtno(){
    var modal = this.modalController.create('PopupPdtnoPage');
    modal.onDidDismiss(data => {
      this.pjtno = data.pjtno;
      this.pjtnm = data.pjtnm;
    });
    modal.present();
  }


  //조회
  retrive(){
    let api_url = "/sea/sea02_list";
    let param = JSON.stringify({company_cd: this.g_company[0].COMPANY, plant_cd: this.plant_cd, pjtno_fr: this.pjtno, pjtno_to: this.pjtno, status: this.status, fr_yymm: this.fr_yymm, to_yymm: this.to_yymm, c_code: this.g_user.c_code});

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

  //상세팝업
  openDetail(obj: any){
    this.modalController.create('Sea02detailPage', {obj: obj}).present();
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
