import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { SignupPage } from '../signup/signup';
import {HomePage} from "../home/home";
/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {

     if(localStorage.getItem('userData')){
         this.navCtrl.setRoot(HomePage);
     }
  }

    login(){
        this.navCtrl.push(LoginPage);
    }

    signup(){
        this.navCtrl.push(SignupPage);
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }

}
