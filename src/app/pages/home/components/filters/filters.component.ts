import { Component, EventEmitter, Output } from '@angular/core';
import { PokemonType } from '../../../../models/pokemon.model';
@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent {
  @Output() showType = new EventEmitter<PokemonType>();
  selectedType: PokemonType = { name: '', selected: false };

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

    // The value of type.selected seems unreliable: when the user clicks on a type, the value of type.selected is
    // sometimes false, sometimes true, so we need to rely on the value of this.selectedType.selected instead
    // to determine whether the user has clicked on the same type twice or on a different type.
    if (this.selectedType.name === type.name) {
      type.selected = false;
      this.selectedType = { name: '', selected: false };
    } else {
      type.selected = true;
      this.selectedType = type;
    }
    this.showType.emit(type);
  }
}
