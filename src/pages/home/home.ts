import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '../../providers/http';
import { Strings }from '../../providers/strings';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,public storage:Storage,private http:Http) {
    this.initData();
  }

  initData(){
      this.http.mobPostHistory();
  }

}
