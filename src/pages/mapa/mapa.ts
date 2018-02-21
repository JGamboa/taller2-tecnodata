import {
    GoogleMaps,
    GoogleMap,
    GoogleMapsEvent,
    GoogleMapOptions,
    //CameraPosition,
    //MarkerOptions,
    //Marker
} from '@ionic-native/google-maps';
import { Component } from "@angular/core/";
import { IonicPage } from 'ionic-angular';
import {LugaresService} from "../../providers/lugares-service/lugares-service";

/**
 * Generated class for the MapaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html',
})
export class MapaPage {
  map: GoogleMap;
  lugares : any[] = [];

  constructor(public lugaresService: LugaresService) {
  }

  ionViewDidLoad() {
      this.getAllPlaces();
      this.loadMap();
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

    loadMap(){

        let mapOptions: GoogleMapOptions = {
            camera: {
                target: {
                    lat: 43.0741904, // default location
                    lng: -89.3809802 // default location
                },
                zoom: 18,
                tilt: 30
            }
        };

        this.map = GoogleMaps.create('map_canvas', mapOptions);

        // Wait the MAP_READY before using any methods.
        this.map.one(GoogleMapsEvent.MAP_READY)
            .then(() => {
                // Now you can use all methods safely.
                this.getPosition();
            })
            .catch(error =>{
                console.log(error);
            });

    }

    getPosition(): void{
        this.map.getMyLocation()
            .then(response => {
                this.map.moveCamera({
                    target: response.latLng
                });

                for(let data of this.lugares){
                    this.map.addMarker({
                        title: data.titulo,
                        icon: 'blue',
                        animation: 'DROP',
                        position: {
                            lat: data.latitud,
                            lng: data.longitud,
                        }
                    });
                }

            })
            .catch(error =>{
                console.log(error);
            });
    }
}

