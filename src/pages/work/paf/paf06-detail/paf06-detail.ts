import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';

/**
 * Generated class for the Paf06DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-paf06-detail',
  templateUrl: 'paf06-detail.html',
})
export class PAF06DETAIL {
  @ViewChild(Slides) slides: Slides;
  public active_slide_index;
  public list;

  constructor(
                public navCtrl: NavController,
                public navParams: NavParams) {
                  this.active_slide_index = navParams.get('index');
                  this.list = navParams.get('list');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Paf06DetailPage');
  }

  ionViewDidEnter(){
    this.slides.slideTo(this.active_slide_index);
  }

  goToSlide(index){
    this.slides.slideTo(index, 0);
  }

  slideChanged(){
    this.slides.getActiveIndex();
  }

}
