import { Component } from '@angular/core';
import { Pelicula } from '../pelicula';

import { FirestoreService } from '../firestore.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { ImagePicker } from '@awesome-cordova-plugins/image-picker/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
 
  idPeliculaSelec: string;
  nuevaPelicula: string;

  editarPeliculas: Pelicula;
  arrayColeccionPeliculas: any = [{
    id: "",
    data: {} as Pelicula

  }];

  constructor(private firestoreService: FirestoreService,
     private router: Router,
     private loadingControler: LoadingController,
     private toastController: ToastController,
     private imagePicker: ImagePicker ) {
    this.editarPeliculas = {} as Pelicula;

    this.obtenerListaPeliculas();
  }

  document: any = {
    id: "",
    data: {} as Pelicula
  };


  clicBotonInsertar() {
    // console.log(this.idPeliculaSelec);
    // this.firestoreService.insertar("peliculas", this.nuevaPelicula).then(() => {

    // }
    // );
      this.router.navigate(['/detalle/:id']);


  }

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
