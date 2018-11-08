import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { ApiProvider } from '../../../../providers/api';
import { AlertProvider } from '../../../../providers/alert';
import { CommoncodeProvider } from '../../../../providers/commoncode';

/**
 * Generated class for the PopupBuyerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'popup_page',
  templateUrl: 'popup-buyer.html',
})
export class PopupBuyerPage {

  //조회조건
  public g_user;
  public by_cd; //거래처코드
  public by_nm; //거래처명
  public bu_cd; //사업자번호
  public by_prsn; //대표자명
  public ven_user; //담당자명
  public use_gubun; //미사용거래처포함 여부

  //조회결과
  public result = [];

  /* infiniteScroll */
  public page = 1;
  public showInfiniteScroll = true;

  constructor(
              public navCtrl: NavController,
              public navParams: NavParams,
              public viewController: ViewController,
              public alertProvider: AlertProvider,
              public apiProvider: ApiProvider,
              public commoncodeProvider: CommoncodeProvider) {

              //로그인정보 가져오기
              this.g_user = this.commoncodeProvider.getUserInfo();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopupBuyerPage');
  }

  //조회
  retrive(flag){
    if(flag === 'search'){
      this.page = 1;
      this.result = [];
    }
    let api_url = "/common/popup/buyer";
    let param = JSON.stringify({by_cd: this.by_cd, by_nm: this.by_nm, bu_cd: this.bu_cd, by_prsn: this.by_prsn, ven_user: this.ven_user, use_gubun: this.use_gubun, c_code: this.g_user.c_code, page: this.page});
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
      cust_cd: selData.BY_CD,
      cust_nm: selData.BY_NM
    }
    this.viewController.dismiss(data);
  }

  //팝업 닫기
  closeModal(){
    let data = {
      cust_cd : '',
      cust_nm : ''
    }
    this.viewController.dismiss(data);
  }

}
