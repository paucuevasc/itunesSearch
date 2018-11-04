import { Injectable } from '@angular/core';
import { Jsonp } from '@angular/http';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/operator/toPromise';

const API = {
  SEARCH: 'https://itunes.apple.com/search?',
  LOOKUP: 'https://itunes.apple.com/lookup?'
};



@Injectable()
export class ItunesService {
  private _albums: Array<any> = [];
  private _artistId = 0;

  constructor(private jsonp: Jsonp) { }
  public search(searchWord): Promise<any> {
    return this.jsonp.get(`${API.SEARCH}callback=JSONP_CALLBACK&media=music&country=US&entity=musicArtist&term=${searchWord}`)
    .toPromise()
    .then(data => data.json().results)
    .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.log(error);
    return Promise.reject(error.message || error);
  }
  public getAlbums(artistId: number): Promise<any> {

    if (artistId === this._artistId) {return new Promise(resolve => resolve(this._albums));
    this._artistId = artistId;
    return this.jsonp.get(`${API.LOOKUP}callback=JSONP_CALLBACK&entity=album&id=${artistId}`)
    .toPromise()
    .then(data => {
      this._albums = data.json().results.filter(results => {
        return results.wrapperType === 'collection';
      });

      return this._albums;
    })
    .catch(this.handleError);
  }
  }
}
