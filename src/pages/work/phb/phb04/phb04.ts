import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Content } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ApiProvider } from '../../../../providers/api';
import { AlertProvider } from '../../../../providers/alert';
import { CommoncodeProvider } from '../../../../providers/commoncode';

/**
 * Generated class for the Phb04Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'search_page',
  templateUrl: 'phb04.html',
})
export class PHB04 {
  @ViewChild(Content) content: Content;


  /* 통합코드 */
  public commonCode12; //검사자
  public commonCode31; //조치구분
  public commonCode32; //검사결과
  public commonCode33; //불량항목
  public commonCode34; //검사종류
  public commonCode35; //검사구분
  public commonCode36; //공정

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

  public date1 = new Date().getUTCFullYear()+"-"+"01-01"; //검사일자 from
  public date2 = new Date().toISOString(); //검사일자 to

  public task_cd; //공정코드
  public task_nm; //공정명

  public pjtno; //불합격 PJT번호
  public pjtnm; //불합격 PJT명

  public lot_no; //Lot_No

  /* 조회결과 */
  public result;

  /* 전체 필터 색상*/
  borderColor1: string = '#FFDF24';
  borderColor2: string = '#D5D5D5';

  all_search_Color1: string = '#FFDF24';
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
                    if("PHD04" == data[n].PGM_ID){
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

                //검사자 가져오기
                this.commonCode12 = this.commoncodeProvider.getCommonCode12();

                //조치구분 가져오기
                this.commonCode31 = this.commoncodeProvider.getCommonCode31();

                //검사결과 가져오기
                this.commonCode32 = this.commoncodeProvider.getCommonCode32();

                //불량항목 가져오기
                this.commonCode33 = this.commoncodeProvider.getCommonCode33();

                //검사종류 가져오기
                this.commonCode34 = this.commoncodeProvider.getCommonCode34();

                //검사구분 가져오기
                this.commonCode35 = this.commoncodeProvider.getCommonCode35();

                //공정 가져오기
                this.commonCode36 = this.commoncodeProvider.getCommonCode36();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Phb04Page');
  }

  //조회조건 전체 초기화
  condition_yn(yn){
    if(yn === ''){
      this.date1 = new Date().getUTCFullYear()+"-"+"01-01";
      this.date2 = new Date().toISOString();

      this.lot_no = "";

      this.pjtno = "";
      this.pjtnm = "";

      this.task_cd = "";
      this.task_nm = "";
    }
    this.searchCondition = yn;
  }

  //조회조건 불합격PJT번호 정보 초기화
  clear_pjtno3(){
    this.pjtno = null;
    this.pjtnm = null;
  }

  //불합격PJT번호 팝업
  PopupPjtno3(){
    var modal = this.modalController.create('PopupPjtno3Page');
    modal.onDidDismiss(data => {
      this.pjtno = data.pjtno;
      this.pjtnm = data.pjtnm;
    });
    modal.present();
  }

 //조회조건 공정 정보 초기화
  clear_task(){
    this.task_cd = null;
    this.task_nm = null;
  }

  //공정 팝업
  PopupTask(){
    var modal = this.modalController.create('PopupTaskPage');
    modal.onDidDismiss(data => {
      this.task_cd = data.task_cd;
      this.task_nm = data.task_nm;
    });
    modal.present();
  }

 //조회
  retrive(){

    //필수 조회조건 체크
    if(this.date1 > this.date2){
      this.alertProvider.call_alert("조회", "검사일자, 시작일보다 종료일이 작습니다.", "확인");
      return;
    }
    let api_url = "/phb/phb04_list";
    let param = JSON.stringify({company_cd: this.g_company[0].COMPANY, plant_cd: this.plant_cd, date1: this.date1, date2: this.date2, mo_no: this.pjtno, task: this.task_cd, lot_no: this.lot_no, c_code: this.g_user.c_code});
    this.apiProvider.data_api(api_url, param)
    .then(data => {
      if(Object.keys(data).length === 0){
        this.alertProvider.call_alert("조회", "검색결과가 없습니다.", "확인");
      }
      this.result = data;
    });
  }


  //상세팝업
  openDetail(obj: any){
    this.modalController.create('Phb04detailPage', {obj: obj}).present();
  }

  all_btn(){
    this.borderColor1 = '#FFDF24';
    this.borderColor2 = '#D5D5D5';

    this.all_search_Color1 = '#FFDF24';
    this.all_search_Color2 = 'white';

    this.text_color1 = 'white';
    this.text_color2 = '#D5D5D5';
  }

  filter_btn(){
    this.borderColor1 = '#D5D5D5';
    this.borderColor2 = '#FFDF24';

    this.all_search_Color1 = 'white';
    this.all_search_Color2 = '#FFDF24';

    this.text_color1 = '#D5D5D5';
    this.text_color2 = 'white';
  }

}
