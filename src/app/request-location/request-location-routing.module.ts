import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RequestLocationPage } from './request-location.page';

const routes: Routes = [
  {
    path: '',
    component: RequestLocationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestLocationPageRoutingModule {}
