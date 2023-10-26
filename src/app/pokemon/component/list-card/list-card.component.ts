import { Component } from '@angular/core';
import {
  ApiResponse,
  PokemonResponse,
  Pokemons,
} from '../../interface/pokemon.interface';
import { PokemonService } from '../../service/pokemon.service';

@Component({
  selector: 'pokemons-component-list',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.css'],
})
export class ListCardComponent {
  private _pokemons: Pokemons[] | undefined = [];
  private _pokemons_info: PokemonResponse[] = [];
  private _api_response: ApiResponse = {};
  private _pokemon_name: PokemonResponse = {
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

  constructor(private service: PokemonService) {
    // this.service
    //   .get_pokemons(this.service.url_get_pokemon)
    //   .subscribe((result) => {
    //     this._api_response = result;
    //     this._pokemons = this._api_response.results;
    //     this._pokemons?.map((current_pokemon) => {
    //       this.service
    //         .convert_pokemons_info(current_pokemon.name)
    //         .subscribe((current_pokemon) => {
    //           console.log(current_pokemon);
    //           this._pokemons_info.push(current_pokemon);
    //           console.log(this._pokemons_info);
    //         });
    //     });
    //   });
    this.service
      .get_pokemons(this.service.url_get_pokemon)
      .subscribe((result) => {
        this._api_response = result;
        this._pokemons = this._api_response.results;
      });
  }

  get pokemons_api(): ApiResponse {
    return this.service.pokemons;
  }

  get pokemons_info(): PokemonResponse[] {
    return this.service.pokemons_info;
  }

  get api_response(): ApiResponse {
    return this._api_response;
  }

  get pokemons(): Pokemons[] | undefined {
    return this._pokemons;
  }

  get pokemon_name(): PokemonResponse {
    return this.service.pokemon_name;
  }

  get_values(): void {
    this._pokemons_info;
  }

  check_pokemon_search(): boolean {
    return this._pokemon_name.id === 0;
  }

  get_pokemon_api_next(): void {
    if (!this.api_response.next) return;
    this.service.get_pokemons(this.api_response.next).subscribe((result) => {
      this._api_response = result;
      this._pokemons = this._api_response.results;
    });
  }

  get_pokemon_api_previous(): void {
    if (!this.api_response.previous) return;
    this.service
      .get_pokemons(this.api_response.previous)
      .subscribe((result) => {
        this._api_response = result;
        this._pokemons = this._api_response.results;
      });
  }
}
