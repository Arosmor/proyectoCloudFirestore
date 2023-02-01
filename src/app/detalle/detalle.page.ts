import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../firestore.service';

import { Router } from '@angular/router';
import { Pelicula } from '../pelicula';

import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { ImagePicker } from '@awesome-cordova-plugins/image-picker/ngx';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})

export class DetallePage implements OnInit {

  id: string = "";

  idPeliculaSelec: string;
 // editarPeliculas: Pelicula;
  
  documentPelicula: any = {
    id: "",
    data: {} as Pelicula
  };


  constructor(private activatedRoute: ActivatedRoute, private firestoreService: FirestoreService, private router: Router,
    private loadingControler: LoadingController,
    private toastController: ToastController,
    private imagePicker: ImagePicker) { 

  }
  
  
  async uploadImagePicker() {

    const loading = await this.loadingControler.create({

      message: 'Please wait...'
      
    });

    const toast = await this.toastController.create({

      message: 'Image was updated successfully'
    });

    this.imagePicker.hasReadPermission().then(
      (result) => {

        if(result == false) {
          this.imagePicker.requestReadPermission();

        } else {

          this.imagePicker.getPictures({
            maximumImagesCount: 1,
            outputType: 1

          }).then(
            (results) => {

              let nombreCarpeta = "imagenes";

              for (var i = 0; i < results.length; i++) {
                loading.present();
                let nombreImagen = `${new Date().getTime()}`;
                this.firestoreService.uploadImage(nombreCarpeta, nombreImagen, results[i])

                .then(snapshot => {
                  snapshot.ref.getDownloadURL().then(downloadURL => {
                    console.log("donwloadURL:" + downloadURL);
                    toast.present();
                    loading.dismiss();
                  })
                })
              }
            }, (err) => {
                console.log(err)
            }
          );
        }
      }, (err) => {
        console.log(err);
      });
  }
  
  async deleteFile(fileURL){
    const toast = await this.toastController.create({
      message: 'File was deleted successfully',
      duration: 3000
    });
    this.firestoreService.deleteFileFromURL(fileURL)
      .then(() => {
        toast.present();
      }, (err) => {
          console.log(err);
      });
  }

  clicBotonInsertar() {

    this.firestoreService.insertar("peliculas", this.documentPelicula.data)
    .then(() => {
      console.log("Pelicula creada correctamente");

      // Limpiar el contenido de la pelicula que se esta editando
      this.documentPelicula.data = {} as Pelicula;
    }, (error) => {
      console.error(error);

    }
    );
  }

  clicBotonBorrar() {
    this.firestoreService.borrar("peliculas", this.id).then(() => {
      // Actualizar la lista completa
      // this.documentPelicula.data();
      // Limpiar datos de pantalla
      this.documentPelicula.data = {} as Pelicula;
      // this.router.navigate(['/home']);

    })
  }

  clicBotonModificar() {
    this.firestoreService.actualizar("peliculas", this.id, this.documentPelicula.data).then(() => {
      // Actualizar la lista completa
      // this.documentPelicula.data();
      // Limpiar datos de pantalla
      this.documentPelicula.data = {} as Pelicula;
    })
  }

  clicBotonVolver() {
    this.router.navigate(['/home']);

  }


  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    this.firestoreService.consultarPorId("peliculas", this.id).subscribe((resultado) => {
      // Preguntar si se hay encontrado un document con ese ID
      if(resultado.payload.data() != null) {
        this.documentPelicula.id = resultado.payload.id
        this.documentPelicula.data = resultado.payload.data();
        // Como ejemplo, mostrar el título de la tarea en consola
        console.log(this.documentPelicula.data.titulo);
      } else {
        // No se ha encontrado un document con ese ID. Vaciar los datos que hubiera
        this.documentPelicula.data = {} as Pelicula;
      } 
    });
  }

}
