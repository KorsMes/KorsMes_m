import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ApiProvider } from '../../../../providers/api';
import { AlertProvider } from '../../../../providers/alert';

/**
 * Generated class for the PopupItnbr2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-popup-itnbr2',
  templateUrl: 'popup-itnbr2.html',
})
export class PopupItnbr2Page {

  //조회조건
  public company_cd; //회사코드

  public itcls_list; //제품군 select box
  public mccod_list; //내외자구분 select box
  public itemtype_list; //품목형태 select box

  public item_cd; //품번
  public jijic; //형명
  public item_nm; //품명
  public itcls_pro; //물품분류
  public spec1; //규격
  public jejos; //제조회사

  public itcls_cd = ""; //제품군
  public mccod_cd = ""; //내외자구분
  public itemtype_cd = ""; //품목형태

  public test;

  //조회결과
  public result;

  constructor(
                public navCtrl: NavController,
                public navParams: NavParams,
                public viewController: ViewController,
                public apiProvider: ApiProvider,
                public alertProvider: AlertProvider,
                public modalController: ModalController,
                public storage: Storage) {

                this.storage.get("[COMPANY]").then((data) => {
                  this.company_cd = data.company_cd;
                });

                //제품군 리스트 select box
                let api_url1 = "/common/component/getItcls";
                let param1 = JSON.stringify({a:"abc"});
                this.apiProvider.data_api(api_url1, param1)
                .then(data => {
                  this.itcls_list = data;
                });

                //내외자구분 리스트 select box
                let api_url2 = "/common/component/getMccod";
                let param2 = JSON.stringify({a:"abc"});
                this.apiProvider.data_api(api_url2, param2)
                .then(data => {
                  this.mccod_list = data;
                });

                //품목형태 리스트 select box
                let api_url3 = "/common/component/getItemtype";
                let param3 = JSON.stringify({a:"abc"});
                this.apiProvider.data_api(api_url3, param3)
                .then(data => {
                  this.itemtype_list = data;
                });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopupItnbr2Page');
  }




  //조회
  retrive(){
    let api_url = "/common/popup/itnbr_list2";
    let param = JSON.stringify({
                                  company_cd: this.company_cd,
                                  item_cd: this.item_cd,
                                  jijic: this.jijic,
                                  item_nm: this.item_nm,
                                  itcls_pro: this.itcls_pro,
                                  spec1: this.spec1,
                                  jejos: this.jejos,
                                  itcls_cd: this.itcls_cd,
                                  mccod_cd: this.mccod_cd,
                                  itemtype_cd: this.itemtype_cd
                               });
    this.apiProvider.data_api(api_url, param)
    .then(data => {
      if(Object.keys(data).length === 0){
        this.alertProvider.call_alert("조회", "검색결과가 없습니다.", "확인");
      }else{
        this.result = data;
      }
    });
  }

  //리스트 선택 시
  selectItem(selData){
    let data = {
      itnbr_cd2: selData.ITNBR,
      itnbr_nm2: selData.NAME
    }
    this.viewController.dismiss(data);
  }

  //팝업 닫기
  closeModal(){
    let data = {
      itnbr_cd2 : '',
      itnbr_nm2 : ''
    }
    this.viewController.dismiss(data);
  }


  testabc(){
    if(this.test === "0"){
      this.test = "";
    }else{
      this.test = "0";
    }
  }

}
