import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SEA12TAB1 } from '../sea12-tab1/sea12-tab1';
import { SEA12TAB2 } from '../sea12-tab2/sea12-tab2';
import { SEA12TAB3 } from '../sea12-tab3/sea12-tab3';

/**
 * Generated class for the Sea12Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sea12',
  templateUrl: 'sea12.html',
})
export class SEA12 {


  tab1Root = SEA12TAB1;
  tab2Root = SEA12TAB2;
  tab3Root = SEA12TAB3;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Sea12Page');
  }

}
