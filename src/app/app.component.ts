import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Storage } from '@ionic/storage';

import { HomePage } from '../pages/common/home/home';
import { MainTemplatePage } from '../pages/common/main-template/main-template';

import { ApiProvider } from '../providers/api';
import { CommoncodeProvider } from '../providers/commoncode';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage: any;

  showRoot = false;


  constructor(
              platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              public storage: Storage,
              public apiProvider: ApiProvider,
              public commoncodeProvider: CommoncodeProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      /* 로그인 상태 체크 */
      this.storage.get("[USERINFO]").then((result) => {
        if(result !== null){

          let api_url = "/common/doLogin";
          let param = JSON.stringify({user_id: result.user_id, user_pswd: result.user_pswd, c_code: result.c_code});

          this.apiProvider.data_api(api_url, param)
          .then(data => {
            if(Object.keys(data).length === 0){
              this.storage.clear();
              this.rootPage = HomePage;
            }else{
              //사용자정보 세팅
              this.commoncodeProvider.setUserInfo(result.user_id,result.user_nm,result.user_pswd,result.c_code,result.c_name);

              /* 공통코드 생성 */
              this.commoncodeProvider.setCompanyInfo(result.c_code); //회사정보
              this.commoncodeProvider.setPlantInfo(result.c_code); //공장정보

              this.commoncodeProvider.setCommonCode1(result.c_code); //단위
              this.commoncodeProvider.setCommonCode2(result.c_code); //조달구분
              this.commoncodeProvider.setCommonCode3(result.c_code); //통화
              this.commoncodeProvider.setCommonCode4(result.c_code); //품목형태
              this.commoncodeProvider.setCommonCode5(result.c_code); //발의자
              this.commoncodeProvider.setCommonCode6(result.c_code); //계정과목
              this.commoncodeProvider.setCommonCode7(result.c_code); //증빙자료
              this.commoncodeProvider.setCommonCode8(result.c_code); //부서
              this.commoncodeProvider.setCommonCode9(result.c_code); //사업구분
              this.commoncodeProvider.setCommonCode10(result.c_code); //현재상태
              this.commoncodeProvider.setCommonCode11(result.c_code); //발주처
              this.commoncodeProvider.setCommonCode12(result.c_code); //담당자
              this.commoncodeProvider.setCommonCode13(result.c_code); //거래처
              this.commoncodeProvider.setCommonCode14(result.c_code); //영업부서
              this.commoncodeProvider.setCommonCode15(result.c_code); //영업담당
              this.commoncodeProvider.setCommonCode16(result.c_code); //제품코드
              this.commoncodeProvider.setCommonCode17(result.c_code); //수금구분
              this.commoncodeProvider.setCommonCode18(result.c_code); //입금구분
              this.commoncodeProvider.setCommonCode19(result.c_code); //지급처
              this.commoncodeProvider.setCommonCode20(result.c_code); //발주형태
              this.commoncodeProvider.setCommonCode21(result.c_code); //지불방법
              this.commoncodeProvider.setCommonCode22(result.c_code); //조달구분
              this.commoncodeProvider.setCommonCode23(result.c_code); //내외자
              this.commoncodeProvider.setCommonCode24(result.c_code); //품목형태
              this.commoncodeProvider.setCommonCode25(result.c_code); //제품군
              this.commoncodeProvider.setCommonCode26(result.c_code); //검사구분
              this.commoncodeProvider.setCommonCode27(result.c_code); //상태
              this.commoncodeProvider.setCommonCode28(result.c_code); //품목구분
              this.commoncodeProvider.setCommonCode29(result.c_code); //입고유형
              this.commoncodeProvider.setCommonCode30(result.c_code); //상태
              this.commoncodeProvider.setCommonCode31(result.c_code); //조치구분
              this.commoncodeProvider.setCommonCode32(result.c_code); //검사결과
              this.commoncodeProvider.setCommonCode33(result.c_code); //불량항목
              this.commoncodeProvider.setCommonCode34(result.c_code); //검사종류
              this.commoncodeProvider.setCommonCode35(result.c_code); //검사구분
              this.commoncodeProvider.setCommonCode36(result.c_code); //공정
              this.commoncodeProvider.setCommonCode37(result.c_code); //견적상태

              this.rootPage = MainTemplatePage;
            }
          });



        }else{
          this.rootPage = HomePage;
        }
      });
      setTimeout(() => { this.showRoot = true; },500);
    });
  }

}

