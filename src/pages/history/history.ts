import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpService } from '../../providers/httpService';
import { HistoryDetailPage } from '../history/historydetail/historydetail'

@Component({
  selector: 'page-history',
  templateUrl: 'history.html'
})
export class HistoryPage {
    historyList:any;

  constructor(public navCtrl: NavController,private httpService:HttpService) {
      this.initData();

  }

  initData(){
    this.httpService.mobPostHistory('1213').then(result=>{
        console.log(result);
        this.historyList = result;
    });  
  }

  onClickHistoryDetail(item){
      //console.log(item);
      this.navCtrl.push(HistoryDetailPage,item);
  }

}
