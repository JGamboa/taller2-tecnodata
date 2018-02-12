import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { ApiProvider } from '../api/api';
import { Storage } from '@ionic/storage';


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

    constructor(public api: ApiProvider, private storage: Storage) { }

    /**
     * Send a POST request to our login endpoint with the data
     * the user entered on the form.
     */
    login(accountInfo: any) {
         this.api.postRes('api/login',accountInfo).subscribe(
             (res) => {
                 this.storage.set('token', res['success']['token']);
                 this._loggedIn(res['success']['token']);
                 return true;
             },
             (error) => {
                 console.error('stringyf: '+ JSON.stringify(error));
                 return false;
             }
         );
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
