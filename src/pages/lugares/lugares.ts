import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { LugaresService } from '../../providers/lugares-service/lugares-service';
import { LugaresCreatePage } from "../lugares-create/lugares-create";
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

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



        }, (err) => {
            //console.log(JSON.stringify(err));
            this.showAlert('errores', JSON.stringify(err));
            if(err.error){
                //this.presentToast("Please give valid username and password");
            }
            //Connection failed message
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
      this.showAlert('lugar', JSON.stringify(lugar));
        this.authService.postData(lugar, "lugares").then((result) =>{
            //console.log(JSON.stringify(result));
            this.showAlert('datos', JSON.stringify(result));
            /*if(this.responseData.success){
                this.navCtrl.setRoot(HomePage);
            }
            else{
                //this.presentToast("Please give valid username and password");
            }*/



        }, (err) => {
            //console.log(JSON.stringify(err));
            this.showAlert('errores', JSON.stringify(err));
            if(err.error){
                //this.presentToast("Please give valid username and password");
            }
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
