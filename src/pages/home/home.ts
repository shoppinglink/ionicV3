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
    currentPage:number=1;

  constructor(public navCtrl: NavController,private httpService:HttpService) {
    this.initData();
  }

  initData(){
      this.httpService.mobPostJoke(this.currentPage).then(list=>{
          console.log(list);
          this.jokeList = list;
      });          
  }

  doInfinite(infiniteScroll){
    this.currentPage++;
    this.httpService.mobPostJoke(this.currentPage).then(list=>{
      for(let i=0;i<Object.keys(list).length;i++){
        this.jokeList.push(list[i]);
      };
      infiniteScroll.complete();
    })
  }

}
