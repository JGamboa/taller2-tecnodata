import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { ApiProvider } from '../api/api';

/**
 * Most apps have the concept of a User. This is a simple provider
 * with stubs for login/signup/etc.
 *
 * This User provider makes calls to our API at the `login` and `signup` endpoints.
 *
 * By default, it expects `login` and `signup` to return a JSON object of the shape:
 *
 * ```json
 * {
 *   status: 'success',
 *   user: {
 *     // User fields your app needs, like "id", "name", "email", etc.
 *   }
 * }Ø
 * ```
 *
 * If the `status` field is not `success`, then an error is detected and returned.
 */
@Injectable()
export class UserProvider {

    _user: any;

    constructor(public api: ApiProvider) { }

    /**
     * Send a POST request to our login endpoint with the data
     * the user entered on the form.
     */
    login(accountInfo: any) {

     return this.api.postRes('api/login', JSON.stringify(accountInfo));



        /*let seq = this.api.postRes('api/login', JSON.stringify(accountInfo));

        seq.subscribe((res: any) => {
            console.log(res.success);
            // If the API returned a successful response, mark the user as logged in
            if (res.status == 'success') {
                this._loggedIn(res);
            } else {

            }
        }, err => {
            console.error('ERROR', JSON.stringify(err));
        });*/
    }


    /**
     * Log the user out, which forgets the session
     */
    logout() {
        this._user = null;
    }

    /**
     * Process a login/signup response to store user data
     */
    _loggedIn(resp) {
        this._user = resp.user;
    }
}
