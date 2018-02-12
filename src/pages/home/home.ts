import { Component } from '@angular/core';
import {AlertController, NavController, App} from 'ionic-angular';
//import { LugaresService } from '../../providers/lugares-service/lugares-service';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    userDetails : any;
    responseData: any;

    userPostData = {"name":"","token":""};

  constructor(public navCtrl: NavController,
              private alertCtrl: AlertController,
              public app: App,
              public authService: AuthServiceProvider)
  {

      console.log(localStorage.getItem('userData'));
      const data = JSON.parse(localStorage.getItem('userData'));
      this.userDetails = data;

      this.userPostData.name = this.userDetails.name;
      this.userPostData.token = this.userDetails.token;
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

  getToken(){
    //this.lugaresService.setToken();
    //let sq = this.lugaresService.getToken()
    //
      this.showAlert('token',  this.userPostData.token);


  }

    logout(){
        localStorage.clear();
        setTimeout(() => this.backToWelcome(), 1000);
    }

    backToWelcome(){
        const root = this.app.getRootNav();
        root.popToRoot();
    }

}
