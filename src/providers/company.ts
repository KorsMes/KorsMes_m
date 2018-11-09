import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the CompanyProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CompanyProvider {

  constructor(public http: HttpClient) {
    //console.log('Hello CompanyProvider Provider');
  }


  getCompanyInfo(){
    return  [
              {
                company_name: '(주)한성더스트킹',
                company_code: 'c00000003'
              },
              {
                company_name: '(주)한빛테크놀로지',
                company_code: 'c00000004'
              }
            ]
  }

}
