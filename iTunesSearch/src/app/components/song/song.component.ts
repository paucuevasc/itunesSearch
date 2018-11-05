import { Component, Input, OnInit } from '@angular/core';
import { ItunesService } from '../../shared/itunes.service';
import { DisplayService } from '../../shared/display.service';

import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  providers: [ItunesService],
  styleUrls: ['./song.component.css']
})
export class SongComponent {
message: any;
selectionMade = false;
subscription: Subscription;

  private view;
  @Input()
  set artistId(artistId: number) {
    this.artistId = artistId;
    this.getAlbums();
  }
  get artistId() { return this.artistId; }

  constructor(private itunesService: ItunesService,
              private displayService: DisplayService) {
                this.subscription =
                this.displayService.getMessage().subscribe(message => {
                  this.message = message;
                  console.log(this.message);
                  this.selectionMade = this.message;
                });
               }

  getAlbums() {
    this.itunesService.getAlbums(this.artistId).then((results: Array<any>) => {
      this.view = {
        data: results,
        total: results.length
      };
});
  }
}
