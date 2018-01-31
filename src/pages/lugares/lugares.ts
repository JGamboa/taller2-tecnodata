import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController, LoadingController} from 'ionic-angular';
import { LugaresService } from '../../providers/lugares-service/lugares-service';
import { Geolocation } from '@ionic-native/geolocation';
import { LugaresCreatePage } from "../lugares-create/lugares-create";

/**
 * Generated class for the LugaresPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lugares',
  templateUrl: 'lugares.html',
})
export class LugaresPage {

  coords: any;
  lugares: any[] = [];

  constructor(public alertCtrl: AlertController,
              public navCtrl: NavController,
              public navParams: NavParams,
              public lugaresService: LugaresService,
              private geolocation: Geolocation,
              private loadingCtrl: LoadingController,
              ) {
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

    obtainLoc(){
        let loadingCtrl = this.loadingCtrl.create({ content: "Obteniendo coordenadas..."});
        loadingCtrl.present();
        var posOptions = {timeout: 10000, enableHighAccuracy: true};
        this.geolocation
            .getCurrentPosition(posOptions)
            .then(
                (position) =>
                {
                    this.coords = position.coords;
                    loadingCtrl.dismiss();
                }
            );

    }

    getAllPlaces(){
        this.lugaresService.getAll()
            .then(places => {
                this.lugares = places;
            })
            .catch( error => {
                console.error( error );
            });
    }

    openAlertNewPlace(){
        this.navCtrl.push(LugaresCreatePage);
    }


    updatePlace(lugar, index){
        lugar = Object.assign({}, lugar);
        lugar.completed = !lugar.completed;
        this.lugaresService.update(lugar)
            .then( response => {
                this.lugares[index] = lugar;
            })
            .catch( error => {
                console.error( error );
            })
    }


    deletePlace(lugar: any, index){
        this.lugaresService.delete(lugar)
            .then(response => {
                console.log( response );
                this.lugares.splice(index, 1);
            })
            .catch( error => {
                console.error( error );
            })
    }



    ionViewDidLoad() {
    console.log('ionViewDidLoad LugaresPage');
    this.getAllPlaces();
  }

}
