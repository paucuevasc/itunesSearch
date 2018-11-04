import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
 import { HttpModule, JsonpModule } from '@angular/http';

 import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { ItunesService } from './shared/itunes.service';
import { SongComponent } from './components/song/song.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    SongComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule

  ],
  providers: [ItunesService, NavbarComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
