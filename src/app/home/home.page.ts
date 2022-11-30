import { Component } from '@angular/core';
import { Pelicula } from '../pelicula';

import { FirestoreService } from '../firestore.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
 
  editarPeliculas: Pelicula;
  arrayColeccionPeliculas: any = [{
    id: "",
    data: {} as Pelicula

  }];

  constructor(private firestoreService: FirestoreService) {
    this.editarPeliculas = {} as Pelicula;

    this.obtenerListaPeliculas();
  }

  clicBotonInsertar() {
    this.firestoreService.insertar("peliculas", this.editarPeliculas)
    .then(() => {
      console.log("Pelicula creada correctamente");

      // Limpiar el contenido de la pelicula que se esta editando
      this.editarPeliculas = {} as Pelicula;
    }, (error) => {
      console.error(error);
    }
    );

  }

  obtenerListaPeliculas() {
    this.firestoreService.consultar("Peliculas").subscribe((resultadoConsultaPeliculas) => {

      this.arrayColeccionPeliculas =[];
      resultadoConsultaPeliculas.forEach((datosPelicula: any) => {
        this.arrayColeccionPeliculas.push({
          id: datosPelicula.payload.doc.id,
          data: datosPelicula.payload.doc.data()
        })
      })
    })


  }



}
