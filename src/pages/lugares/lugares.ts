import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { LugaresService } from '../../providers/lugares-service/lugares-service';

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

  lugares: any[] = [];

  constructor(public alertCtrl: AlertController,
              public navCtrl: NavController,
              public navParams: NavParams,
              public lugaresService: LugaresService) {
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
        let alert = this.alertCtrl.create({
            title: 'Crear lugar',
            message: 'escribe el nombre del lugar',
            inputs: [
                {
                    name: 'titulo',
                    placeholder: 'Digitar nuevo Lugar.',
                }
            ],
            buttons: [
                {
                    text: 'Cancelar',
                    handler: () =>{
                        console.log('cancelar');
                    }
                },
                {
                    text: 'Crear',
                    handler: (data)=>{
                        data.latitud = '1';
                        data.longitud = '2';
                        this.lugaresService.create(data)
                            .then(response => {
                                this.lugares.unshift( data );
                                this.getAllPlaces();
                            })
                            .catch( error => {
                                console.error( error );
                            })
                    }
                }
            ]
        });
        alert.present();
    }


    updatePlace(task, index){
        task = Object.assign({}, task);
        task.completed = !task.completed;
        this.lugaresService.update(task)
            .then( response => {
                this.lugares[index] = task;
            })
            .catch( error => {
                console.error( error );
            })
    }


    deletePlace(task: any, index){
        this.lugaresService.delete(task)
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
