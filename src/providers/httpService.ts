import { Injectable } from "@angular/core";
import { Strings } from '../providers/strings';
import { Http,Headers } from '@angular/http';

@Injectable()
export class HttpService{
    constructor(private strings:Strings,private http:Http){}

    mobGetHistory(day){
        let url = this.strings.mob.history_url+'?key='+this.strings.mob.key+'&day='+day;
        let header = new Headers();
        header.append('Content-Type','application/x-www-form-urlencoded');
        return new Promise((resolve,reject)=>{
            this.http.get(url,{headers:header}).subscribe(response=>{
                //console.log(response.json());
                resolve(response.json().result);
            },error=>{
                //console.log(error);
                reject(error);
                });
        })
    }
    mobPostHistory(day){
        let url = this.strings.mob.history_url;
        let prama ={key:this.strings.mob.key,day:day} ;
        let header = new Headers();
        header.append('Content-Type','application/x-www-form-urlencoded');
        return new Promise((resolve,reject)=>{
            this.http.post(url,this.objectTransForm(prama),{headers:header}).subscribe(response=>{
                //console.log(response);
                resolve(response.json().result);
            },error=>{
                //console.log(error);
                reject(error);
            })
        })
        
    }

    mobPostJoke(page){
        let url = this.strings.yy.joke_txt_url;
        let prama = {showapi_appid:this.strings.yy.appid,showapi_sign:this.strings.yy.secret,
            page:page,maxResult:this.strings.yy.max_result}
        let header = new Headers();
        header.append('Content-Type','application/x-www-form-urlencoded');
        return new Promise((resolve,reject)=>{
            this.http.post(url,this.objectTransForm(prama),{headers:header}).subscribe(response=>{
                let list =response.json().showapi_res_body.contentlist;
                resolve(list);
            },error=>{
                console.log(error);
                reject(error);
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