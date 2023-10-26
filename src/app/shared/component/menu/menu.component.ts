import { Component, ViewChild, ElementRef } from '@angular/core';
import { PokemonService } from 'src/app/pokemon/service/pokemon.service';

@Component({
  selector: 'shared-component-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  @ViewChild('search_input')
  public tag_input!: ElementRef<HTMLInputElement>;

  public is_tag = false;

  constructor(private service: PokemonService) {}

  get tags(): string[] {
    return this.service.tags;
  }

  public search_content() {
    const created_tag = this.tag_input.nativeElement.value.toLowerCase().trim();
    if (created_tag === '') return;
    console.log(created_tag);
    this.service.search_content_tag(created_tag);
    this.tag_input.nativeElement.value = '';
  }

  public set_visible_tag() {
    this.is_tag = !this.is_tag;
  }
}
