import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class ApiProvider {
    url: string = 'http://192.168.137.38:8000/passport/public';

    constructor(public http: HttpClient) {
    }

    get(endpoint: string, params?: any, reqOpts?: any) {
        if (!reqOpts) {
            reqOpts = {
                params: new HttpParams()
            };
        }

        // Support easy query params for GET requests
        if (params) {
            reqOpts.params = new HttpParams();
            for (let k in params) {
                reqOpts.params.set(k, params[k]);
            }
        }

        return this.http.get(this.url + '/' + endpoint, reqOpts);
    }

    postRes(endpoint: string, body: any){
        let reqOpts;

        if (!reqOpts) {
            reqOpts = {
                headers: new HttpHeaders().set('Accept', 'application/json').set('Content-Type', 'application/x-www-form-urlencoded'),
                params: new HttpParams()
            };
        }

        // Support easy query params for GET requests
        if (body) {
            reqOpts.params = new HttpParams();
            for (let k in body) {
                reqOpts.params = reqOpts.params.append(k, body[k]);
            }
        }


        //return new Promise((resolve,reject) => {
          return  this.http.post(this.url + '/' + endpoint, null, reqOpts
            ).toPromise().then(res => res);
             /*.subscribe(
                (data:any) => {
                    //console.log('error asdas: ' + JSON.stringify(data));
                    resolve(data);
                },
                (err:any) => {
                    //console.log('error 123124: ' + JSON.stringify(err));
                    reject(err);
                });*/
        //});

    }

    post(endpoint: string, body: any, reqOpts?: any) {
        console.log(this.url + '/' + endpoint);
        //console.log(JSON.stringify(body));
        //console.log('REQUEOPTS ' + JSON.stringify(reqOpts));
        return this.http.post(this.url + '/' + endpoint, body, {
          headers: new HttpHeaders().set('Accept', 'application/json').set('Content-Type', 'application/x-www-form-urlencoded')
        });
    }

    put(endpoint: string, body: any, reqOpts?: any) {
        return this.http.put(this.url + '/' + endpoint, body, reqOpts);
    }

    delete(endpoint: string, reqOpts?: any) {
        return this.http.delete(this.url + '/' + endpoint, reqOpts);
    }

    patch(endpoint: string, body: any, reqOpts?: any) {
        return this.http.put(this.url + '/' + endpoint, body, reqOpts);
    }
}
