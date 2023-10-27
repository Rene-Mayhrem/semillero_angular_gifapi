import { Component, Input } from '@angular/core';
import { Gif } from '../../interface/gif.interface';
import { GifService } from '../../service/gif.service';

@Component({
  selector: 'gifs-component-list',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.css'],
})
export class ListCardComponent {
  @Input()
  public gifs_data: Gif[] = [];
  constructor(private service: GifService) {}

  get gifs(): Gif[] {
    return this.service.gifs;
  }
}
