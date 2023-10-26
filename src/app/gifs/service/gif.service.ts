import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interface/gif.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GifService {
  public gifs: Gif[] = [];
  private url: string = 'https://api.giphy.com/v1/gifs';
  private api_key: string = 'JaVGNZHr8e65kZbFrQRp82ovg8yj6bJ5';

  constructor(private http: HttpClient) {}

  searchTag(tag: string): void {
    const params = new HttpParams()
      .set('api_key', this.api_key)
      .set('q', tag)
      .set('limit', 10);
    this.http
      .get<SearchResponse>(`${this.url}/search`, { params })
      .subscribe((result) => {
        this.gifs = result.data;
        console.log({ gifs: this.gifs });
      });
  }

  get_gifs_pokemon(tag: string): Observable<SearchResponse> {
    const params = new HttpParams()
      .set('api_key', this.api_key)
      .set('q', `pokemon-${tag}`)
      .set('limit', 10);
    return this.http.get<SearchResponse>(`${this.url}/search`, { params });
  }
}
