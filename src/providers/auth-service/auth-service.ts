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

    url: string = 'http://200.111.159.19:81/passport/public/api/';

  constructor(public http: HttpClient)
  {
      console.log(localStorage.getItem('servidor'));
      /*
      this.storage.get('servidor').then((data)=>{
          console.log(data);
          this.url = 'http://' + data + '/passport/public/api/';
      });*/
    console.log('Hello AuthServiceProvider Provider');
  }

    postData(credentials, type) {


        let reqOpts;

        if (!reqOpts) {
            reqOpts = {
                headers: new HttpHeaders().set('Accept', 'application/json')
                    .set('Content-Type', 'application/x-www-form-urlencoded'),
                    //.set('Access-Control-Allow-Origin', '*'),
                params: new HttpParams()
            };
        }

        // Support easy query params for GET requests
        if (credentials) {
            reqOpts.params = new HttpParams();
            for (let k in credentials) {
                reqOpts.params = reqOpts.params.append(k, credentials[k]);
            }
        }

        return new Promise((resolve, reject) => {

            this.http.post(this.url + type, null, reqOpts)
                .subscribe(res => {
                    resolve(res);
                }, (err) => {
                    reject(err);
                });
        });

    }

}
