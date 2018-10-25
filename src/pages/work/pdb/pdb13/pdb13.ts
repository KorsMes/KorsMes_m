import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ApiProvider } from '../../../../providers/api';
import { AlertProvider } from '../../../../providers/alert';
import { CommoncodeProvider } from '../../../../providers/commoncode';

/**
 * Generated class for the Pdb13Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pdb13',
  templateUrl: 'pdb13.html',
})
export class PDB13 {

  /* 프로그램 버튼 권한 */
  public acc_btn_add;
  public acc_btn_save;
  public acc_btn_delete;
  public acc_btn_retrive;
  public acc_btn_print;

  /* 조건검색 유무 */
  public searchCondition;

  /* 조건검색 */
  public g_company; //회사정보
  public g_plant; //공장정보

  public plant_cd;

  public pjtno; //PJT번호from
  public pjtnm; //PJT명from

  /*public pjtno2; //PJT번호to
  public pjtnm2; //PJT명to*/

  public purno1; //발주번호from
  public purno2; //발주번호to

  public itnbr_cd; //품목코드from
  public itnbr_nm; //품목명from

  /*public itnbr_cd2; //품목코드to
  public itnbr_nm2; //품목명to*/

  public date_fr = new Date().getUTCFullYear()+"-"+"01-01"; //발주일자from
  public date_to = new Date().toISOString(); //발주일자to

  public itnbr_gu = 'A'; //품목구분

  /* 조회결과 */
  public g_user;
  public result1; //P/O별 발주상세내역
  public result2; //업체별 발주집계표
  public result3; //PJT별 발주집계표
  public result4; //품목별 발주집계표
  public result5; //업체별 발주내역 총집계표
  public result6; //PJT별 발주내역 총집계표

  /* 탭 페이지 */
  public Tab1 = "1";
  public Tab2;
  public Tab3;
  public Tab4;
  public Tab5;
  public Tab6;

  constructor(
                public navCtrl: NavController,
                public navParams: NavParams,
                public storage: Storage,
                public modalController: ModalController,
                public alertProvider: AlertProvider,
                public commoncodeProvider: CommoncodeProvider,
                public apiProvider: ApiProvider) {

                //버튼권한
                this.storage.get("[PAGE_AUTH]").then((data) => {
                  for(var n in data){
                    if("PDB13" == data[n].PGM_ID){
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
    console.log('ionViewDidLoad Pdb13Page');
  }

  //조회조건 전체 초기화
  condition_yn(yn){
    if(yn === ''){
      this.pjtno="";
      this.pjtnm="";

     /* this.pjtno2="";
      this.pjtnm2="";*/

      this.purno1="";
      this.purno2="";

      this.itnbr_cd="";
      this.itnbr_nm="";

      /*this.itnbr_cd2="";
      this.itnbr_nm2="";*/

      this.date_fr = new Date().getUTCFullYear()+"-"+"01-01";
      this.date_to = new Date().toISOString();
    }
    this.searchCondition = yn;
  }


  //조회조건 PJT번호 초기화 from
  clear_pjtno(){
    this.pjtno = null;
    this.pjtnm= null;
  }

  //PJT번호 팝업 from
  PopupPjtno(){
    var modal = this.modalController.create('PopupPjtno2Page');
    modal.onDidDismiss(data => {
      this.pjtno = data.pjtno;
      this.pjtnm = data.pjtnm;
    });
    modal.present();
  }

 /* //조회조건 PJT번호 초기화 to
  clear_pjtno2(){
    this.pjtno2 = null;
    this.pjtnm2= null;
  }*/

 /* //PJT번호 팝업 to
  PopupPjtno2(){
    var modal = this.modalController.create('PopupPjtno2Page');
    modal.onDidDismiss(data => {
      this.pjtno2 = data.pjtno;
      this.pjtnm2 = data.pjtnm;
    });
    modal.present();
  }*/

  //조회조건 발주번호 초기화 from
  clear_purno1(){
    this.purno1 = null;
  }

  //발주번호 팝업 from
  PopupPurno1(){
    var modal = this.modalController.create('PopupPurnoPage');
    modal.onDidDismiss(data => {
      this.purno1 = data.purno;
    });
    modal.present();
  }

  //조회조건 발주번호 초기화 to
  clear_purno2(){
    this.purno2 = null;
  }

  //발주번호 팝업 to
  PopupPurno2(){
    var modal = this.modalController.create('PopupPurnoPage');
    modal.onDidDismiss(data => {
      this.purno2 = data.purno;
    });
    modal.present();
  }

  //조회조건 품목코드 초기화 from
  clear_itnbr(){
    this.itnbr_cd = "";
    this.itnbr_nm = "";
  }

  //품목코드 팝업 from
  PopupItnbr(){
    var modal = this.modalController.create('PopupItnbr2Page');
    modal.onDidDismiss(data => {
      this.itnbr_cd = data.itnbr_cd2;
      this.itnbr_nm = data.itnbr_nm2;
    });
    modal.present();
  }

/*  //조회조건 품목코드 초기화 to
  clear_itnbr2(){
    this.itnbr_cd2 = "";
    this.itnbr_nm2 = "";
  }

  //품목코드 팝업 to
  PopupItnbr2(){
    var modal = this.modalController.create('PopupItnbr2Page');
    modal.onDidDismiss(data => {
      this.itnbr_cd2 = data.itnbr_cd2;
      this.itnbr_nm2 = data.itnbr_nm2;
    });
    modal.present();
  }*/

  //조회
  retrive(){
    //P/O별 발주상세내역
    let api_url1 = "/pdb/pdb13_list1";
    let param1 = JSON.stringify({company_cd: this.g_company[0].COMPANY, plant_cd: this.plant_cd, pjtno: this.pjtno,  purno1: this.purno1, purno2: this.purno2, itnbr_cd: this.itnbr_cd,  date_fr: this.date_fr, date_to: this.date_to, itnbr_gu: this.itnbr_gu, c_code: this.g_user.c_code});

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

    //업체별 발주집계표
    let api_url2 = "/pdb/pdb13_list2";
    let param2 = JSON.stringify({company_cd: this.g_company[0].COMPANY, plant_cd: this.plant_cd, pjtno: this.pjtno,  purno1: this.purno1, purno2: this.purno2, itnbr_cd: this.itnbr_cd, date_fr: this.date_fr, date_to: this.date_to, itnbr_gu: this.itnbr_gu, c_code: this.g_user.c_code});
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

    //PJT별 발주집계표
    let api_url3 = "/pdb/pdb13_list3";
    let param3 = JSON.stringify({company_cd: this.g_company[0].COMPANY, plant_cd: this.plant_cd, pjtno: this.pjtno, purno1: this.purno1, purno2: this.purno2, itnbr_cd: this.itnbr_cd, date_fr: this.date_fr, date_to: this.date_to, itnbr_gu: this.itnbr_gu, c_code: this.g_user.c_code});
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

    //품목별 발주 집계표
    let api_url4 = "/pdb/pdb13_list4";
    let param4 = JSON.stringify({company_cd: this.g_company[0].COMPANY, plant_cd: this.plant_cd, pjtno: this.pjtno, purno1: this.purno1, purno2: this.purno2, itnbr_cd: this.itnbr_cd, date_fr: this.date_fr, date_to: this.date_to, itnbr_gu: this.itnbr_gu, c_code: this.g_user.c_code});
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

    //업체별 발주내역 총집계표
    let api_url5 = "/pdb/pdb13_list5";
    let param5 = JSON.stringify({company_cd: this.g_company[0].COMPANY, plant_cd: this.plant_cd, pjtno: this.pjtno, purno1: this.purno1, purno2: this.purno2, itnbr_cd: this.itnbr_cd, date_fr: this.date_fr, date_to: this.date_to, itnbr_gu: this.itnbr_gu, c_code: this.g_user.c_code});
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

    //PJT별 발주내역 총집계표
    let api_url6 = "/pdb/pdb13_list6";
    let param6 = JSON.stringify({company_cd: this.g_company[0].COMPANY, plant_cd: this.plant_cd, pjtno: this.pjtno, purno1: this.purno1, purno2: this.purno2, itnbr_cd: this.itnbr_cd, date_fr: this.date_fr, date_to: this.date_to, itnbr_gu: this.itnbr_gu, c_code: this.g_user.c_code});
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

  //탭 페이지 조회
  subRetrive(idx){
    if(idx === "1"){
      //P/O별 발주상세내역
      let api_url1 = "/pdb/pdb13_list1";
      let param1 = JSON.stringify({company_cd: this.g_company[0].COMPANY, plant_cd: this.plant_cd, pjtno: this.pjtno, purno1: this.purno1, purno2: this.purno2, itnbr_cd: this.itnbr_cd, date_fr: this.date_fr, date_to: this.date_to, itnbr_gu: this.itnbr_gu, c_code: this.g_user.c_code});
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
      })
    }else if(idx === "2"){
      //업체별 발주집계표
      let api_url2 = "/pdb/pdb13_list2";
      let param2 = JSON.stringify({company_cd: this.g_company[0].COMPANY, plant_cd: this.plant_cd, pjtno: this.pjtno, purno1: this.purno1, purno2: this.purno2, itnbr_cd: this.itnbr_cd, date_fr: this.date_fr, date_to: this.date_to, itnbr_gu: this.itnbr_gu, c_code: this.g_user.c_code});
      this.apiProvider.data_api(api_url2, param2)
      .then(data => {
        if(Object.keys(data).length === 0){
          if(this.Tab2 === "2"){
            this.alertProvider.call_alert("조회", "검색결과가 없습니다.", "확인");
          }
        }else{
          this.searchCondition = "";
        }
        this.result1 = data;
      });
    }else if(idx === "3"){
      //PJT별 발주집계표
      let api_url3 = "/pdb/pdb13_list3";
      let param3 = JSON.stringify({company_cd: this.g_company[0].COMPANY, plant_cd: this.plant_cd, pjtno: this.pjtno, purno1: this.purno1, purno2: this.purno2, itnbr_cd: this.itnbr_cd, date_fr: this.date_fr, date_to: this.date_to, itnbr_gu: this.itnbr_gu, c_code: this.g_user.c_code});
      this.apiProvider.data_api(api_url3, param3)
      .then(data => {
        if(Object.keys(data).length === 0){
          if(this.Tab3 === "3"){
            this.alertProvider.call_alert("조회", "검색결과가 없습니다.", "확인");
          }
        }else{
          this.searchCondition = "";
        }
        this.result1 = data;
      })
    }else if(idx === "4"){
      //품목별 발주 집계표
      let api_url4 = "/pdb/pdb13_list4";
      let param4 = JSON.stringify({company_cd: this.g_company[0].COMPANY, plant_cd: this.plant_cd, pjtno: this.pjtno, purno1: this.purno1, purno2: this.purno2, itnbr_cd: this.itnbr_cd, date_fr: this.date_fr, date_to: this.date_to, itnbr_gu: this.itnbr_gu, c_code: this.g_user.c_code});
      this.apiProvider.data_api(api_url4, param4)
      .then(data => {
        if(Object.keys(data).length === 0){
          if(this.Tab4 === "4"){
            this.alertProvider.call_alert("조회", "검색결과가 없습니다.", "확인");
          }
        }else{
          this.searchCondition = "";
        }
        this.result1 = data;
      })
    }else if(idx === "5"){
      //업체별 발주내역 총집계표
      let api_url5 = "/pdb/pdb13_list5";
      let param5 = JSON.stringify({company_cd: this.g_company[0].COMPANY, plant_cd: this.plant_cd, pjtno: this.pjtno, purno1: this.purno1, purno2: this.purno2, itnbr_cd: this.itnbr_cd, date_fr: this.date_fr, date_to: this.date_to, itnbr_gu: this.itnbr_gu, c_code: this.g_user.c_code});
      this.apiProvider.data_api(api_url5, param5)
      .then(data => {
        if(Object.keys(data).length === 0){
          if(this.Tab5 === "5"){
            this.alertProvider.call_alert("조회", "검색결과가 없습니다.", "확인");
          }
        }else{
          this.searchCondition = "";
        }
        this.result1 = data;
      })
    }else if(idx === "6"){
      //PJT별 발주내역 총집계표
      let api_url6 = "/pdb/pdb13_list6";
      let param6 = JSON.stringify({company_cd: this.g_company[0].COMPANY, plant_cd: this.plant_cd, pjtno: this.pjtno, purno1: this.purno1, purno2: this.purno2, itnbr_cd: this.itnbr_cd, date_fr: this.date_fr, date_to: this.date_to, itnbr_gu: this.itnbr_gu, c_code: this.g_user.c_code});
      this.apiProvider.data_api(api_url6, param6)
      .then(data => {
        if(Object.keys(data).length === 0){
          if(this.Tab6 === "6"){
            this.alertProvider.call_alert("조회", "검색결과가 없습니다.", "확인");
          }
        }else{
          this.searchCondition = "";
        }
        this.result1 = data;
      })
    }
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

  //상세팝업1
  openDetail1(obj: any){
    this.modalController.create('Pdb13detail1Page', {obj: obj}).present();
  }

  //상세팝업2
  openDetail2(obj: any){
    this.modalController.create('Pdb13detail2Page', {obj: obj}).present();
  }

  //상세팝업3
  openDetail3(obj: any){
    this.modalController.create('Pdb13detail3Page', {obj: obj}).present();
  }

  //상세팝업4
  openDetail4(obj: any){
    this.modalController.create('Pdb13detail4Page', {obj: obj}).present();
  }

}
