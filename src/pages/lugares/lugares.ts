import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { LugaresService } from '../../providers/lugares-service/lugares-service';
import { LugaresCreatePage } from "../lugares-create/lugares-create";
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { CommonProvider } from '../../providers/common/common';

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

  responseData : any;
  coords : any;
  lugares : any[] = [];

  constructor(public alertCtrl: AlertController,
              public navCtrl: NavController,
              public navParams: NavParams,
              public lugaresService: LugaresService,
              public authService : AuthServiceProvider,
              public common: CommonProvider,
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

    sincronizar(lugar: any, index){
        this.common.presentLoading();
        this.authService.postData(lugar, "lugares").then(

            result =>{
            this.responseData = result;
            if(this.responseData.success){
                this.common.closeLoading();
                this.navCtrl.setRoot(LugaresPage);

            }
            else{
                console.log('No access');
                //this.presentToast("Please give valid username and password");
            }
            /*
            setTimeout(() => {
                this.showAlert('Error', 'Sincronización fallida');
            }, 10000);*/

        }, err => {
            //console.log(JSON.stringify(err));
            this.common.closeLoading();
            this.showAlert('errores', JSON.stringify(err));
            if(err.error){
                //this.presentToast("Please give valid username and password");
            }
            /*
            setTimeout(() => {
                this.showAlert('Error TM', 'Sincronización fallida');
            }, 10000);
            */
            //Connection failed message
        });
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
