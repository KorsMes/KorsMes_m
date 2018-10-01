import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { ApiProvider } from '../../../../providers/api';
import { AlertProvider } from '../../../../providers/alert';

/**
 * Generated class for the PopupTaskPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-popup-task',
  templateUrl: 'popup-task.html',
})
export class PopupTaskPage {

  //공정 조회 결과(리스트)
  public result;

  constructor(
                public navCtrl: NavController,
                public navParams: NavParams,
                public apiProvider: ApiProvider,
                public alertProvider: AlertProvider,
                public viewController: ViewController
                ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopupTaskPage');
  }

  //조회
  retrive(){
    let api_url = "/common/popup/task_list";
    let param = JSON.stringify({a: 'abc'});
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
      task_cd: selData.TASK_CODE,
      task_nm: selData.TASK_NAME1
    }
    this.viewController.dismiss(data);
  }

  //팝업 닫기
  closeModal(){
    let data = {
      task_cd : '',
      task_nm : '',
    }
    this.viewController.dismiss(data);
  }

}
