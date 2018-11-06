import { Component, OnInit } from '@angular/core';
import { ItunesService } from '../../../shared/itunes.service';
import { DisplayService } from '../../../shared/display.service';
import { Observable } from 'rxjs';

export class Message {
  artistId: number;
  selectedArtist: string;
  selectionMade: boolean;


  constructor(artistId: number, selectedArtist: string, selectionMade: boolean) {
    this.artistId = artistId;
    this.selectedArtist = selectedArtist;
    this.selectionMade = selectionMade;
  }
}


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})



export class NavbarComponent {



selectionMade = false;

  constructor(private itunesService: ItunesService,
    private displayService: DisplayService) { }


  searchResults = [];

  search(searchWord) {
    this.selectionMade = false;
    this.itunesService.search(searchWord).then(results => {
      this.searchResults = results;
      console.log(results);
    });
  }
  selectArtist(artistId: number, artistName: string, selectionMade: boolean) {
    const message = new Message(artistId, artistName, selectionMade = true);
    console.log( message );
    this.selectionMade = message.selectionMade;
    this.displayService.sendMessage( message );


  }





}
