import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
 
  
  constructor(private angularFirestore: AngularFirestore ) { }
  
  public insertar(peliculas, datos) {

    return this.angularFirestore.collection(peliculas).add(datos);

  }

  public consultar (peliculas) {
    return this.angularFirestore.collection(peliculas).snapshotChanges();
  }
}