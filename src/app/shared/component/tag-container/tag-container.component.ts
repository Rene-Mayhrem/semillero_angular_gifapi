import { Component, Input } from '@angular/core';
import { PokemonService } from 'src/app/pokemon/service/pokemon.service';

@Component({
  selector: 'shared-component-tag',
  templateUrl: './tag-container.component.html',
  styleUrls: ['./tag-container.component.css'],
})
export class TagContainerComponent {
  @Input()
  public tags: string[] = [];

  constructor(private service: PokemonService) {}

  search_content(tag: string) {
    this.service.search_content_tag(tag);
  }
}
