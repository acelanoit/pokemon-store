import { Component, EventEmitter, Output } from '@angular/core';
import { PokemonType } from '../../../../models/pokemon.model';
@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent {
  @Output() showType = new EventEmitter<PokemonType>();

  types: PokemonType[] = [
    { name: "Normal", selected: false },
    { name: "Fire", selected: false },
    { name: "Water", selected: false },
    { name: "Electric", selected: false },
    { name: "Grass", selected: false },
    { name: "Ice", selected: false },
    { name: "Fighting", selected: false },
    { name: "Poison", selected: false },
    { name: "Ground", selected: false },
    { name: "Flying", selected: false },
    { name: "Psychic", selected: false },
    { name: "Bug", selected: false },
    { name: "Rock", selected: false },
    { name: "Ghost", selected: false },
    { name: "Dragon", selected: false },
    { name: "Dark", selected: false },
    { name: "Steel", selected: false }
  ];

  onShowType(type: PokemonType): void {

    // When a type is selected, the selected property is set to true,
    // but the value of type.selected is not updated before the type object is passed to this method,
    // so the value of type.selected is still false and we need to manually toggle it.
    type.selected = !type.selected;
    this.showType.emit(type);
  }
}
