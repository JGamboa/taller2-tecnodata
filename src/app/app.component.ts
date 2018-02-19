import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { MapaPage } from '../pages/mapa/mapa';
import { WelcomePage } from '../pages/welcome/welcome';
import { LugaresPage } from "../pages/lugares/lugares";
import { SQLite } from '@ionic-native/sqlite';
import { LugaresService } from '../providers/lugares-service/lugares-service';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = WelcomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public lugaresService: LugaresService,
              public sqlite: SQLite) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage },
      { title: 'Lugares', component: LugaresPage },
      { title: 'Mapa', component: MapaPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.createDatabase();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

    private createDatabase(){
        this.sqlite.create({
            name: 'taller2.db',
            location: 'default' // the location field is required
        })
            .then((db) => {
                this.lugaresService.setDatabase(db);
                console.log(db);
                this.lugaresService.createTable();

                return this.lugaresService.initialSeed();

            })
            .then(() =>{
                this.splashScreen.hide();
            })
            .catch(error =>{
                console.error(error);
            });
    }

    logoutClicked() {
        console.log("Logout");
        this.lugaresService.setLogout();
    }

}
