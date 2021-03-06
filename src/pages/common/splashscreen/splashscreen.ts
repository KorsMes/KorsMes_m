import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SplashscreenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-splashscreen',
  templateUrl: 'splashscreen.html',
})
export class SplashscreenPage {


  constructor(
                public navCtrl: NavController,
                public navParams: NavParams,
                public viewController: ViewController,
                public splashScreen: SplashScreen) {
  }

  ionViewDidEnter(){
    this.splashScreen.hide();

    setTimeout(() => {
      this.viewController.dismiss();
    }, 1000);
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad SplashscreenPage');
  }

}
