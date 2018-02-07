import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, ToastController, AlertController} from 'ionic-angular';

import { HomePage } from '../home/home';
import { UserProvider } from '../../providers/user/user';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})


export class LoginPage {
    // The account fields for the login form.
    // If you're using the username field with or without email, make
    // sure to add it to the type
    datos: any;
    token: any;
    account: { email: string, password: string } = {
        email: 'joaquin.gamboaf@gmail.com',
        password: 'misabel2'
    };


    // Our translated text strings
    private loginErrorString: string;

    constructor(public navCtrl: NavController,
                public user: UserProvider,
                public toastCtrl: ToastController,
                private loadingCtrl: LoadingController,
                private alertCtrl: AlertController
                ) {

            this.loginErrorString = 'Error al iniciar sesión';
    }

    showAlert(title, mensaje) {
        return new Promise((resolve, reject) => {

            let alert = this.alertCtrl.create({
                title: title,
                subTitle: mensaje,
                buttons: [{
                    text: 'OK',
                    handler: () => {
                        alert.dismiss().then(() => {
                            resolve(true);
                        });
                        return false;
                    }
                }]
            });

            alert.present();

        });
    }

    // Attempt to login in through our User service
    doLogin() {

        let loadingCtrl = this.loadingCtrl.create({content: "Please wait..."});
        loadingCtrl.present();

        const promise = new Promise((resolve, reject)=>{
            this.user.login(this.account).then((data:any) =>{
                resolve(data);
                loadingCtrl.dismiss();

            }).catch((res:any)=>{
                loadingCtrl.dismiss();
                let toast = this.toastCtrl.create({
                    message: this.loginErrorString,
                    duration: 3000,
                    position: 'top'
                });
                toast.present(); 
                //this.showAlert("ERROR", res.error.error);
            });


        });



        promise.then((res)=>{
            this.navCtrl.push(HomePage);
        });






        /*
        this.user.login(this.account).then((resp) => {
            console.log('aqui');

        }, (err) => {
            console.error('errr: ' +JSON.stringify(err));
            this.navCtrl.setRoot(LoginPage);
            // Unable to log in

        });

        */
    }
}