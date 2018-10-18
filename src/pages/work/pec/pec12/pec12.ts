import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { ApiProvider } from '../../../../providers/api';
import { AlertProvider } from '../../../../providers/alert';
import { CommoncodeProvider } from '../../../../providers/commoncode';

/**
 * Generated class for the Pec12Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pec12',
  templateUrl: 'pec12.html',
})
export class PEC12 {
  /* 통합코드 */
  public commonCode13; //거래처

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
  public pdtno1; //PJT번호1
  public pdtnm1; //PJT명1
  public pdtno2; //PJT번호2
  public pdtnm2; //PJT명2
  public drseq; //설계차수1
  public drseq2; //설계차수2
  public item; //품목코드1
  public item_name_k; //품목명1
  public item2; //품목코드2
  public item_name_k2; //품목명2

  /* 조회결과 */
  public result1; //자재투입진척현황(상세)
  public result2; //자재투입진척현황(집계)

  /* 탭 페이지 */
  public Tab1 = "1";
  public Tab2;

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
                    if("PEC12" == data[n].PGM_ID){
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

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Pec12Page');
  }


  //조회조건 전체 초기화
  condition_yn(yn){
    if(yn === ''){
      this.plant_cd = this.plant_cd = this.g_plant[0].PLANT;
      this.pdtno1 = "";
      this.pdtnm1 = "";
      this.pdtno2 = "";
      this.pdtnm2 = "";
      this.drseq = "";
      this.drseq2 = "";
      this.item = "";
      this.item_name_k = "";
      this.item2 = "";
      this.item_name_k2 = "";
    }
    this.searchCondition = yn;
  }

  //조회조건 PJT번호1 초기화
  clear_pdtno1(){
    this.pdtno1 = null;
    this.pdtnm1 = null;
  }

  //조회조건 PJT번호2 초기화
  clear_pdtno2(){
    this.pdtno2 = null;
    this.pdtnm2 = null;
  }

  //조회조건 품목코드1 초기화
  clear_itnbr1(){
    this.item = null;
    this.item_name_k = null;
  }

  //조회조건 품목코드2 초기화
  clear_itnbr2(){
    this.item2 = null;
    this.item_name_k2 = null;
  }

  //PJT번호1 팝업
  PopupPdtno1(){
    var modal = this.modalController.create('PopupPdtnoPage');
    modal.onDidDismiss(data => {
      this.pdtno1 = data.pjtno;
      this.pdtnm1 = data.pjtnm;
    });
    modal.present();
  }

  //PJT번호2 팝업
  PopupPdtno2(){
    var modal = this.modalController.create('PopupPdtnoPage');
    modal.onDidDismiss(data => {
      this.pdtno2 = data.pjtno;
      this.pdtnm2 = data.pjtnm;
    });
    modal.present();
  }

  //거래처1 팝업
  PopupItnbr1(){
    var modal = this.modalController.create('PopupItnbrPage');
    modal.onDidDismiss(data => {
      this.item = data.itnbr_cd;
      this.item_name_k = data.itnbr_nm;
    });
    modal.present();
  }

  //거래처2 팝업
  PopupItnbr2(){
    var modal = this.modalController.create('PopupItnbrPage');
    modal.onDidDismiss(data => {
      this.item2 = data.itnbr_cd;
      this.item_name_k2 = data.itnbr_nm;
    });
    modal.present();
  }



  //조회
  retrive(){

    if(this.pdtno1 == null || this.pdtno1 == ""){
      this.alertProvider.call_alert("조회", "PJT번호를 입력해주세요.", "확인");
      return;
    }

    if(this.pdtno2 == null || this.pdtno2 == ""){
      this.alertProvider.call_alert("조회", "PJT번호를 입력해주세요.", "확인");
      return;
    }

    //자재투입진척현황(상세)
    let api_url1 = "/pec/pec12_list1";
    let param1 = JSON.stringify({  company: this.g_company[0].COMPANY,
                                  plant_cd: this.plant_cd,
                                  pjtno1: this.pdtno1,
                                  pjtno2: this.pdtno2,
                                  drseq: this.drseq,
                                  drseq2: this.drseq2,
                                  item: this.item,
                                  item2: this.item2,
                                  c_code: this.g_user.c_code});

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

    //자재투입진척현황(집계)
    let api_url2 = "/pec/pec12_list2";
    let param2 = JSON.stringify({  company: this.g_company[0].COMPANY,
                                      plant_cd: this.plant_cd,
                                      pjtno1: this.pdtno1,
                                      pjtno2: this.pdtno2,
                                      drseq: this.drseq,
                                      drseq2: this.drseq2,
                                      item: this.item,
                                      item2: this.item2,
                                      c_code: this.g_user.c_code});

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
  }

  //탭페이지 전환
  changeTab(showIdx){
    if(showIdx === "1"){
      this.Tab1 = showIdx;
      this.Tab2 = "";
    }else if(showIdx === "2"){
      this.Tab2 = showIdx;
      this.Tab1 = "";
    }
  }


  //상세팝업
  openDetail(idx, obj: any){
    if(idx === "tab1"){
      this.modalController.create('Pec12detail1Page', {obj: obj}).present();
    }

    if(idx === "tab2"){
      this.modalController.create('Pec12detail2Page', {obj: obj}).present();
    }

  }


}
