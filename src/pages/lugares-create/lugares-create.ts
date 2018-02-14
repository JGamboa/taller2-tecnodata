import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ActionSheetController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Geolocation } from "@ionic-native/geolocation";
import { LugaresService } from '../../providers/lugares-service/lugares-service';
import {LugaresPage} from "../lugares/lugares";

/**
 * Generated class for the LugaresCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lugares-create',
  templateUrl: 'lugares-create.html',
})
export class LugaresCreatePage {

    private coords: any;

    lugares = {
        titulo: '',
        longitud: '',
        latitud: '',
        photo: '',
    };

      constructor(public navCtrl: NavController,
                  public navParams: NavParams,
                  private camera: Camera,
                  public alertCtrl: AlertController,
                  private loadingCtrl: LoadingController,
                  private geolocation: Geolocation,
                  public actionSheetCtrl: ActionSheetController,
                  private lugaresService: LugaresService) {
      }

    public presentActionSheet() {
        let actionSheet = this.actionSheetCtrl.create({
            title: 'Select Image Source',
            buttons: [
                {
                    text: 'Load from Library',
                    handler: () => {
                        //this.tomarFotografia(this.camera.PictureSourceType.PHOTOLIBRARY);
                    }
                },
                {
                    text: 'Use Camera',
                    handler: () => {
                        //this.tomarFotografia(this.camera.PictureSourceType.CAMERA);
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel'
                }
            ]
        });
        actionSheet.present();
    }

  tomarFotografia(){
      let options: CameraOptions = {
          destinationType: this.camera.DestinationType.DATA_URL,
          targetWidth: 1000,
          targetHeight: 1000,
          quality: 100,
          saveToPhotoAlbum: true,
          mediaType: this.camera.MediaType.PICTURE
      }
      this.camera.getPicture( options )
          .then(imageData => {
              this.lugares.photo = `data:image/jpeg;base64,${imageData}`;
          })
          .catch(error =>{
              console.error( error );
              this.displayErrorAlert(error);
          });
  }


    displayErrorAlert(err){
        console.log(err);
        let alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: 'Error while trying to capture picture',
            buttons: ['OK']
        });
        alert.present();
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LugaresCreatePage');
  }

    obtainLoc(){
        let loadingCtrl = this.loadingCtrl.create({ content: "Obteniendo coordenadas..."});
        loadingCtrl.present();
        var posOptions = {timeout: 5000, enableHighAccuracy: true};
        this.geolocation
            .getCurrentPosition(posOptions)
            .then(
                (position) =>
                {
                    this.coords = position.coords;
                    loadingCtrl.dismiss();
                }
            ).catch((error)=>{
                loadingCtrl.dismiss();
                this.displayErrorAlert(error);
                console.log('Error getting location ', JSON.stringify(error));
        });

    }

    saveForm() {
        this.obtainLoc();
        this.lugares.latitud = this.coords.latitude;
        this.lugares.longitud = this.coords.longitude;
        this.lugaresService.create(this.lugares);
        this.navCtrl.setRoot(LugaresPage);
    }



}
