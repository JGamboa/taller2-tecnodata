import { Component } from '@angular/core';
import {App, IonicPage, NavController, ToastController} from 'ionic-angular';

import { UserProvider } from '../../providers/user/user';
import {HomePage} from "../home/home";
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';


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

    token: any;

    responseData : any;
    userData: { email: string, password: string, servidor: string } = {
        email: 'joaquin.gamboaf@gmail.com',
        password: 'test12',
        servidor: ''
    };


    // Our translated text strings
    private loginErrorString: string;

    constructor(public navCtrl: NavController,
                public user: UserProvider,
                public toastCtrl: ToastController,
                public authService : AuthServiceProvider,
                public app: App,
    ) {

            this.loginErrorString = 'Error al iniciar sesión';
    }

    presentToast(msg) {
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 2000
        });
        toast.present();
    }

    login(){
        if(this.userData.email && this.userData.password){
            this.presentToast(this.userData.servidor);
            localStorage.setItem('servidor', this.userData.servidor);
            this.authService.postData(this.userData, "login").then((result) =>{
                this.responseData = result;
                if(this.responseData.success){
                    localStorage.setItem('userData', JSON.stringify(this.responseData.success) );
                    this.enterAPP();
                }
                else{
                    this.presentToast("Please give valid username and password");
                }



            }, (err) => {
                if(err.error){
                    this.presentToast("Please give valid username and password");
                }
                //Connection failed message
            });
        }
        else{
            this.presentToast("Give username and password");
        }

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad Login Page');
    }


    enterAPP(){
        setTimeout(() => this.goToHome(), 3000);
    }

    goToHome(){
        this.navCtrl.setRoot(HomePage);
        const root = this.app.getRootNav();
        root.popToRoot();
    }
}