import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from '../about/about.component';
import { HomepageComponent } from '../homepage/homepage.component';
import { DetailsPageComponent } from '../details-page/details-page.component';
import { MapComponent } from '../map/map.component';

const routes: Routes = [
  {
    path: '',
    //component: HomepageComponent,
    redirectTo: 'about',
    pathMatch: 'full'
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'city/:location',
    component: DetailsPageComponent,
  },
  {
    path: 'map',
    component: MapComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [],
})
export class AppRoutingModule {}
