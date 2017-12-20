import { Injectable } from "@angular/core";
import { Strings } from '../providers/strings';
import { Http,Headers } from '@angular/http';
import { LoadingController } from "ionic-angular/components/loading/loading-controller";

@Injectable()
export class HttpService{
    constructor(public strings:Strings,public http:Http,public loadingCtrl:LoadingController){}

    mobGetHistory(day){
        let url = this.strings.mob.history_url+'?key='+this.strings.mob.key+'&day='+day;
        let header = new Headers();
        header.append('Content-Type','application/x-www-form-urlencoded');
        return new Promise((resolve,reject)=>{
            let loading = this.loadingCtrl.create({
                content:'加载中...',
            });
            this.http.get(url,{headers:header}).subscribe(response=>{
                //console.log(response.json());
                resolve(response.json().result);
                loading.dismiss(); 
            },error=>{
                //console.log(error);
                reject(error);
                loading.dismiss(); 
                });
        })
    }
    mobPostHistory(day){
        let url = this.strings.mob.history_url;
        let prama ={key:this.strings.mob.key,day:day} ;
        let header = new Headers();
        header.append('Content-Type','application/x-www-form-urlencoded');
        return new Promise((resolve,reject)=>{
            let loading = this.loadingCtrl.create({
                content:'加载中...',
            });
            loading.present();
            this.http.post(url,this.objectTransForm(prama),{headers:header}).subscribe(response=>{
                //console.log(response);
                let result = response.json().result;
                resolve(result);
                loading.dismiss(); 
            },error=>{
                console.log(error);
                reject(error);
                loading.dismiss(); 
            })
        })
        
    }

    mobPostJoke(page,type){
        let url;
        if(type=='txt'){
            url = this.strings.yy.joke_txt_url;
        }else if(type =='img'){
            url = this.strings.yy.joke_img_url;
        }else if(type =='gif'){
            url = this.strings.yy.joke_gif_url;
        }else{
            url = this.strings.yy.joke_txt_url;
        }
        let prama = {showapi_appid:this.strings.yy.appid,showapi_sign:this.strings.yy.secret,
            page:page,maxResult:this.strings.yy.max_result}
        let header = new Headers();
        header.append('Content-Type','application/x-www-form-urlencoded');
        return new Promise((resolve,reject)=>{
            let loading = this.loadingCtrl.create({
                content:'加载中...',
            });
            loading.present();
            this.http.post(url,this.objectTransForm(prama),{headers:header}).subscribe(response=>{
                let list =response.json().showapi_res_body.contentlist;
                resolve(list);
                //console.log(list); 
                loading.dismiss();               
            },error=>{
                console.log(error);
                reject(error);
                loading.dismiss();
            })
        })
    }

    objectTransForm(object){
        var str = [];
        for(let key in object){
            str.push(encodeURIComponent(key)+'='+encodeURIComponent(object[key]))
        }
        return str.join('&');
    }
	
}