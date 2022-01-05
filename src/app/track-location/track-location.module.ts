import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrackLocationPageRoutingModule } from './track-location-routing.module';

import { TrackLocationPage } from './track-location.page';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrackLocationPageRoutingModule,
    MatButtonModule,
    MatIconModule
  ],
  declarations: [TrackLocationPage],
  providers: [Geolocation]
})
export class TrackLocationPageModule {}
