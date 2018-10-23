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
  public g_user; //로그인정보
  public g_company; //회사정보
  public g_plant; //공장정보

  public plant_cd; //공장코드

  public date_fr = new Date().getUTCFullYear()+"-"+"01"; //기안일자from


  /* 조회결과 */
  public result1;
  public result2;

  public detail_result;

  public pjtno_arr;

  /* 상세정보1 */
  public pjtnm1;
  public pjtno1;
  public amt1;
  public amt2;
  public amt3;
  public amt4;
  public amt5;
  public amt6;
  public amt7;
  public rto2;
  public rto3;
  public rto4;
  public rto5;
  public rto6;
  public rto7;

  /* 탭 페이지 */
  public Tab1 = "1";
  public Tab2;

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


      if(this.result1.length > 0){
        this.pjtno_arr = new Array(Math.floor(this.result1.length / 4));
        var amt1_arr:number[] = new Array(Math.floor(this.result1.length / 4));
        var amt2_arr:number[] = new Array(Math.floor(this.result1.length / 4));
        var amt3_arr:number[] = new Array(Math.floor(this.result1.length / 4));
        var amt4_arr:number[] = new Array(Math.floor(this.result1.length / 4));

        for(var i=0; i<this.result1.length; i++){
          if((i % 4) === 0){
            this.pjtno_arr[i/4] = data[i].PJTNO;
          }

          console.log("qwerqwerwqer : " + this.pjtno_arr.length);

          if(data[i].GBN_NM === '수주금액'){
            amt1_arr[Math.floor(i/4)] = data[i].AMT;
          }
          if(data[i].GBN_NM === '목표예산'){
            amt2_arr[Math.floor(i/4)] = data[i].AMT;
          }
          if(data[i].GBN_NM === '요구금액'){
            amt3_arr[Math.floor(i/4)] = data[i].AMT;
          }
          if(data[i].GBN_NM === '발주금액'){
            amt4_arr[Math.floor(i/4)] = data[i].AMT;
          }
        }

      }

      this.barChart = new Chart(this.barCanvas.nativeElement.getContext("2d"),{
        type: 'bar',
        data:
         {
          labels: this.pjtno_arr,
          datasets: [{
                        label: '수주금액',
                        data: amt1_arr,
                        backgroundColor: [
                            'rgba(255, 0, 0, 1)',
                            'rgba(255, 0, 0, 1)',
                            'rgba(255, 0, 0, 1)',
                            'rgba(255, 0, 0, 1)'
                        ],
                        borderColor: [
                            'rgba(255, 0, 0, 1)',
                            'rgba(255, 0, 0, 1)',
                            'rgba(255, 0, 0, 1)',
                            'rgba(255, 0, 0, 1)'
                        ],
                        borderWidth: 1
                      },
                      {
                        label: '목표예산',
                        data: amt2_arr,
                        backgroundColor: [
                            'rgba(0, 255, 0, 1)',
                            'rgba(0, 255, 0, 1)',
                            'rgba(0, 255, 0, 1)',
                            'rgba(0, 255, 0, 1)'
                        ],
                        borderColor: [
                            'rgba(0, 255, 0, 1)',
                            'rgba(0, 255, 0, 1)',
                            'rgba(0, 255, 0, 1)',
                            'rgba(0, 255, 0, 1)'
                        ],
                        borderWidth: 1
                      },
                      {
                        label: '요구금액',
                        data: amt3_arr,
                        backgroundColor: [
                            'rgba(0, 0, 255, 1)',
                            'rgba(0, 0, 255, 1)',
                            'rgba(0, 0, 255, 1)',
                            'rgba(0, 0, 255, 1)'
                        ],
                        borderColor: [
                            'rgba(0, 0, 255, 1)',
                            'rgba(0, 0, 255, 1)',
                            'rgba(0, 0, 255, 1)',
                            'rgba(0, 0, 255, 1)'
                        ],
                        borderWidth: 1
                      },
                      {
                         label: '발주금액',
                         data: amt4_arr,
                         backgroundColor: [
                            'rgba(255, 205, 18, 1)',
                            'rgba(255, 205, 18, 1)',
                            'rgba(255, 205, 18, 1)',
                            'rgba(255, 205, 18, 1)'
                        ],
                        borderColor: [
                            'rgba(255, 205, 18, 1)',
                            'rgba(255, 205, 18, 1)',
                            'rgba(255, 205, 18, 1)',
                            'rgba(255, 205, 18, 1)'
                        ],
                        borderWidth: 1
                      }],
        },
        options : {
          legend:{display:true},
          onClick:(clickEvt,activeElems)=>this.onChartClick(clickEvt,activeElems),
        }
      });
    });
  }

  y_clicked = null; //holds y-axis .getValueForPixel() when chart is clicked
  x_clicked = null;
  timeoutID = null; //handle to setTimeout
  numOfBars = 5; //how many horizontal bars to chart

  onChartClick(clickEvt:MouseEvent,activeElems:Array<any>){
    if(activeElems && activeElems.length) return;

    let mousePoint = Chart.helpers.getRelativePosition(clickEvt, this.barChart.chart);
    let clickY = this.barChart.scales['y-axis-0'].getValueForPixel(mousePoint.y);
    this.y_clicked = clickY;
    let clickX = this.barChart.scales['x-axis-0'].getValueForPixel(mousePoint.x);
        this.x_clicked = clickX;
    if(this.timeoutID) clearTimeout(this.timeoutID);
    this.timeoutID = setTimeout(()=>this.y_clicked=null,2000);

    console.log(this.x_clicked + " : " + this.y_clicked + " : " + this.timeoutID);


    let detail_url = "/pdd/pdd06_detail1";
    let detail_param = JSON.stringify({c_code: this.g_user.c_code, company_cd: this.g_company[0].COMPANY, user_id: this.g_user, plant_cd: this.plant_cd, yymm: this.date_fr, pjtno: this.pjtno_arr[this.x_clicked]});

    this.apiProvider.data_api(detail_url, detail_param)
    .then(data => {
      if(Object.keys(data).length === 0){
        this.alertProvider.call_alert("조회", "검색결과가 없습니다.", "확인");
      }
      this.detail_result = data[0];
      this.pjtnm1 = this.detail_result.PJTNM;
      this.pjtno1 = this.detail_result.PJTNO;
      this.amt1 = this.detail_result.AMT;

      this.detail_result = data[1];
      this.amt2 = this.detail_result.AMT;

      this.detail_result = data[2];
      this.rto2 = this.detail_result.AMT;

      this.detail_result = data[3];
      this.amt3 = this.detail_result.AMT;

      this.detail_result = data[4];
      this.rto3 = this.detail_result.AMT;

      this.detail_result = data[5];
      this.amt4 = this.detail_result.AMT;

      this.detail_result = data[6];
      this.rto4 = this.detail_result.AMT;

      this.detail_result = data[7];
      this.amt5 = this.detail_result.AMT;

      this.detail_result = data[8];
      this.rto5 = this.detail_result.AMT;

      this.detail_result = data[9];
      this.amt6 = this.detail_result.AMT;

      this.detail_result = data[10];
      this.rto6 = this.detail_result.AMT;

      this.detail_result = data[11];
      this.amt7 = this.detail_result.AMT;

      this.detail_result = data[12];
      this.rto7 = this.detail_result.AMT;



      console.log(this.detail_result.PJTNM);

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
