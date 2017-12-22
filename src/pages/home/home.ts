import { Component,ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpService } from '../../providers/httpService';
import { Content } from 'ionic-angular/components/content/content';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    @ViewChild(Content) content:Content;
    jokeList:any;
    currentPage:number=1;
    joke:string='txt';
    selectedSegment:boolean = false;

  constructor(public navCtrl: NavController,private httpService:HttpService) {
    this.initData();
  }

  initData(){
      //console.log('init');
      this.httpService.yyPostJoke(this.currentPage,this.joke).then(list=>{
          this.jokeList = list;
      });          
  }

  onSelectSegment(value){
      //console.log('select');
      if(value==this.joke){
            this.content.scrollToTop();
          return;
      }
      this.currentPage = 1;
    this.content.scrollToTop(); 
    this.httpService.yyPostJoke(this.currentPage,value).then(list=>{
        this.jokeList = list;
    });
    }

  doInfinite(infiniteScroll){
        this.currentPage++;
        this.httpService.yyPostJoke(this.currentPage,this.joke).then(list=>{
            for(let i=0;i<Object.keys(list).length;i++){
              this.jokeList.push(list[i]);
            };
            infiniteScroll.complete();
          }).catch(()=>{
              this.currentPage--;
              infiniteScroll.complete;
          })
      }
}

//visual studio code 设置tab为4个字符
/**
 * 
    {
        "editor.tabSize": 4,
        "editor.detectIndentation": false,
        "files.autoSave": "off"
    }
 * 
 */
