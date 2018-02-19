import { Component } from '@angular/core';
import {AlertController, NavController, App} from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import {WelcomePage} from "../welcome/welcome";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    userDetails : any;
    responseData: any;

    userPostData = {"name":"","token":"", "servidor":""};

  constructor(public navCtrl: NavController,
              private alertCtrl: AlertController,
              public app: App,
              public authService: AuthServiceProvider)
  {

      console.log(localStorage.getItem('userData'));
      const data = JSON.parse(localStorage.getItem('userData'));
      this.userDetails = data;

      this.userDetails.servidor = localStorage.getItem('servidor');
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
        this.navCtrl.setRoot(WelcomePage);
        const root = this.app.getRootNav();
        root.popToRoot();
    }


    verifyUser(){
        this.authService.postData(null, "details").then((result) =>{
            //console.log(JSON.stringify(result));
            this.showAlert('datos', JSON.stringify(result));
            /*if(this.responseData.success){
                this.navCtrl.setRoot(HomePage);
            }
            else{
                //this.presentToast("Please give valid username and password");
            }*/

            /*setTimeout(() => {
                this.showAlert('Error', 'Sincronización fallida');
            }, 10000);*/

        }, (err) => {
            //console.log(JSON.stringify(err));
            this.showAlert('errores', JSON.stringify(err));
            if(err.error){
                //this.presentToast("Please give valid username and password");
            }
            /*
            setTimeout(() => {
                this.showAlert('Error', 'Sincronización fallida');
            }, 10000);*/
            //Connection failed message
        });

    }
}
