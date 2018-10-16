import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the CommoncodeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CommoncodeProvider {

  /* 로그인정보 */
  public user_nm;
  public user_id;
  public user_pswd;
  public c_code; //접속 회사코드
  public c_name; //접속 회사명

  /* 공통코드 */
  public companyInfo; //회사정보
  public plantInfo; //공장정보
  public commonCode1; //단위
  public commonCode2; //조달구분
  public commonCode3; //통화
  public commonCode4; //품목형태
  public commonCode5; //발의자
  public commonCode6; //계정과목
  public commonCode7; //증빙자료
  public commonCode8; //부서
  public commonCode9; //사업구분
  public commonCode10; //현재상태
  public commonCode11; //발주처
  public commonCode12; //담당자
  public commonCode13; //거래처
  public commonCode14; //영업부서
  public commonCode15; //영업담당
  public commonCode16; //제품코드
  public commonCode17; //수금구분
  public commonCode18; //입금구분
  public commonCode19; //지급처
  public commonCode20; //발주형태
  public commonCode21; //지불방법
  public commonCode22; //조달구분
  public commonCode23; //내외자
  public commonCode24; //품목형태
  public commonCode25; //제품군
  public commonCode26; //검사구분
  public commonCode27; //상태
  public commonCode28; //품목구분
  public commonCode29; //입고유형
  public commonCode30; //상태
  public commonCode31; //조치구분
  public commonCode32; //검사결과
  public commonCode33; //불량항목
  public commonCode34; //검사종류
  public commonCode35; //검사구분
  public commonCode36; //공정
  public commonCode37; //견적상태



  constructor(public http: HttpClient) {
    console.log('Hello CommoncodeProvider Provider');
  }

  /* 공통모듈 SET START */

  //사용자(로그인)
  setUserInfo(user_id,user_nm,user_pswd,c_code,c_name){
    this.user_id = user_id;
    this.user_nm = user_nm;
    this.user_pswd = user_pswd;
    this.c_code = c_code;
    this.c_name = c_name;
  }

  //회사
  setCompanyInfo(code1){
    let SERVER_URL = "http://192.168.0.18:3030/common/getCompanyInfo";
    let param = JSON.stringify({c_code: code1});
    return new Promise((resolve, reject) => {
      this.http.post(SERVER_URL, param)
      .subscribe(res => {
        this.companyInfo = res;
      }, (err) =>{
        reject(err);
        console.log(err);
      });
    });
  }

  //공장
  setPlantInfo(code1){
    let SERVER_URL = "http://192.168.0.18:3030/common/getPlantInfo";
    let param = JSON.stringify({c_code: code1});
    return new Promise((resolve, reject) => {
      this.http.post(SERVER_URL, param)
      .subscribe(res => {
        this.plantInfo = res;
      }, (err) =>{
        reject(err);
        console.log(err);
      });
    });
  }

  //단위
  setCommonCode1(code1){
    let SERVER_URL = "http://192.168.0.18:3030/common/component/commonCode1";
    let param = JSON.stringify({c_code: code1});
    return new Promise((resolve, reject) => {
      this.http.post(SERVER_URL, param)
      .subscribe(res => {
        this.commonCode1 = res;
        console.log(res);
      }, (err) =>{
        reject(err);
        console.log(err);
      });
    });
  }

  //조달구분
  setCommonCode2(code1){
    let SERVER_URL = "http://192.168.0.18:3030/common/component/commonCode2";
    let param = JSON.stringify({c_code: code1});
    return new Promise((resolve, reject) => {
      this.http.post(SERVER_URL, param)
      .subscribe(res => {
        this.commonCode2 = res;
        console.log(res);
      }, (err) =>{
        reject(err);
        console.log(err);
      });
    });
  }

  //통화
  setCommonCode3(code1){
    let SERVER_URL = "http://192.168.0.18:3030/common/component/commonCode3";
    let param = JSON.stringify({c_code: code1});
    return new Promise((resolve, reject) => {
      this.http.post(SERVER_URL, param)
      .subscribe(res => {
        this.commonCode3 = res;
        console.log(res);
      }, (err) =>{
        reject(err);
        console.log(err);
      });
    });
  }

  //품목형태
  setCommonCode4(code1){
    let SERVER_URL = "http://192.168.0.18:3030/common/component/commonCode4";
    let param = JSON.stringify({c_code: code1});
    return new Promise((resolve, reject) => {
      this.http.post(SERVER_URL, param)
      .subscribe(res => {
        this.commonCode4 = res;
        console.log(res);
      }, (err) =>{
        reject(err);
        console.log(err);
      });
    });
  }

  //발의자
  setCommonCode5(code1){
    let SERVER_URL = "http://192.168.0.18:3030/common/component/commonCode5";
    let param = JSON.stringify({c_code: code1});
    return new Promise((resolve, reject) => {
      this.http.post(SERVER_URL, param)
      .subscribe(res => {
        this.commonCode5 = res;
        console.log(res);
      }, (err) =>{
        reject(err);
        console.log(err);
      });
    });
  }

  //계정과목
  setCommonCode6(code1){
    let SERVER_URL = "http://192.168.0.18:3030/common/component/commonCode6";
    let param = JSON.stringify({c_code: code1});
    return new Promise((resolve, reject) => {
      this.http.post(SERVER_URL, param)
      .subscribe(res => {
        this.commonCode6 = res;
        console.log(res);
      }, (err) =>{
        reject(err);
        console.log(err);
      });
    });
  }

  //증빙자료
  setCommonCode7(code1){
    let SERVER_URL = "http://192.168.0.18:3030/common/component/commonCode7";
    let param = JSON.stringify({c_code: code1});
    return new Promise((resolve, reject) => {
      this.http.post(SERVER_URL, param)
      .subscribe(res => {
        this.commonCode7 = res;
        console.log(res);
      }, (err) =>{
        reject(err);
        console.log(err);
      });
    });
  }

  //부서
  setCommonCode8(code1){
    let SERVER_URL = "http://192.168.0.18:3030/common/component/commonCode8";
    let param = JSON.stringify({c_code: code1});
    return new Promise((resolve, reject) => {
      this.http.post(SERVER_URL, param)
      .subscribe(res => {
        this.commonCode8 = res;
        console.log(res);
      }, (err) =>{
        reject(err);
        console.log(err);
      });
    });
  }

  //사업구분
  setCommonCode9(code1){
    let SERVER_URL = "http://192.168.0.18:3030/common/component/commonCode9";
    let param = JSON.stringify({c_code: code1});
    return new Promise((resolve, reject) => {
      this.http.post(SERVER_URL, param)
      .subscribe(res => {
        this.commonCode9 = res;
        console.log(res);
      }, (err) =>{
        reject(err);
        console.log(err);
      });
    });
  }

  //현재상태
  setCommonCode10(code1){
    let SERVER_URL = "http://192.168.0.18:3030/common/component/commonCode10";
    let param = JSON.stringify({c_code: code1});
    return new Promise((resolve, reject) => {
      this.http.post(SERVER_URL, param)
      .subscribe(res => {
        this.commonCode10 = res;
        console.log(res);
      }, (err) =>{
        reject(err);
        console.log(err);
      });
    });
  }

  //발주처
  setCommonCode11(code1){
    let SERVER_URL = "http://192.168.0.18:3030/common/component/commonCode11";
    let param = JSON.stringify({c_code: code1});
    return new Promise((resolve, reject) => {
      this.http.post(SERVER_URL, param)
      .subscribe(res => {
        this.commonCode11 = res;
        console.log(res);
      }, (err) =>{
        reject(err);
        console.log(err);
      });
    });
  }

  //담당자
  setCommonCode12(code1){
    let SERVER_URL = "http://192.168.0.18:3030/common/component/commonCode12";
    let param = JSON.stringify({c_code: code1});
    return new Promise((resolve, reject) => {
      this.http.post(SERVER_URL, param)
      .subscribe(res => {
        this.commonCode12 = res;
        console.log(res);
      }, (err) =>{
        reject(err);
        console.log(err);
      });
    });
  }

  //거래처
  setCommonCode13(code1){
    let SERVER_URL = "http://192.168.0.18:3030/common/component/commonCode13";
    let param = JSON.stringify({c_code: code1});
    return new Promise((resolve, reject) => {
      this.http.post(SERVER_URL, param)
      .subscribe(res => {
        this.commonCode13 = res;
        console.log(res);
      }, (err) =>{
        reject(err);
        console.log(err);
      });
    });
  }

  //영업부서
  setCommonCode14(code1){
    let SERVER_URL = "http://192.168.0.18:3030/common/component/commonCode14";
    let param = JSON.stringify({c_code: code1});
    return new Promise((resolve, reject) => {
      this.http.post(SERVER_URL, param)
      .subscribe(res => {
        this.commonCode14 = res;
        console.log(res);
      }, (err) =>{
        reject(err);
        console.log(err);
      });
    });
  }

  //영업담당
  setCommonCode15(code1){
    let SERVER_URL = "http://192.168.0.18:3030/common/component/commonCode15";
    let param = JSON.stringify({c_code: code1});
    return new Promise((resolve, reject) => {
      this.http.post(SERVER_URL, param)
      .subscribe(res => {
        this.commonCode15 = res;
        console.log(res);
      }, (err) =>{
        reject(err);
        console.log(err);
      });
    });
  }

  //제품코드
  setCommonCode16(code1){
    let SERVER_URL = "http://192.168.0.18:3030/common/component/commonCode16";
    let param = JSON.stringify({c_code: code1});
    return new Promise((resolve, reject) => {
      this.http.post(SERVER_URL, param)
      .subscribe(res => {
        this.commonCode16 = res;
        console.log(res);
      }, (err) =>{
        reject(err);
        console.log(err);
      });
    });
  }

  //수금구분
  setCommonCode17(code1){
    let SERVER_URL = "http://192.168.0.18:3030/common/component/commonCode17";
    let param = JSON.stringify({c_code: code1});
    return new Promise((resolve, reject) => {
      this.http.post(SERVER_URL, param)
      .subscribe(res => {
        this.commonCode17 = res;
        console.log(res);
      }, (err) =>{
        reject(err);
        console.log(err);
      });
    });
  }

  //입금구분
  setCommonCode18(code1){
    let SERVER_URL = "http://192.168.0.18:3030/common/component/commonCode18";
    let param = JSON.stringify({c_code: code1});
    return new Promise((resolve, reject) => {
      this.http.post(SERVER_URL, param)
      .subscribe(res => {
        this.commonCode18 = res;
        console.log(res);
      }, (err) =>{
        reject(err);
        console.log(err);
      });
    });
  }

  //지급처
  setCommonCode19(code1){
    let SERVER_URL = "http://192.168.0.18:3030/common/component/commonCode19";
    let param = JSON.stringify({c_code: code1});
    return new Promise((resolve, reject) => {
      this.http.post(SERVER_URL, param)
      .subscribe(res => {
        this.commonCode19 = res;
        console.log(res);
      }, (err) =>{
        reject(err);
        console.log(err);
      });
    });
  }

  //발주형태
  setCommonCode20(code1){
    let SERVER_URL = "http://192.168.0.18:3030/common/component/commonCode20";
    let param = JSON.stringify({c_code: code1});
    return new Promise((resolve, reject) => {
      this.http.post(SERVER_URL, param)
      .subscribe(res => {
        this.commonCode20 = res;
        console.log(res);
      }, (err) =>{
        reject(err);
        console.log(err);
      });
    });
  }

  //지불방법
  setCommonCode21(code1){
    let SERVER_URL = "http://192.168.0.18:3030/common/component/commonCode21";
    let param = JSON.stringify({c_code: code1});
    return new Promise((resolve, reject) => {
      this.http.post(SERVER_URL, param)
      .subscribe(res => {
        this.commonCode21 = res;
        console.log(res);
      }, (err) =>{
        reject(err);
        console.log(err);
      });
    });
  }

  //조달구분
  setCommonCode22(code1){
    let SERVER_URL = "http://192.168.0.18:3030/common/component/commonCode22";
    let param = JSON.stringify({c_code: code1});
    return new Promise((resolve, reject) => {
      this.http.post(SERVER_URL, param)
      .subscribe(res => {
        this.commonCode22 = res;
        console.log(res);
      }, (err) =>{
        reject(err);
        console.log(err);
      });
    });
  }

  //내외자
  setCommonCode23(code1){
    let SERVER_URL = "http://192.168.0.18:3030/common/component/commonCode23";
    let param = JSON.stringify({c_code: code1});
    return new Promise((resolve, reject) => {
      this.http.post(SERVER_URL, param)
      .subscribe(res => {
        this.commonCode23 = res;
        console.log(res);
      }, (err) =>{
        reject(err);
        console.log(err);
      });
    });
  }

  //품목형태
  setCommonCode24(code1){
    let SERVER_URL = "http://192.168.0.18:3030/common/component/commonCode24";
    let param = JSON.stringify({c_code: code1});
    return new Promise((resolve, reject) => {
      this.http.post(SERVER_URL, param)
      .subscribe(res => {
        this.commonCode24 = res;
        console.log(res);
      }, (err) =>{
        reject(err);
        console.log(err);
      });
    });
  }

  //제품군
  setCommonCode25(code1){
    let SERVER_URL = "http://192.168.0.18:3030/common/component/commonCode25";
    let param = JSON.stringify({c_code: code1});
    return new Promise((resolve, reject) => {
      this.http.post(SERVER_URL, param)
      .subscribe(res => {
        this.commonCode25 = res;
        console.log(res);
      }, (err) =>{
        reject(err);
        console.log(err);
      });
    });
  }

  //검사구분
  setCommonCode26(code1){
    let SERVER_URL = "http://192.168.0.18:3030/common/component/commonCode26";
    let param = JSON.stringify({c_code: code1});
    return new Promise((resolve, reject) => {
      this.http.post(SERVER_URL, param)
      .subscribe(res => {
        this.commonCode26 = res;
        console.log(res);
      }, (err) =>{
        reject(err);
        console.log(err);
      });
    });
  }

  //상태
  setCommonCode27(code1){
    let SERVER_URL = "http://192.168.0.18:3030/common/component/commonCode27";
    let param = JSON.stringify({c_code: code1});
    return new Promise((resolve, reject) => {
      this.http.post(SERVER_URL, param)
      .subscribe(res => {
        this.commonCode27 = res;
        console.log(res);
      }, (err) =>{
        reject(err);
        console.log(err);
      });
    });
  }

  //품목구분
  setCommonCode28(code1){
    let SERVER_URL = "http://192.168.0.18:3030/common/component/commonCode28";
    let param = JSON.stringify({c_code: code1});
    return new Promise((resolve, reject) => {
      this.http.post(SERVER_URL, param)
      .subscribe(res => {
        this.commonCode28 = res;
        console.log(res);
      }, (err) =>{
        reject(err);
        console.log(err);
      });
    });
  }

  //입고유형
  setCommonCode29(code1){
    let SERVER_URL = "http://192.168.0.18:3030/common/component/commonCode29";
    let param = JSON.stringify({c_code: code1});
    return new Promise((resolve, reject) => {
      this.http.post(SERVER_URL, param)
      .subscribe(res => {
        this.commonCode29 = res;
        console.log(res);
      }, (err) =>{
        reject(err);
        console.log(err);
      });
    });
  }

  //상태
  setCommonCode30(code1){
    let SERVER_URL = "http://192.168.0.18:3030/common/component/commonCode30";
    let param = JSON.stringify({c_code: code1});
    return new Promise((resolve, reject) => {
      this.http.post(SERVER_URL, param)
      .subscribe(res => {
        this.commonCode30 = res;
        console.log(res);
      }, (err) =>{
        reject(err);
        console.log(err);
      });
    });
  }

  //조치구분
  setCommonCode31(code1){
    let SERVER_URL = "http://192.168.0.18:3030/common/component/commonCode31";
    let param = JSON.stringify({c_code: code1});
    return new Promise((resolve, reject) => {
      this.http.post(SERVER_URL, param)
      .subscribe(res => {
        this.commonCode31 = res;
        console.log(res);
      }, (err) =>{
        reject(err);
        console.log(err);
      });
    });
  }

  //검사결과
  setCommonCode32(code1){
    let SERVER_URL = "http://192.168.0.18:3030/common/component/commonCode32";
    let param = JSON.stringify({c_code: code1});
    return new Promise((resolve, reject) => {
      this.http.post(SERVER_URL, param)
      .subscribe(res => {
        this.commonCode32 = res;
        console.log(res);
      }, (err) =>{
        reject(err);
        console.log(err);
      });
    });
  }

  //불량항목
  setCommonCode33(code1){
    let SERVER_URL = "http://192.168.0.18:3030/common/component/commonCode33";
    let param = JSON.stringify({c_code: code1});
    return new Promise((resolve, reject) => {
      this.http.post(SERVER_URL, param)
      .subscribe(res => {
        this.commonCode33 = res;
        console.log(res);
      }, (err) =>{
        reject(err);
        console.log(err);
      });
    });
  }

  //검사종류
  setCommonCode34(code1){
    let SERVER_URL = "http://192.168.0.18:3030/common/component/commonCode34";
    let param = JSON.stringify({c_code: code1});
    return new Promise((resolve, reject) => {
      this.http.post(SERVER_URL, param)
      .subscribe(res => {
        this.commonCode34 = res;
        console.log(res);
      }, (err) =>{
        reject(err);
        console.log(err);
      });
    });
  }

  //검사구분
  setCommonCode35(code1){
    let SERVER_URL = "http://192.168.0.18:3030/common/component/commonCode35";
    let param = JSON.stringify({c_code: code1});
    return new Promise((resolve, reject) => {
      this.http.post(SERVER_URL, param)
      .subscribe(res => {
        this.commonCode35 = res;
        console.log(res);
      }, (err) =>{
        reject(err);
        console.log(err);
      });
    });
  }

  //공정
  setCommonCode36(code1){
    let SERVER_URL = "http://192.168.0.18:3030/common/component/commonCode36";
    let param = JSON.stringify({c_code: code1});
    return new Promise((resolve, reject) => {
      this.http.post(SERVER_URL, param)
      .subscribe(res => {
        this.commonCode36 = res;
        console.log(res);
      }, (err) =>{
        reject(err);
        console.log(err);
      });
    });
  }

  //견적상태
  setCommonCode37(code1){
    let SERVER_URL = "http://192.168.0.18:3030/common/component/commonCode37";
    let param = JSON.stringify({c_code: code1});
    return new Promise((resolve, reject) => {
      this.http.post(SERVER_URL, param)
      .subscribe(res => {
        this.commonCode37 = res;
        console.log(res);
      }, (err) =>{
        reject(err);
        console.log(err);
      });
    });
  }

  //단위 가져오기
  getCommonCode1(){
    return this.commonCode1;
  }
  //조달구분
  getCommonCode2(){
    return this.commonCode2;
  }
  //통화
  getCommonCode3(){
    return this.commonCode3;
  }
  //품목형태
  getCommonCode4(){
    return this.commonCode4;
  }
  //발의자
  getCommonCode5(){
    return this.commonCode5;
  }
  //계정과목
  getCommonCode6(){
    return this.commonCode6;
  }
  //증빙자료
  getCommonCode7(){
    return this.commonCode7;
  }
  //부서
  getCommonCode8(){
    return this.commonCode8;
  }
  //사업구분
  getCommonCode9(){
    return this.commonCode9;
  }
  //현재상태
  getCommonCode10(){
    return this.commonCode10;
  }
  //발주처
  getCommonCode11(){
    return this.commonCode11;
  }
  //담당자
  getCommonCode12(){
    return this.commonCode12;
  }
  //거래처
  getCommonCode13(){
    return this.commonCode13;
  }
  //영업부서
  getCommonCode14(){
    return this.commonCode14;
  }
  //영업담당
  getCommonCode15(){
    return this.commonCode15;
  }
  //제품코드
  getCommonCode16(){
    return this.commonCode16;
  }
  //수금구분
  getCommonCode17(){
    return this.commonCode17;
  }
  //입금구분
  getCommonCode18(){
    return this.commonCode18;
  }
  //지급처
  getCommonCode19(){
    return this.commonCode19;
  }
  //발주형태
  getCommonCode20(){
    return this.commonCode20;
  }
  //지불방법
  getCommonCode21(){
    return this.commonCode21;
  }
  //조달구분
  getCommonCode22(){
    return this.commonCode22;
  }
  //내외자
  getCommonCode23(){
    return this.commonCode23;
  }
  //품목형태
  getCommonCode24(){
    return this.commonCode24;
  }
  //제품군
  getCommonCode25(){
    return this.commonCode25;
  }
  //검사구분
  getCommonCode26(){
    return this.commonCode26;
  }
  //상태
  getCommonCode27(){
    return this.commonCode27;
  }
  //품목구분
  getCommonCode28(){
    return this.commonCode28;
  }
  //입고유형
  getCommonCode29(){
    return this.commonCode29;
  }
  //상태
  getCommonCode30(){
    return this.commonCode30;
  }
  //조치구분
  getCommonCode31(){
    return this.commonCode31;
  }
  //검사결과
  getCommonCode32(){
    return this.commonCode32;
  }
  //불량항목
  getCommonCode33(){
    return this.commonCode33;
  }
  //검사종류
  getCommonCode34(){
    return this.commonCode34;
  }
  //검사구분
  getCommonCode35(){
    return this.commonCode35;
  }

  //공정
  getCommonCode36(){
    return this.commonCode36;
  }

  //견적상태
  getCommonCode37(){
    return this.commonCode37;
  }

  /* 공통모듈 SET END */





  /* 공통모듈 GET START */

  //사용자(로그인) 정보 가져오기
  getUserInfo(){
    return {user_id: this.user_id, user_nm: this.user_nm, user_pswd: this.user_pswd, c_code: this.c_code, c_name: this.c_name}
  }

  //회사정보 가져오기
  getCompanyInfo(){
    return this.companyInfo;
  }

  //공장정보 가져오기
  getPlantInfo(){
    return this.plantInfo;
  }

  /* 공통모듈 GET END */



}
