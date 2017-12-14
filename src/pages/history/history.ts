import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpService } from '../../providers/httpService';
import { HistoryDetailPage } from '../history/historydetail/historydetail'
import { DateTime } from 'ionic-angular/components/datetime/datetime';

@Component({
  selector: 'page-history',
  templateUrl: 'history.html'
})
export class HistoryPage {
    historyList:any;
    currentDate;

  constructor(public navCtrl: NavController,private httpService:HttpService) {
      this.initData();

  }

  initData(){
      let Day = new Date();
      let date =(Day.getMonth()+1)+''+Day.getDate();
    this.httpService.mobPostHistory(date).then(result=>{
        console.log(result);
        for(let i=0;i<Object.keys(result).length;i++){
            result[i].date=result[i].date.slice(0,4)+'.'+(Day.getMonth()+1)+'.'+Day.getDate();
        }
        this.historyList = result;
    });  
  }

  onClickHistoryDetail(item){
      //console.log(item);
      this.navCtrl.push(HistoryDetailPage,item);
  }

}
