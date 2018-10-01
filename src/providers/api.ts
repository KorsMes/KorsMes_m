import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {

  constructor(public http: HttpClient) {}

  data_api(api_url, param){
    let SERVER_URL = "http://kserver1:3030" + api_url;

    console.log(SERVER_URL + " : " + param);

    return new Promise((resolve, reject) => {
      this.http.post(SERVER_URL, param)
      .subscribe(res => {
        resolve(res);
      }, (err) =>{
        reject(err);
        console.log(err);
      });
    });

  }

}
