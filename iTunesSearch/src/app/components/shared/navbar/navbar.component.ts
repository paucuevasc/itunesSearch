import { Component, OnInit } from '@angular/core';
import { ItunesService } from '../../../shared/itunes.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {

  searchResults = [];
  artistId = 0;
  selectedArtist: string;
  selectionMade = false;
  constructor(private itunesService: ItunesService) { }


  search(searchWord) {
    this.itunesService.search(searchWord).then(results => {
      this.searchResults = results;
      console.log(results);
    });
  }
  selectArtist(artistId: number, artistName: string) {
    this.artistId = artistId;
    this.selectedArtist = artistName;
    console.log(this.selectedArtist);
    this.selectionMade = true;

  }
  ngOnInit() {
  }

}
