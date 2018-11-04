import { Component, Input, OnInit } from '@angular/core';
import { ItunesService } from '../../shared/itunes.service';
import { NavbarComponent } from '../shared/navbar/navbar.component';


@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  providers: [ItunesService],
  styleUrls: ['./song.component.css']
})
export class SongComponent {


  selectionMade = this.navbarComponent.selectionMade;
  private view;
  @Input()
  set artistId(artistId: number) {
    this.artistId = artistId;
    this.getAlbums();
  }
  get artistId() { return this.artistId; }

  constructor(private itunesService: ItunesService,
              private navbarComponent: NavbarComponent) { }

  getAlbums() {
    this.itunesService.getAlbums(this.artistId).then((results: Array<any>) => {
      this.view = {
        data: results,
        total: results.length
      };
});
  }
}
