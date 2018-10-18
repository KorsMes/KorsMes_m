import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { AlertProvider } from '../../../providers/alert';
import { ApiProvider } from '../../../providers/api';
import { CompanyProvider } from '../../../providers/company';
import { CommoncodeProvider } from '../../../providers/commoncode';


import { MainTemplatePage } from '../main-template/main-template';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public companyInfo; //companyProvider data

  public selCompanyCode; //회사코드 (select)


  /* 조회조건 */
  public c_code; //G 회사코드
  public c_name; //G 회사명
  user_id: string; //ID
  user_pswd: string; //PW

  /* 전역변수 */
  public CompanyInfo; //회사정보
  public loginInfo; //로그인정보

  /* 로그인유지 */
  public retain_flag;

  constructor(
              public navController: NavController,
              public alertProvider: AlertProvider,
              public apiProvider: ApiProvider,
              public companyProvider: CompanyProvider,
              public commoncodeProvider: CommoncodeProvider,
              public storage: Storage) {

                this.companyInfo = this.companyProvider.getCompanyInfo();

              }

  ionViewDidLoad() {}


  doLogin(){
    if(this.selCompanyCode == null || this.selCompanyCode == ""){
      this.alertProvider.call_alert("로그인", "회사를 선택해주세요.", "확인");
      return;
    }

    if(this.user_id == null || this.user_id == "" || this.user_pswd == null || this.user_pswd == ""){
      this.user_id = null;
      this.user_pswd = null;
      this.alertProvider.call_alert("로그인", "아이디/패스워드를 입력해주세요.", "확인");
      return;
    }

    for(var c in this.companyInfo){
      if(this.companyInfo[c].company_code === this.selCompanyCode){
        this.c_code = this.companyInfo[c].company_code;
        this.c_name = this.companyInfo[c].company_name;
      }
    }

    let api_url = "/common/doLogin";
    let param = JSON.stringify({user_id: this.user_id, user_pswd: this.user_pswd, c_code: this.c_code});
    this.apiProvider.data_api(api_url, param)
    .then(data => {
      if(Object.keys(data).length === 0){
        this.user_id = "";
        this.user_pswd = "";

        this.alertProvider.call_alert("로그인", "로그인실패", "확인");
      }else{
        //사용자정보 세팅
        this.commoncodeProvider.setUserInfo(data[0].USER_ID, data[0].USER_NM, data[0].USER_PSWD, this.c_code, this.c_name);

        /* 공통코드 생성 */
        this.commoncodeProvider.setCompanyInfo(this.c_code); //회사정보
        this.commoncodeProvider.setPlantInfo(this.c_code); //공장정보

        this.commoncodeProvider.setCommonCode1(this.c_code); //단위
        this.commoncodeProvider.setCommonCode2(this.c_code); //조달구분
        this.commoncodeProvider.setCommonCode3(this.c_code); //통화
        this.commoncodeProvider.setCommonCode4(this.c_code); //품목형태
        this.commoncodeProvider.setCommonCode5(this.c_code); //발의자
        this.commoncodeProvider.setCommonCode6(this.c_code); //계정과목
        this.commoncodeProvider.setCommonCode7(this.c_code); //증빙자료
        this.commoncodeProvider.setCommonCode8(this.c_code); //부서
        this.commoncodeProvider.setCommonCode9(this.c_code); //사업구분
        this.commoncodeProvider.setCommonCode10(this.c_code); //현재상태
        this.commoncodeProvider.setCommonCode11(this.c_code); //발주처
        this.commoncodeProvider.setCommonCode12(this.c_code); //담당자
        this.commoncodeProvider.setCommonCode13(this.c_code); //거래처
        this.commoncodeProvider.setCommonCode14(this.c_code); //영업부서
        this.commoncodeProvider.setCommonCode15(this.c_code); //영업담당
        this.commoncodeProvider.setCommonCode16(this.c_code); //제품코드
        this.commoncodeProvider.setCommonCode17(this.c_code); //수금구분
        this.commoncodeProvider.setCommonCode18(this.c_code); //입금구분
        this.commoncodeProvider.setCommonCode19(this.c_code); //지급처
        this.commoncodeProvider.setCommonCode20(this.c_code); //발주형태
        this.commoncodeProvider.setCommonCode21(this.c_code); //지불방법
        this.commoncodeProvider.setCommonCode22(this.c_code); //조달구분
        this.commoncodeProvider.setCommonCode23(this.c_code); //내외자
        this.commoncodeProvider.setCommonCode24(this.c_code); //품목형태
        this.commoncodeProvider.setCommonCode25(this.c_code); //제품군
        this.commoncodeProvider.setCommonCode26(this.c_code); //검사구분
        this.commoncodeProvider.setCommonCode27(this.c_code); //상태
        this.commoncodeProvider.setCommonCode28(this.c_code); //품목구분
        this.commoncodeProvider.setCommonCode29(this.c_code); //입고유형
        this.commoncodeProvider.setCommonCode30(this.c_code); //상태
        this.commoncodeProvider.setCommonCode31(this.c_code); //조치구분
        this.commoncodeProvider.setCommonCode32(this.c_code); //검사결과
        this.commoncodeProvider.setCommonCode33(this.c_code); //불량항목
        this.commoncodeProvider.setCommonCode34(this.c_code); //검사종류
        this.commoncodeProvider.setCommonCode35(this.c_code); //검사구분
        this.commoncodeProvider.setCommonCode36(this.c_code); //공정
        this.commoncodeProvider.setCommonCode37(this.c_code); //견적상태
        this.commoncodeProvider.setCommonCode38(this.c_code); //설치지역
        this.commoncodeProvider.setCommonCode39(this.c_code); //생산구분
        this.commoncodeProvider.setCommonCode40(this.c_code); //주문구분
        this.commoncodeProvider.setCommonCode41(this.c_code); //계약유무
        this.commoncodeProvider.setCommonCode42(this.c_code); //수주구분
        this.commoncodeProvider.setCommonCode43(this.c_code); //사업구분
        this.commoncodeProvider.setCommonCode44(this.c_code); //결재조건

        //로그인 유지 시 로그인데이터(쿠키) 생성
        if(this.retain_flag){
          this.storage.set('[USERINFO]', this.commoncodeProvider.getUserInfo());
        }

        this.user_id = "";
        this.user_pswd = "";

        setTimeout(() => { this.navController.setRoot(MainTemplatePage); },1500);
      }

    });
  }


}
