import { Component } from '@angular/core';
import { Gif } from '../../interface/gif.interface';
import { GifService } from '../../service/gif.service';

@Component({
  selector: 'gifs-component-list',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.css'],
})
export class ListCardComponent {
  constructor(private service: GifService) {}

  get gifs(): Gif[] {
    return this.service.gifs;
  }
}
