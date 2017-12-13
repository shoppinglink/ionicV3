import { Component } from '@angular/core';
import { NavParams} from 'ionic-angular';

@Component({
    selector:'page-historydetail',
    templateUrl:'historydetail.html'
})

export class HistoryDetailPage{
    historyContent:any;
    constructor(navPrama:NavParams){
        this.historyContent = navPrama.data;
        //console.log(navPrama.data);
    }
}