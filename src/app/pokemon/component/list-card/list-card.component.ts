import { Component } from '@angular/core';
import {
  ApiResponse,
  PokemonResponse,
  Pokemons,
} from '../../interface/pokemon.interface';
import { PokemonService } from '../../service/pokemon.service';
import { Observable } from 'rxjs';

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
    this.service
      .get_pokemons(this.service.url_get_pokemon)
      .subscribe((result) => {
        this._api_response = result;
        this._pokemons = this._api_response.results;
        console.log(this._pokemons);
        console.log('Data', this.pokemons_info);
      });
    this._api_response.results?.map((current_pokemon) => {
      this.service
        .get_pokemon_by_name(current_pokemon.name)
        .subscribe((result) => {
          console.log(result);
          this._pokemons_info.push(result);
        });
    });
    this.service.get_all_pokemons(this.service.url_get_pokemon);
    console.log(this.pokemons_api);
    this.pokemons_api.results?.map((current_pokemon) => {
      this.service
        .get_pokemon_by_name(current_pokemon.name)
        .subscribe((result) => {
          console.log('A', result);
          this._pokemons_info.push(result);
        });
    });

    console.log(this._pokemons_info);
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

  private get_pokemon_api(url: string): void {
    this.service.get_pokemons(url).subscribe((result) => {
      this._api_response = result;
      this._pokemons = this._api_response.results;
      this._pokemons?.forEach((current_pokemon) => {
        this.service
          .convert_pokemons_info(current_pokemon.url)
          .subscribe((poke_data) => {
            this._pokemons_info.push(poke_data);
          });
      });
      console.log(this._pokemons);
      console.log(this.pokemons_info);
    });
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
