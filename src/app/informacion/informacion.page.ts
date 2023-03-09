import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.page.html',
  styleUrls: ['./informacion.page.scss'],
})
export class InformacionPage implements OnInit {

  map: L.Map;
  

  constructor(private callNumber: CallNumber) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.loadMap();
  }

  loadMap() {
    let latitud = 36.920998;
    let longitud = -5.540976;
    let zoom = 15;
    this.map = L.map("mapId").setView([latitud, longitud], zoom);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
        .addTo(this.map);
  }
  
  clicBotonContacto () {

    this.callNumber.callNumber("18001010101", true)
  .then(res => console.log('Launched dialer!', res))
  .catch(err => console.log('Error launching dialer', err));
  
  }
}
