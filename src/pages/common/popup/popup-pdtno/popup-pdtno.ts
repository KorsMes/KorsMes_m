import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ApiProvider } from '../../../../providers/api';
import { AlertProvider } from '../../../../providers/alert';
import { CommoncodeProvider } from '../../../../providers/commoncode';

/**
 * Generated class for the PopupPdtnoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'popup_page',
  templateUrl: 'popup-pdtno.html',
})
export class PopupPdtnoPage {

  public date = new Date();

  //조회조건
  public g_user;
  public g_company; //회사정보
  public g_plant; //공장정보

  public plant_cd;

  public pjtno;
  public pjtnm;
  public date1 = new Date().getUTCFullYear()+"-"+"01-01"; //수주일자fr
  public date2 = new Date().toISOString(); //수주일자to

  /* 조회결과 */
  public result = [];

  /* infiniteScroll */
  public page = 1;
  public showInfiniteScroll = true;

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

              //공장코드 가져오기
              this.g_plant = this.commoncodeProvider.getPlantInfo();
              this.plant_cd = this.g_plant[0].PLANT;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopupPdtnoPage');
  }



  //조회
  retrive(flag){
    if(flag === 'search'){
      this.page = 1;
      this.result = [];
    }

    //필수 조회조건 체크
    if(this.date1 > this.date2){
      this.alertProvider.call_alert("조회", "수주일자, 시작일보다 종료일이 작습니다.", "확인");
      return;
    }

    let api_url = "/common/popup/pdtno_list";
    let param = JSON.stringify({company_cd: this.g_company[0].COMPANY, plant_cd: this.plant_cd, date1: this.date1, date2: this.date2, pjtno: this.pjtno, pjtnm: this.pjtnm, c_code: this.g_user.c_code, page: this.page});
    this.apiProvider.data_api(api_url, param)
    .then(data => {
      if(Object.keys(data).length === 0){
        this.alertProvider.call_alert("조회", "검색결과가 없습니다.", "확인");
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

  //리스트 선택 시
  selectItem(selData){
    let data = {
      pjtno: selData.PJTNO,
      pjtnm: selData.PJTNM
    }
    this.viewController.dismiss(data);
  }

  //팝업 닫기
  closeModal(){
    let data = {
      pjtno : '',
      pjtnm : ''
    }
    this.viewController.dismiss(data);
  }


}
