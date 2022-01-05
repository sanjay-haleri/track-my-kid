import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./guest/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./guest/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'request-location',
    loadChildren: () => import('./request-location/request-location.module').then( m => m.RequestLocationPageModule)
  },
  {
    path: 'track-location',
    loadChildren: () => import('./track-location/track-location.module').then( m => m.TrackLocationPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
