import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {

    url: string = 'http://192.168.0.41:81/passport/public/api/';
    userDetails : any;

  constructor(public http: HttpClient)
  {

      const data = JSON.parse(localStorage.getItem('userData'));
      this.userDetails = data;
    console.log('Hello AuthServiceProvider Provider');
  }

    setUrl(){
        this.url = 'http://' + localStorage.getItem('servidor') + '/passport/public/api/';
    }

    postData(credentials, type) {
        this.setUrl();
        let reqOpts;

        if(type != 'login' && type != 'register'){
            if (!reqOpts) {
                console.log('aqui');
                reqOpts = {
                    headers: new HttpHeaders().set('Authorization', 'Bearer '+ this.userDetails.token)
                };
            }

        }else{
            if (!reqOpts) {
                reqOpts = {
                    headers: new HttpHeaders().set('Accept', 'application/json')
                    .set('Content-Type', 'application/x-www-form-urlencoded'),
                };
            }

            // Support easy query params for GET requests
            if (credentials) {
                reqOpts.params = new HttpParams();
                for (let k in credentials) {
                    reqOpts.params = reqOpts.params.append(k, credentials[k]);
                }
            }
        }

        return new Promise((resolve, reject) => {
            this.http.post(this.url + type, credentials, reqOpts)
                .subscribe(res => {
                    resolve(res);
                }, (err) => {
                    reject(err);
                });
        });

    }

}
