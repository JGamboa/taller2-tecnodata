import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import {HomePage} from "../home/home";

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  responseData : any;

  userData = {"name": "", "email": "", "password": "", "c_password": ""};

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public authService : AuthServiceProvider,
              public toastCtrl: ToastController,
              )
  {
    localStorage.setItem('servidor', '200.111.159.19:81');
  }

    signup(){
        this.authService.postData(this.userData,'register').then((result) => {
            this.responseData = result;
            if(this.responseData.success){
                localStorage.setItem('userData', JSON.stringify(this.responseData.success));
                this.navCtrl.push(HomePage);
            }else{
              console.log("User already exists");
            }
        }, (err) => {
              if(err.error.error) {
                  let toast = this.toastCtrl.create({
                      message: JSON.stringify(err.error.error),
                      duration: 3000,
                      position: 'top'
                  });
                  toast.present();
              }else{
                console.log("User already exists");
              }
        });

    }

    login(){
        //Login page link
        this.navCtrl.push(LoginPage);
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

}
