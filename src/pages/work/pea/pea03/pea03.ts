import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ApiProvider } from '../../../../providers/api';
import { AlertProvider } from '../../../../providers/alert';
import { CommoncodeProvider } from '../../../../providers/commoncode';

/**
 * Generated class for the Pea03Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'search_page',
  templateUrl: 'pea03.html',
})
export class PEA03 {
  /* 통합코드 */
  public commonCode13; //거래처정보
  public commonCode1; //단위
  public commonCode26; //검사구분
  public commonCode27; //상태

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
  public cust_cd; //거래처코드
  public cust_nm; //거래처명
  public pjtno; //PJT번호
  public pjtnm; //PJT명
  public item1; //품목코드from
  public item_nm1; //품목명from
  public item2; //품목코드to
  public item_nm2; //품목명to
  public drseq; //차수
  public delv_date1 = new Date().getUTCFullYear()+"-"+"01-01"; //납품일자 from
  public delv_date2 = new Date().toISOString(); //납품일자 to

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
                    if("PEA03" == data[n].PGM_ID){
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

                //거래처정보 가져오기
                this.commonCode13 = this.commoncodeProvider.getCommonCode13();

                //단위 가져오기
                this.commonCode1 = this.commoncodeProvider.getCommonCode1();

                //검사구분 가져오기
                this.commonCode26 = this.commoncodeProvider.getCommonCode26();

                //상태 가져오기
                this.commonCode27 = this.commoncodeProvider.getCommonCode27();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Pea03Page');
  }


 /* //조회조건 전체 초기화
  condition_yn(yn){
    if(yn === ''){
      this.plant_cd = this.g_plant[0].PLANT;
      this.cust_cd = "";
      this.cust_nm = "";
      this.pjtno = "";
      this.pjtnm = "";
      this.item1 = "";
      this.item_nm1 = "";
      this.item2 = "";
      this.item_nm2 = "";
      this.drseq = "";
      this.delv_date1 = new Date().getUTCFullYear()+"-"+"01-01";
      this.delv_date2 = new Date().toISOString();
    }
    this.searchCondition = yn;
  }*/


  //조회조건 Pjt번호 초기화
  clear_pjtno(){
    this.pjtno = null;
    this.pjtnm = null;
  }

  //조회조건 거래처 초기화
  clear_buyer(){
    this.cust_cd = null;
    this.cust_nm = null;
  }

  //조회조건 품목코드1 초기화
  clear_itnbr1(){
    this.item1 = null;
    this.item_nm1 = null;
  }

  //조회조건 품목코드2 초기화
  clear_itnbr2(){
    this.item2 = null;
    this.item_nm2 = null;
  }

  //Pjt번호 팝업
  PopupPjtno(){
    var modal = this.modalController.create('PopupPjtno2Page');
    modal.onDidDismiss(data => {
      this.pjtno = data.pjtno;
      this.pjtnm = data.pjtnm;
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

  //품목코드1 팝업
  PopupItnbr1(){
    var modal = this.modalController.create('PopupItnbrPage');
    modal.onDidDismiss(data => {
      this.item1 = data.itnbr_cd;
      this.item_nm1 = data.itnbr_nm;
    });
    modal.present();
  }

  //품목코드2 팝업
  PopupItnbr2(){
    var modal = this.modalController.create('PopupItnbrPage');
    modal.onDidDismiss(data => {
      this.item2 = data.itnbr_cd;
      this.item_nm2 = data.itnbr_nm;
    });
    modal.present();
  }


  //조회
  retrive(){
    let api_url = "/pea/pea03_list";
    let param = JSON.stringify({company_cd: this.g_company[0].COMPANY, plant_cd: this.plant_cd, cust_cd: this.cust_cd, pjtno: this.pjtno, item1: this.item1, item2: this.item2, drseq: this.drseq, delv_date1: this.delv_date1, delv_date2: this.delv_date2, c_code: this.g_user.c_code});

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
    this.modalController.create('Pea03detailPage', {obj: obj}).present();
  }

}
