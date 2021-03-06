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
  selector: 'search_page',
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
  public result1; //바차트 데이터
  public result2; //라인차트 데이터

  public result3; //바차트 상세 데이터 리스트
  public result4; //라인차트 상세 데이터 리스트

  public result5; //바차트 상세 데이터(show)
  public result6; //라인차트 상세 데이터(show)

  public pjtno_arr;

  /* 바 차트 색상정리 */
  public bar_bg1;
  public bar_border1;
  public bar_bg2;
  public bar_border2;
  public bar_bg3;
  public bar_border3;
  public bar_bg4;
  public bar_border4;

  /* 바 차트 사이즈정의 */
  public responsive_width = "100%";
  public responsive_height = "200px";

  /* 탭 페이지 */
  public Tab1 = "1";
  public Tab2;

  /*버튼 색상 변경*/
  buttonColor1: string = '#FFDF24';
  buttonColor2: string = 'white';

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


              this.retrive();
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad Pdd06Page');
  }



  //조회
  retrive(){
    if(this.Tab1 === "1"){
      this.result3 = null;
      this.result5 = null;

      //수주건별 분석표 조회
      let api_url1 = "/pdd/pdd06_list1";
      let param1 = JSON.stringify({c_code: this.g_user.c_code, company_cd: this.g_company[0].COMPANY, user_id: this.g_user, plant_cd: this.plant_cd,  yymm: this.date_fr});

      this.apiProvider.data_api(api_url1, param1)
      .then(data => {
        if(Object.keys(data).length === 0){
          //this.alertProvider.call_alert("조회", "검색결과가 없습니다.", "확인");
        }

        this.result1 = data;

        if(this.result1.length > 0){
          //차트 데이터셋 세팅
          this.pjtno_arr = new Array(Math.floor(this.result1.length / 4));
          var amt1_arr:number[] = new Array(Math.floor(this.result1.length / 4));
          var amt2_arr:number[] = new Array(Math.floor(this.result1.length / 4));
          var amt3_arr:number[] = new Array(Math.floor(this.result1.length / 4));
          var amt4_arr:number[] = new Array(Math.floor(this.result1.length / 4));

          this.bar_bg1 = new Array(Math.floor(this.result1.length / 4));
          this.bar_border1 = new Array(Math.floor(this.result1.length / 4));
          this.bar_bg2 = new Array(Math.floor(this.result1.length / 4));
          this.bar_border2 = new Array(Math.floor(this.result1.length / 4));
          this.bar_bg3 = new Array(Math.floor(this.result1.length / 4));
          this.bar_border3 = new Array(Math.floor(this.result1.length / 4));
          this.bar_bg4 = new Array(Math.floor(this.result1.length / 4));
          this.bar_border4 = new Array(Math.floor(this.result1.length / 4));

          //차트 데이터 세팅
          for(var i=0; i<this.result1.length; i++){
            if((i % 4) === 0){
              this.pjtno_arr[i/4] = data[i].PJTNO;
              this.bar_bg1[i/4] = 'rgba(228, 108, 10, 0.5)';
              this.bar_border1[i/4] = 'rgba(228, 108, 10, 0)';
              this.bar_bg2[i/4] = 'rgba(197, 224, 180, 0.5)';
              this.bar_border2[i/4] = 'rgba(197, 224, 180, 0)';
              this.bar_bg3[i/4] = 'rgba(0, 176, 240, 0.5)';
              this.bar_border3[i/4] = 'rgba(0, 176, 240, 0)';
              this.bar_bg4[i/4] = 'rgba(255, 230, 153, 0.5)';
              this.bar_border4[i/4] = 'rgba(255, 230, 153, 0)';
            }


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

          this.responsive_width = Math.floor(this.result1.length / 4) * 80 + "px";
          this.responsive_height = Math.floor(this.result1.length / 4) * 40 + "px";

          if(Math.floor(this.result1.length / 4) * 100 <= 360){
            this.responsive_width = "100%";
            this.responsive_height = "200px";
          }

          if(Math.floor(this.result1.length / 4) * 50 <= 200){
            this.responsive_width = "100%";
            this.responsive_height = "200px";
          }


        }else{
          this.pjtno_arr = null;
        }

        if (this.barChart) this.barChart.destroy();
        this.barChart = new Chart(this.barCanvas.nativeElement.getContext("2d"),{
          type: 'bar',
          data:
           {
            labels: this.pjtno_arr,
            datasets: [{
                          label: '수주금액',
                          data: amt1_arr,
                          backgroundColor: this.bar_bg1,
                          borderColor: this.bar_border1,
                          borderWidth: 1
                        },
                        {
                          label: '목표예산',
                          data: amt2_arr,
                          backgroundColor: this.bar_bg2,
                          borderColor: this.bar_border2,
                          borderWidth: 1
                        },
                        {
                          label: '요구금액',
                          data: amt3_arr,
                          backgroundColor: this.bar_bg3,
                          borderColor: this.bar_border3,
                          borderWidth: 1
                        },
                        {
                           label: '발주금액',
                           data: amt4_arr,
                           backgroundColor: this.bar_bg4,
                           borderColor: this.bar_border4,
                           borderWidth: 1
                        }],
          },
          options : {
            legend:{
              display: true,
              position: 'bottom',
              labels : {
                boxWidth: 13,
                fontSize: 10
              }
            },
            scales: {
              yAxes: [{
                ticks: {
                  display: false
                }
              }],
              xAxes: [{
                ticks: {
                  fontSize: 10
                }
              }]
            },
            onClick:(clickEvt,activeElems)=>this.onChartClick(clickEvt,activeElems)
          }
        });


        //최초 조회 시 상세 정보 불러오기
        if(this.result1.length > 0){
          let detail_url1 = "/pdd/pdd06_detail1";
          let detail_param1 = JSON.stringify({c_code: this.g_user.c_code, company_cd: this.g_company[0].COMPANY, user_id: this.g_user, plant_cd: this.plant_cd, yymm: this.date_fr});

          this.apiProvider.data_api(detail_url1, detail_param1)
          .then(data => {
            this.result3 = data;

            if(this.result3.length > 0){
              this.result5 = data[0];
            }
          });
        }

      });
    }


    if(this.Tab2 === "2"){
      this.result4 = null;
      this.result6 = null;

      //월별 분석표 조회
      let api_url2 = "/pdd/pdd06_list2";
      let param2 = JSON.stringify({c_code:this.g_user.c_code, company_cd: this.g_company[0].COMPANY, user_id: this.g_user, plant_cd: this.plant_cd, yymm: this.date_fr});

      this.apiProvider.data_api(api_url2, param2)
      .then(data => {
        if(Object.keys(data).length === 0){
          this.alertProvider.call_alert("조회", "검색결과가 없습니다.", "확인");
        }
        this.result2 = data;

        if(this.result2.length > 0){
                //차트 데이터셋 세팅
                var month_arr = new Array(Math.floor(this.result2.length / 4));
                var amt5_arr:number[] = new Array(12);
                var amt6_arr:number[] = new Array(12);
                var amt7_arr:number[] = new Array(12);
                var amt8_arr:number[] = new Array(12);

                //차트 데이터 세팅
                for(var i=0; i<this.result2.length; i++){
                  if(i < month_arr.length){
                    month_arr[i] = data[i].MONTH;
                  }
                  if(data[i].GBN_NM === '수주금액'){
                    amt5_arr[Math.floor((i % 12))] = data[i].AMT;
                  }
                  if(data[i].GBN_NM === '목표예산'){
                    amt6_arr[Math.floor((i % 12))] = data[i].AMT;
                  }
                  if(data[i].GBN_NM === '요구금액'){
                    amt7_arr[Math.floor((i % 12))] = data[i].AMT;
                  }
                  if(data[i].GBN_NM === '발주금액'){
                    amt8_arr[Math.floor((i % 12))] = data[i].AMT;
                  }
                }

                var tot_arr = new Array(4);
                tot_arr[0] = amt5_arr;
                tot_arr[1] = amt6_arr;
                tot_arr[2] = amt7_arr;
                tot_arr[3] = amt8_arr;

              }

        if (this.lineChart) this.lineChart.destroy();
        this.lineChart = new Chart(this.lineCanvas.nativeElement.getContext("2d"), {
          type: 'line',
          data:
             {
              labels: month_arr,
              datasets: [{
                            label: '수주금액',
                            data: amt5_arr,
                            backgroundColor: [
                              'rgba(228, 108, 10, 0)',
                              'rgba(228, 108, 10, 0)',
                              'rgba(228, 108, 10, 0)',
                              'rgba(228, 108, 10, 0)'
                            ],
                            borderColor: [
                              'rgba(228, 108, 10, 1)',
                              'rgba(228, 108, 10, 1)',
                              'rgba(228, 108, 10, 1)',
                              'rgba(228, 108, 10, 1)'
                            ],
                            pointBackgroundColor: 'rgba(228, 108, 10, 1)',
                            pointBorderColor: 'rgba(228, 108, 10, 1)',
                            borderWidth: 1
                          },
                          {
                            label: '목표예산',
                            data: amt6_arr,
                            backgroundColor: [
                              'rgba(197, 224, 180, 0)',
                              'rgba(197, 224, 180, 0)',
                              'rgba(197, 224, 180, 0)',
                              'rgba(197, 224, 180, 0)'
                            ],
                            borderColor: [
                              'rgba(197, 224, 180, 1)',
                              'rgba(197, 224, 180, 1)',
                              'rgba(197, 224, 180, 1)',
                              'rgba(197, 224, 180, 1)'
                            ],
                            pointBackgroundColor: 'rgba(197, 224, 180, 1)',
                            pointBorderColor: 'rgba(197, 224, 180, 1)',
                            borderWidth: 1
                          },
                          {
                            label: '요구금액',
                            data: amt7_arr,
                            backgroundColor: [
                              'rgba(0, 176, 240, 0)',
                              'rgba(0, 176, 240, 0)',
                              'rgba(0, 176, 240, 0)',
                              'rgba(0, 176, 240, 0)'
                            ],
                            borderColor: [
                              'rgba(0, 176, 240, 1)',
                              'rgba(0, 176, 240, 1)',
                              'rgba(0, 176, 240, 1)',
                              'rgba(0, 176, 240, 1)'
                            ],
                            pointBackgroundColor: 'rgba(0, 176, 240, 1)',
                            pointBorderColor: 'rgba(0, 176, 240, 1)',
                            borderWidth: 1
                          },
                          {
                            label: '발주금액',
                            data: amt8_arr,
                            backgroundColor: [
                              'rgba(255, 230, 153, 0)',
                              'rgba(255, 230, 153, 0)',
                              'rgba(255, 230, 153, 0)',
                              'rgba(255, 230, 153, 0)'
                            ],
                            borderColor: [
                              'rgba(255, 230, 153, 1)',
                              'rgba(255, 230, 153, 1)',
                              'rgba(255, 230, 153, 1)',
                              'rgba(255, 230, 153, 1)'
                            ],
                            pointBackgroundColor: 'rgba(255, 230, 153, 1)',
                            pointBorderColor: 'rgba(255, 230, 153, 1)',
                            borderWidth: 1
                          }],
            },
            options : {
              tooltips: {
                mode: 'point'
              },
              legend:{
                position: 'bottom',
                labels : {
                  boxWidth: 13,
                  fontSize: 10
                }
              },
              scales: {
                yAxes: [{
                  ticks: {
                    display: false
                  }
                }],
                xAxes: [{
                  ticks: {
                    fontSize: 10
                  }
                }]
              },
              onClick:(clickEvt,activeElems)=>this.onChartClick2(clickEvt,activeElems)
            }
        });

        //최초 조회 시 상세 정보 불러오기
        if(this.result2.length > 0){
          let detail_url2 = "/pdd/pdd06_detail2";
          let detail_param2 = JSON.stringify({c_code: this.g_user.c_code, company_cd: this.g_company[0].COMPANY, user_id: this.g_user, plant_cd: this.plant_cd, yymm: this.date_fr});

          this.apiProvider.data_api(detail_url2, detail_param2)
          .then(data => {
            this.result4 = data;

            if(this.result4.length > 0){
              for(var l=0; l<this.result4.length; l++){
                if(this.result2[0].YYMM === this.result4[l].YYYYMM){
                  this.result6 = this.result4[l];
                  return;
                }else{
                  this.result6 = null;
                }
              }
            }
          });
        }
      });
    }

  }

  //바차트 클릭 시 상세 정보 조회
  y_clicked = null; //holds y-axis .getValueForPixel() when chart is clicked
  x_clicked = null;
  timeoutID = null; //handle to setTimeout
  onChartClick(clickEvt:MouseEvent,activeElems:Array<any>){
    if(activeElems && activeElems.length) return;

    let mousePoint = Chart.helpers.getRelativePosition(clickEvt, this.barChart.chart);
    let clickY = this.barChart.scales['y-axis-0'].getValueForPixel(mousePoint.y);
    this.y_clicked = clickY;
    let clickX = this.barChart.scales['x-axis-0'].getValueForPixel(mousePoint.x);
    this.x_clicked = clickX;
    if(this.timeoutID) clearTimeout(this.timeoutID);
    this.timeoutID = setTimeout(()=>this.y_clicked=null,2000);

    if(this.pjtno_arr == null){
      return;
    }

    if(this.x_clicked > this.pjtno_arr.length -1){
      return;
    }

    this.result5 = this.result3[this.x_clicked];
  }

  //라인차트 클릭 시 상세 정보 조회
  x_clicked2 = null;
  onChartClick2(clickEvt2:MouseEvent,activeElems2:Array<any>){
    if(activeElems2 && activeElems2.length) return;

    let mousePoint2 = Chart.helpers.getRelativePosition(clickEvt2, this.lineChart.chart);
    let clickX2 = this.lineChart.scales['x-axis-0'].getValueForPixel(mousePoint2.x);
    this.x_clicked2 = clickX2;

    if(this.result2 == null){
      return;
    }

    if(this.x_clicked2 > this.result2.length -1){
      return;
    }


    for(var l=0; l<this.result4.length; l++){
      if(this.result2[this.x_clicked2].YYMM === this.result4[l].YYYYMM){
        this.result6 = this.result4[l];
        return;
      }else{
        this.result6 = null;
      }
    }

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
    this.retrive();
  }

  //버튼 컬러 change
  btn_change1(){
    this.buttonColor1 = '#FFDF24';
    this.buttonColor2 = 'white';
  }

  btn_change2(){
    this.buttonColor1 = 'white';
    this.buttonColor2 = '#FFDF24';
  }

}
