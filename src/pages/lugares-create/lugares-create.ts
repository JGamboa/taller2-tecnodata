import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

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

  lugares: any = '';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private camera: Camera) {
  }

  tomarFotografia(){
      let options: CameraOptions = {
          destinationType: this.camera.DestinationType.DATA_URL,
          targetWidth: 1000,
          targetHeight: 1000,
          quality: 100
      }
      this.camera.getPicture( options )
          .then(imageData => {
              this.lugares.photo = `data:image/jpeg;base64,${imageData}`;
          })
          .catch(error =>{
              console.error( error );
          });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LugaresCreatePage');
  }

}
