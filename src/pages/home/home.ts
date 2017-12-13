import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpService } from '../../providers/httpService';
import { Strings }from '../../providers/strings';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    jokeList:any;

  constructor(public navCtrl: NavController,private httpService:HttpService) {
    this.initData();
  }

  initData(){
      this.httpService.mobPostJoke(1).then(list=>{
          console.log(list);
          this.jokeList = list;
      });          
  }

}
