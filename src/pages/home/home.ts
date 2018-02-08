import { Component } from '@angular/core';
import {AlertController, NavController} from 'ionic-angular';
import { LugaresService } from '../../providers/lugares-service/lugares-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
              private alertCtrl: AlertController,
              private lugaresService: LugaresService) {

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
    this.lugaresService.setToken();
    this.showAlert('token', this.lugaresService.getToken());
  }



}
