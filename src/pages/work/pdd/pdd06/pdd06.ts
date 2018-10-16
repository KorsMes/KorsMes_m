import { Component, ViewChild  } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ApiProvider } from '../../../../providers/api';
import { AlertProvider } from '../../../../providers/alert';
import { CommoncodeProvider } from '../../../../providers/commoncode';

import { Chart } from 'chart.js';

/**
 * Generated class for the Pdd06Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pdd06',
  templateUrl: 'pdd06.html',
})
export class PDD06 {

  /* 프로그램 버튼 권한 */
  public acc_btn_add;
  public acc_btn_save;
  public acc_btn_delete;
  public acc_btn_retrive;
  public acc_btn_print;

  /* 조건검색 */
  public g_user;
  public g_company;
  public g_plant;

  public plant_cd; //공장코드


  public date_fr = new Date().getUTCFullYear()+"-"+"01"; //기안일자from


  /* 조회결과 */
  public result1;
  public result2;



  /* bar 차트 선언*/
  @ViewChild('barCanvas') barCanvas;
  barChart: any;

  /* line 차트 선언*/
  @ViewChild('lineCanvas') lineCanvas;
  lineChart: any;

  constructor(
              public navCtrl: NavController,
              public navParams: NavParams,
              public storage: Storage,
              public modalController: ModalController,
              public commoncodeProvider: CommoncodeProvider,
              public alertProvider: AlertProvider,
              public apiProvider: ApiProvider) {

              this.storage.get("[PAGE_AUTH]").then((data) => {
                for(var n in data){
                  if("PDD06" == data[n].PGM_ID){
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
    console.log('ionViewDidLoad Pdd06Page');

}
    //조회
    retrive(){

      //수주건별 분석표 조회
      let api_url1 = "/pdd/pdd06_list1";
      let param1 = JSON.stringify({c_code: this.g_user.c_code, company_cd: this.g_company[0].COMPANY, user_id: this.g_user, plant_cd: this.plant_cd,  yymm: this.date_fr});

      this.apiProvider.data_api(api_url1, param1)
      .then(data => {
        if(Object.keys(data).length === 0){
          this.alertProvider.call_alert("조회", "검색결과가 없습니다.", "확인");
        }
        this.result1 = data;

        let chartlabel1 = this.result1.map(item => item.PJTNO);
        let chartdata1 = this.result1.map(item => item.AMT);
        //let chartlabel1 = this.result1.map(item => item.GBN_NM);


          this.barChart = new Chart(this.barCanvas.nativeElement, {
                  type: 'bar',
                  data: {
                      labels: chartlabel1,
                      datasets: [{
                          label: '수주건별 자재투입 현황 분석표',
                          data: chartdata1
                      }]
                  }
              });
    });

     //월별 분석표 조회
      let api_url2 = "/pdd/pdd06_list2";
      let param2 = JSON.stringify({c_code: this.g_user.c_code, company_cd: this.g_company[0].COMPANY, user_id: this.g_user, plant_cd: this.plant_cd, yymm: '2018'});

      this.apiProvider.data_api(api_url2, param2)
      .then(data => {
        if(Object.keys(data).length === 0){
          this.alertProvider.call_alert("조회", "검색결과가 없습니다.", "확인");
        }
        this.result2 = data;

        let chartlabel2 = this.result2.map(item =>item.MONTH);
        let chartdata2 = this.result2.map(item => item.AMT);


        this.lineChart = new Chart(this.lineCanvas.nativeElement, {

                type: 'line',
                data: {
                    labels: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
                    datasets: [{
                        label: '월별 자재투입 현황 분석표',
                        data: chartdata2
                    }]
                }
            });
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

}
