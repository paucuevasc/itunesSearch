import { Component, Input, OnInit } from '@angular/core';
import { ItunesService } from '../../shared/itunes.service';
import { DisplayService } from '../../shared/display.service';
import { CounterService } from '../../shared/counter.service';

import { Subscription } from 'rxjs/Subscription';

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
  selector: 'app-song',
  templateUrl: './song.component.html',
  providers: [ItunesService],
  styleUrls: ['./song.component.css']
})
export class SongComponent {
receivedMessage: Message;
selectionMade = false;
subscription: Subscription;
artistId: number;
artistName: string;
favCount: number;




  constructor(private itunesService: ItunesService,
              private counterService: CounterService,
              private displayService: DisplayService) {
                this.subscription =
                this.displayService.getMessage().subscribe((message: Message) => {
                  this.receivedMessage = message;
                  console.log( this.receivedMessage );
                  this.artistId = this.receivedMessage.artistId;
                  this.artistName = this.receivedMessage.selectedArtist;
                  this.selectionMade = this.receivedMessage.selectionMade;
                  console.log(this.artistId);
                  console.log(this.artistName);
                  console.log(this.selectionMade);
                  if (this.selectionMade === true) {
                  this.getAlbums(this.artistId);
                  }
                });
               }
songResults = [];

  getAlbums(artistId) {
    this.itunesService.getSongs(this.artistId).then((results: Array<any>) => {
      console.log(results);
      this.songResults = results;
      for (let i = 0; i < this.songResults.length; i++) {
        this.songResults[i].favorite = false;
      }


});
  }

  toFavorites(result) {
    result.favorite = !result.favorite;
    if (result.favorite === true) {
        this.favCount = 1;
    } else {
      this.favCount = -1;
    }
    this.counterService.sendFavCount( this.favCount );
  }
}


