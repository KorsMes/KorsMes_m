import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Content } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ApiProvider } from '../../../../providers/api';
import { AlertProvider } from '../../../../providers/alert';
import { CommoncodeProvider } from '../../../../providers/commoncode';

/**
 * Generated class for the Scb10Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'search_page',
  templateUrl: 'scb10.html',
})
export class SCB10 {
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
  public pjt_no; //프로젝트번호
  public pjt_nm; //프로젝트명

  /* 조회 결과 */
  public result;
  public result2;
  public result3;

  /*중메뉴 SHOW & HIDE*/
  public showCard = null;

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
                    if("SCB10" == data[n].PGM_ID){
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
    //console.log('ionViewDidLoad Scb10Page');
  }


  //조회조건 전체 초기화
  condition_yn(yn){
    if(yn === ''){
      this.pjt_no = null;
      this.pjt_nm = null;
    }
    this.searchCondition = yn;
  }

  //조회조건 프로젝트번호 초기화
  clear_pjtno(){
    this.pjt_no = null;
    this.pjt_nm = null;
  }

  //프로젝트번호 팝업
  PopupPjtno(){
    var modal = this.modalController.create('PopupPjtnoPage');
    modal.onDidDismiss(data => {
      this.pjt_no = data.pjtno;
      this.pjt_nm = data.pjtnm;
    });
    modal.present();
  }



  //조회
  retrive(){
    if(this.pjt_no == null || this.pjt_no == ""){
      this.alertProvider.call_alert("조회", "프로젝트번호를 입력해주세요.", "확인");
      return;
    }

    let api_url = "/scb/scb10_list";
    let param = JSON.stringify({company_cd: this.g_company[0].COMPANY, plant_cd: this.plant_cd, pjtno: this.pjt_no, c_code: this.g_user.c_code})

    this.apiProvider.data_api(api_url, param)
    .then(data => {
      if(Object.keys(data).length === 0){
        this.alertProvider.call_alert("조회", "검색결과가 없습니다.", "확인");
      }else{
        this.searchCondition = "";
        let api_url2 = "/scb/scb10_list2";
        let param2 = JSON.stringify({company_cd: this.g_company[0].COMPANY, plant_cd: this.plant_cd, pjtno: this.pjt_no, c_code: this.g_user.c_code})

        this.apiProvider.data_api(api_url2, param2)
        .then(data2 => {
          this.result2 = data2;

          for(var i=0; i<Object.keys(data).length; i++){
            var totamt=0;
            for(var j=0; j<Object.keys(data2).length; j++){
              if(this.result[i].GROUP_NO === data2[j].GROUP_NO){
                totamt = Math.floor(totamt) + Math.floor(data2[j].SOWAMT1);
              }
            }
            data[i].SOWAMT1 = totamt;
          }
        })
      }
      this.result = data;
    })

    this.showCard = null;
  }



  category_click(GROUP_NO){
    let api_url3 = "/scb/scb10_list2";
    let param3 = JSON.stringify({company_cd: this.g_company[0].COMPANY, plant_cd: this.plant_cd, pjtno: this.pjt_no, c_code: this.g_user.c_code, group_no: GROUP_NO})

    this.apiProvider.data_api(api_url3, param3)
    .then(data3 => {
      this.result3 = data3;
    });

    this.showCard = GROUP_NO;
  }

  scrollToTop() {
    this.content.scrollToTop();
  }
}

