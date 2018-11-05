import { Component, OnInit } from '@angular/core';
import { ItunesService } from '../../../shared/itunes.service';
import { DisplayService } from '../../../shared/display.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {


  constructor(private itunesService: ItunesService,
    private displayService: DisplayService) { }


  searchResults = [];
  artistId = 0;
  selectedArtist: string;
  selectionMade = false;


  sendMessage(): void {
    this.displayService.sendMessage(this.selectionMade);
  }


  search(searchWord) {
    this.itunesService.search(searchWord).then(results => {
      this.searchResults = results;
      console.log(results);
      this.selectionMade = true;
      this.displayService.sendMessage(this.selectionMade);
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
