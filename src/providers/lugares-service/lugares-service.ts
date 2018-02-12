import { SQLiteObject } from '@ionic-native/sqlite';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/*
  Generated class for the LugaresServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LugaresService {

    db: SQLiteObject = null;

    constructor(private storage: Storage) {}

    setDatabase(db: SQLiteObject){
        if(this.db === null){
            this.db = db;
        }
    }

    initialSeed(){
        this.storage.get('database_filled').then(val => {
            console.log('database_filled ' + val);
            if(val){
                return true;
            }else{
                let sql = 'INSERT INTO lugares(titulo, latitud, longitud) VALUES("Algarrobo", "1","2")';
                this.storage.set('database_filled', true);
                return this.db.executeSql(sql, []);
            }
        });

    }

    createTable(){
        let sql = 'CREATE TABLE IF NOT EXISTS lugares(id INTEGER PRIMARY KEY AUTOINCREMENT, titulo TEXT, latitud TEXT, longitud, TEXT, photo TEXT)';
        return this.db.executeSql(sql, []);
    }

    setLogout(){
        this.storage.set('token', '');
    }

    getToken(){
        this.storage.get('token').then((val) =>{
            console.log(val);
            return val;
        });
    }

    setToken(){
        this.storage.set('token', true);
    }

    getLoggedIn(){
        this.storage.get('token').then(val => {
            if(val != ''){
                return true;
            }else{
                return false;
            }
        });
    }

    getAll(){
        let sql = 'SELECT * FROM lugares';
        return this.db.executeSql(sql, [])
            .then(response => {
                let tasks = [];
                for (let index = 0; index < response.rows.length; index++) {
                    tasks.push( response.rows.item(index) );
                }
                return Promise.resolve( tasks );
            })
            .catch(error => Promise.reject(error));
    }

    create(lugar: any){
        let sql = 'INSERT INTO lugares(titulo, latitud, longitud, photo) VALUES(?,?,?,?)';
        return this.db.executeSql(sql, [lugar.titulo, lugar.latitud, lugar.longitud, lugar.photo]);
    }

    update(lugar: any){
        let sql = 'UPDATE lugares SET titulo=? WHERE id=?';
        return this.db.executeSql(sql, [lugar.titulo, lugar.id]);
    }

    delete(lugar: any){
        let sql = 'DELETE FROM lugares WHERE id=?';
        return this.db.executeSql(sql, [lugar.id]);
    }








}
