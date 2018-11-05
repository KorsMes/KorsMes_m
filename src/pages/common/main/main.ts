import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Content } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { CompanyProvider } from '../../../providers/company';
import { AlertProvider } from '../../../providers/alert';
import { ApiProvider } from '../../../providers/api';
import { CommoncodeProvider } from '../../../providers/commoncode';

import { HomePage } from '../home/home';

/**
 * Generated class for the MainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {
  @ViewChild(Content) content: Content;

  userInfo: any;
  public g_company;
  public g_user;
  public g_plant;
  public companyInfo;

  /* 조회조건 */
  public company_cd;
  public plant_cd;

  public fr_yymm = new Date().getUTCFullYear()+"-"+"01-01"; //수주년월
  public to_yymm = new Date().toISOString(); //수주년월

  public pjtno; //pjt번호
  public pjtnm; //pjt명

  public status; //견적상태

  public commonCode13; //거래처
  public commonCode14; //영업부서
  public commonCode15; //영업담당
  public commonCode38; //설치지역
  public commonCode39; //생산구분
  public commonCode40; //주문구분
  public commonCode41; //계약유무
  public commonCode42; //수주구분
  public commonCode43; //사업구분
  public commonCode44; //결재조건

  /* 조회결과 */
  public result;

  /* title img */
  public company_logo;

  constructor(
                public navController: NavController,
                public navParams: NavParams,
                public storage: Storage,
                public alertProvider: AlertProvider,
                public apiProvider:ApiProvider,
                public companyProvider: CompanyProvider,
                public modalController: ModalController,
                public commoncodeProvider: CommoncodeProvider) {

                //로그인정보 가져오기
                this.g_user = this.commoncodeProvider.getUserInfo();

                //회사코드 가져오기
                this.g_company = this.commoncodeProvider.getCompanyInfo();

                //공장코드 가져오기
                this.g_plant = this.commoncodeProvider.getPlantInfo();
                this.plant_cd = this.g_plant[0].PLANT;

                //회사리스트 가져오기
                this.companyInfo = this.companyProvider.getCompanyInfo();

                this.company_logo = "../../../assets/imgs/company_logo/"+this.g_user.c_code+".png";

                let api_url = "/sea/sea02_list";
                let param = JSON.stringify({company_cd: this.g_company[0].COMPANY, plant_cd: this.plant_cd, pjtno_fr: this.pjtno, pjtno_to: this.pjtno, status: this.status, fr_yymm: this.fr_yymm, to_yymm: this.to_yymm, c_code: this.g_user.c_code});

                this.apiProvider.data_api(api_url, param)
                .then(data => {
                  this.result = data;

                  return;
                });

                  //거래처 가져오기
                  this.commonCode13 = this.commoncodeProvider.getCommonCode13();
                  //영업부서 가져오기
                  this.commonCode14 = this.commoncodeProvider.getCommonCode14();
                  //영업담당 가져오기
                  this.commonCode15 = this.commoncodeProvider.getCommonCode15();
                  //설치지역 가져오기
                  this.commonCode38 = this.commoncodeProvider.getCommonCode38();
                  //생산구분 가져오기
                  this.commonCode39 = this.commoncodeProvider.getCommonCode39();
                  //주문구분 가져오기
                  this.commonCode40 = this.commoncodeProvider.getCommonCode40();
                  //계약유무 가져오기
                  this.commonCode41 = this.commoncodeProvider.getCommonCode41();
                  //수주구분 가져오기
                  this.commonCode42 = this.commoncodeProvider.getCommonCode42();
                  //사업구분 가져오기
                  this.commonCode43 = this.commoncodeProvider.getCommonCode43();
                  //결재조건 가져오기
                  this.commonCode44 = this.commoncodeProvider.getCommonCode44();

  }

  ionViewDidLoad() {
    this.userInfo = this.commoncodeProvider.getUserInfo();
    if(this.userInfo === null){
      this.navController.setRoot(HomePage);
    }
  }

  quickPage(page, pagetitle){

    var page_access_check = false;

    this.storage.get("[PAGE_AUTH]").then((result) => {
      for(var w in result){
        if(page === result[w].PGM_ID){
          page_access_check = true;
        }
      }

      if(page_access_check){
        this.navController.push(page);
      }else{
        this.alertProvider.call_alert("접근", pagetitle + "의 권한이 없습니다.", "확인");
      }
    });
  }

  retrive(){
    let api_url = "/sea/sea02_list";
    let param = JSON.stringify({company_cd: this.g_company[0].COMPANY, plant_cd: this.plant_cd, pjtno_fr: this.pjtno, pjtno_to: this.pjtno, status: this.status, fr_yymm: this.fr_yymm, to_yymm: this.to_yymm, c_code: this.g_user.c_code});

    this.apiProvider.data_api(api_url, param)
    .then(data => {
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
}
