import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

/*
  Generated class for the AlertProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AlertProvider {

  constructor(
              public alertController: AlertController
             ) {}

  /* ALERT */
  call_alert(a,b,c){
    const alert = this.alertController.create({
      title: a,
      subTitle: b,
      buttons: [c]
    });

    alert.present();
  }

  /* CONFIRM */
  call_confirm(a,b,c,d){
    const confirm = this.alertController.create({
      title: a,
      subTitle: b,
      buttons: [
        {
          text: c,
          handler:() =>{
            confirm.dismiss(true);
            return false;
          }
        },
        {
          text: d,
          handler:() =>{
            confirm.dismiss(false);
            return false;
          }
        }
      ]
    });
    return confirm;
  }

}
