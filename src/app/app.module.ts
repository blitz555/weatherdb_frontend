import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { CityListComponent } from './city-list/city-list.component';
import { FrameworkComponent } from './framework/framework.component';
import { AboutComponent } from './about/about.component';
import { HomepageComponent } from './homepage/homepage.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DistancePipe } from './distance.pipe';
import { HtmlLineBreaksPipe } from './html-line-breaks.pipe';
import { CityDetailsComponent } from './city-details/city-details.component';
import { DetailsPageComponent } from './details-page/details-page.component';
import { GraphTempComponent } from './graph-temp/graph-temp.component';
import { GraphPrecipComponent } from './graph-precip/graph-precip.component';
import { MapComponent } from './map/map.component';

@NgModule({
  declarations: [
    CityListComponent,
    FrameworkComponent,
    AboutComponent,
    HomepageComponent,
    PageHeaderComponent,
    SidebarComponent,
    DistancePipe,
    HtmlLineBreaksPipe,
    CityDetailsComponent,
    DetailsPageComponent,
    GraphTempComponent,
    GraphPrecipComponent,
    MapComponent,
  ],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule],
  providers: [],
  bootstrap: [FrameworkComponent],
})
export class AppModule {}
