import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ApiResponse,
  GenderResult,
  PokemonResponse,
} from '../interface/pokemon.interface';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  url_get_pokemon: string = 'https://pokeapi.co/api/v2/pokemon/';
  private _pokemons: ApiResponse = {
    count: 0,
    next: '',
    results: [],
  };
  pokemons_info: PokemonResponse[] = [];

  private _tags: string[] = [];
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

  constructor(private http: HttpClient) {
    this.get_pokemon_list();
    this.load_local_storage();
  }

  add_new_tag(tag_content: string): void {
    if (this._tags.includes(tag_content)) {
      this._tags = this._tags.filter(
        (current_tag) => current_tag !== tag_content
      );
      console.log('Tags: ', this._tags);
    }
    console.log(this._tags);
    this._tags.unshift(tag_content);
    console.log(this._tags);
    this._tags = this._tags.splice(0, 10);
    this.save_local_storage();
  }

  search_content_tag(tag: string): void {
    this.get_pokemon_by_name(tag).subscribe((current_pokemon) => {
      if (current_pokemon.name === tag) {
        this._pokemon_name = current_pokemon;
        this.add_new_tag(tag);
      }
    });
  }

  get_pokemon_list(): void {
    this.http.get<ApiResponse>(this.url_get_pokemon).subscribe((results) => {
      this._pokemons = results;
      this._pokemons.results?.map((current_pokemon) => {
        this.http
          .get<PokemonResponse>(this.url_get_pokemon + current_pokemon.name)
          .subscribe((pokemon) => {
            this._pokemon_name = pokemon;
          });
        this.pokemons_info.push(this.pokemon_name);
      });
    });
  }

  convert_pokemons_info(url: string): Observable<PokemonResponse> {
    return this.http.get<PokemonResponse>(url);
  }

  get_pokemons(url: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(url);
  }

  get_all_pokemons(url: string): void {
    this.http.get<ApiResponse>(url).subscribe((results) => {
      this._pokemons = results;
    });
  }

  get_pokemon_by_name(name: string): Observable<PokemonResponse> {
    console.log(this.url_get_pokemon + name);
    return this.http.get<PokemonResponse>(this.url_get_pokemon + name);
  }

  private save_local_storage(): void {
    localStorage.setItem('history', JSON.stringify(this._tags));
  }

  private load_local_storage(): void {
    if (!localStorage.getItem('history')) return;
    this._tags = JSON.parse(localStorage.getItem('history') || '');
  }

  get tags(): string[] {
    return this._tags;
  }

  get pokemons(): ApiResponse {
    return this._pokemons;
  }

  get pokemon_name(): PokemonResponse {
    return this._pokemon_name;
  }
}
