import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ApiProvider } from '../../../../providers/api';
import { AlertProvider } from '../../../../providers/alert';
import { CommoncodeProvider } from '../../../../providers/commoncode';

/**
 * Generated class for the PopupItnbrPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'popup_page',
  templateUrl: 'popup-itnbr.html',
})
export class PopupItnbrPage {

  //조회조건 : 품목형태 리스트
  public iform_list;

  //조회조건
  public g_user;
  public g_company; //회사정보
  public itnbr = ""; //품목코드
  public itnbr_nm = ""; //품목명칭
  public spec1 = ""; //규격1
  public jijic = ""; //재질/형명
  public iform = ""; // 품목형태

  //품목코드 조회 결과 (리스트)
  public result = [];

  /* infiniteScroll */
  public page = 1;

  constructor(
              public navCtrl: NavController,
              public navParams: NavParams,
              public apiProvider: ApiProvider,
              public alertProvider: AlertProvider,
              public commoncodeProvider: CommoncodeProvider,
              public viewController: ViewController,
              public storage: Storage) {


              //로그인정보 가져오기
              this.g_user = this.commoncodeProvider.getUserInfo();

              //회사코드 가져오기
              this.g_company = this.commoncodeProvider.getCompanyInfo();

              let api_url = "/common/component/getIform";
              let param = JSON.stringify({c_code: this.g_user.c_code});
              this.apiProvider.data_api(api_url, param)
              .then(data => {
                if(Object.keys(data).length === 0){
                  this.alertProvider.call_alert("조회", "검색결과가 없습니다.", "확인");
                }
                this.iform_list = data;
              });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopupItnbrPage');
  }

  //조회
  retrive(){
    let api_url = "/common/popup/itnbr";
    let param = JSON.stringify({itnbr: this.itnbr, itnbr_nm: this.itnbr_nm, spec1: this.spec1, jijic: this.jijic, iform: this.iform, company_cd: this.g_company[0].COMPANY, c_code: this.g_user.c_code, page: this.page});
    this.apiProvider.data_api(api_url, param)
    .then(data => {
      if(Object.keys(data).length === 0){
        this.alertProvider.call_alert("조회", "검색결과가 없습니다.", "확인");
      }
      for(let v in data){
        if(Math.floor(30*Math.floor(this.page-1)) < Math.floor(Math.floor(v)+1)){
          this.result.push(data[v]);
        }
      }
    });
  }

  //로딩 스크롤
  loadMore(infiniteScroll) {
    this.page++;
    setTimeout(() =>{
      this.retrive();
      infiniteScroll.complete();
    }, 1000);
  };

  //리스트 선택 시
  selectItem(selData){
    let data = {
      itnbr_cd: selData.ITNBR,
      itnbr_nm: selData.ITDSC
    }
    this.viewController.dismiss(data);
  }

  //팝업 닫기
  closeModal(){
    let data = {
      itnbr_cd : '',
      itnbr_nm : ''
    }
    this.viewController.dismiss(data);
  }


}
