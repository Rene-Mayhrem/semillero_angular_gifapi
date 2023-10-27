import { Component, Input } from '@angular/core';
import { PokemonResponse } from '../../interface/pokemon.interface';
import { PokemonService } from '../../service/pokemon.service';
import { GifService } from 'src/app/gifs/service/gif.service';
import { Gif } from 'src/app/gifs/interface/gif.interface';

@Component({
  selector: 'pokemon-component-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  @Input()
  name: string | undefined = '';
  gifs: Gif[] = [];

  show_gifs: boolean = false;

  pokemon_by_name: PokemonResponse = {
    abilities: [],
    base_experience: 0,
    forms: [],
    game_indices: [],
    height: 0,
    held_items: [],
    id: 0,
    is_default: false,
    location_area_encounters: '',
    moves: [],
    name: '',
    order: 0,
    past_abilities: [],
    past_types: [],
    species: { name: '', url: '' },
    sprites: {
      front_default: '',
    },
    stats: [],
    types: [],
    weight: 0,
  };

  constructor(
    private service: PokemonService,
    private gif_service: GifService
  ) {
    console.log(name);
  }

  print(): void {
    this.get_pokemon_detail(this.name || '');
    this.show_gifs = !this.show_gifs;
    this.gif_service.get_gifs_pokemon(this.name || '').subscribe((gifs) => {
      this.gifs = gifs.data;
      console.log(this.gifs);
    });
  }

  get_pokemon_detail(name: string): void {
    this.service.get_pokemon_by_name(name).forEach((pokemon) => {
      console.log(pokemon);
      this.pokemon_by_name = pokemon;
    });
  }
}
