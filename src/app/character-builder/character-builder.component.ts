import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Character } from '../models/character';

@Component({
  selector: 'app-character-builder',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './character-builder.component.html'
})
export class CharacterBuilderComponent {
  characters: Character[] = [];

  character: Character = {
    name: '',
    characterClass: '',
    level: 1,
    veteran: false,
    startingHitPoints: 11
  };

  onSubmit(form: any): void {
    if (form.invalid) {
      return;
    }

    const newCharacter: Character = {
      ...this.character,
      startingHitPoints: 10 + this.character.level
    };

    this.characters.push(newCharacter);

    this.character = {
      name: '',
      characterClass: '',
      level: 1,
      veteran: false,
      startingHitPoints: 11
    };

    form.resetForm(this.character);
  }
}