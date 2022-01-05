import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { IonicModule } from '@ionic/angular';

import { RequestLocationPageRoutingModule } from './request-location-routing.module';

import { RequestLocationPage } from './request-location.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RequestLocationPageRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule
  ],
  declarations: [RequestLocationPage],
  providers: [Geolocation],
})
export class RequestLocationPageModule {}
