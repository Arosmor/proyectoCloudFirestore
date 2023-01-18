import { Component } from '@angular/core';
import { Pelicula } from '../pelicula';

import { FirestoreService } from '../firestore.service';
import { Router } from '@angular/router';

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

  constructor(private firestoreService: FirestoreService, private router: Router) {
    this.editarPeliculas = {} as Pelicula;

    this.obtenerListaPeliculas();
  }

  document: any = {
    id: "",
    data: {} as Pelicula
  };

  

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

  clicBotonBorrar() {
    this.firestoreService.borrar("peliculas", this.idPeliculaSelec).then(() => {
      // Actualizar la lista completa
      this.obtenerListaPeliculas();
      // Limpiar datos de pantalla
      this.editarPeliculas = {} as Pelicula;
    })
  }

  clicBotonModificar() {
    this.firestoreService.actualizar("peliculas", this.idPeliculaSelec, this.editarPeliculas).then(() => {
      // Actualizar la lista completa
      this.obtenerListaPeliculas();
      // Limpiar datos de pantalla
      this.editarPeliculas = {} as Pelicula;
    })
  }


  idPeliculaSelec: string;

  selecPelicula(peliculaSelec) {
    console.log("Tarea seleccionada: ");
    console.log(peliculaSelec);
    this.idPeliculaSelec = peliculaSelec.id;
    this.editarPeliculas.titulo = peliculaSelec.data.titulo;
    this.editarPeliculas.generoPelicula = peliculaSelec.data.generoPelicula;
    this.editarPeliculas.director = peliculaSelec.data.director;
    this.editarPeliculas.actorPrincipal = peliculaSelec.data.actorPrincipal;
    this.editarPeliculas.fechaSalida = peliculaSelec.data.fechaSalida;
    this.editarPeliculas.precioCines = peliculaSelec.data.precioCines;
    this.editarPeliculas.paisProduccion = peliculaSelec.data.paisProduccion;

    this.router.navigate(['/detalle', this.idPeliculaSelec]);
  }

  obtenerListaPeliculas() {
    this.firestoreService.consultar("peliculas").subscribe((resultadoConsultaPeliculas) => {

      this.arrayColeccionPeliculas = [] ;
      resultadoConsultaPeliculas.forEach((datosPelicula: any) => {
        this.arrayColeccionPeliculas.push({
          id: datosPelicula.payload.doc.id,
          data: datosPelicula.payload.doc.data()
        })
      })
    })


  }



}
