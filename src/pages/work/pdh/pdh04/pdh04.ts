import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Content } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ApiProvider } from '../../../../providers/api';
import { AlertProvider } from '../../../../providers/alert';
import { CommoncodeProvider } from '../../../../providers/commoncode';

/**
 * Generated class for the Pdh04Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'search_page',
  templateUrl: 'pdh04.html',
})
export class PDH04 {
  @ViewChild(Content) content: Content;

  /* 통합코드 */
  public commonCode1; //부서

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
  public g_company;
  public g_plant;

  public plant_cd;
  public pdtno1;
  public pdtnm1;

  public pdtno2;
  public pdtnm2;

  /* 조회결과 */
  public result1;
  public result2;

  /* 탭 페이지 */
  public Tab1 = "1";
  public Tab2;

  /*버튼 색상 변경*/
  buttonColor1: string = '#FFDF24';
  buttonColor2: string = 'white';


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
                  if("PDH04" == data[n].PGM_ID){
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

              //단위 가져오기
              this.commonCode1 = this.commoncodeProvider.getCommonCode1();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Pdh04Page');
  }

  condition_yn(yn){
    if(yn === ''){
      this.pdtno1 = null;
      this.pdtnm1 = null;

      this.pdtno2 = null;
      this.pdtnm2 = null;
    }
    this.searchCondition = yn;
  }

  //조회조건 PDTNO1 초기화
  Clear_pdtno1(){
    this.pdtno1 = null;
    this.pdtnm1 = null;
  }

  Clear_pdtno2(){
    this.pdtno2 = null;
    this.pdtnm2 = null;
  }

  //PDTNO 팝업
  PopupPdtno1(){
    var modal = this.modalController.create('PopupPdtnoPage');
    modal.onDidDismiss(data => {
      this.pdtno1 = data.pjtno;
      this.pdtnm1 = data.pjtnm;
    });
    modal.present();
  }

  PopupPdtno2(){
    var modal = this.modalController.create('PopupPdtnoPage');
    modal.onDidDismiss(data => {
      this.pdtno2 = data.pjtno;
      this.pdtnm2 = data.pjtnm;
    });
    modal.present();
  }


  //조회
  retrive(){

    //자재투입 계획서(갑지)
    let api_url1 = "/pdh/pdh04_list1";
    let param1 = JSON.stringify({company_cd: this.g_company[0].COMPANY, plant_cd: this.plant_cd, pjtno_fr: this.pdtno1, pjtno_to: this.pdtno2, c_code: this.g_user.c_code});

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

    //자재투입 계획서(을지)
    let api_url2 = "/pdh/pdh04_list2";
    let param2 = JSON.stringify({company_cd: this.g_company[0].COMPANY, plant_cd: this.plant_cd, pjtno_fr: this.pdtno1, pjtno_to: this.pdtno2, c_code: this.g_user.c_code});

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
  openDetail(obj: any){
    this.modalController.create('Pdh04detail2Page', {obj: obj}).present();
  }

  //버튼 컬러 change
  btn_change1(){
    this.buttonColor1 = '#FFDF24';
    this.buttonColor2 = 'white';
  }

  btn_change2(){
    this.buttonColor1 = 'white';
    this.buttonColor2 = '#FFDF24';
  }

  scrollToTop() {
    this.content.scrollToTop();
  }

}
