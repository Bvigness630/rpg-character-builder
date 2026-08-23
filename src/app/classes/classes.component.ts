import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CharacterClass } from '../models/character-class';

@Component({
  selector: 'classes-page',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section>
      <h1>Character Classes</h1>

      <div class="class-list">
        @for (characterClass of characterClasses; track characterClass.id) {
          <article>
            <h2>{{ characterClass.name }}</h2>
            <p>{{ characterClass.description }}</p>

            <a [routerLink]="['/classes', characterClass.id]">
              View Details
            </a>
          </article>
        }
      </div>
    </section>
  `
})
export class ClassesComponent {
  public characterClasses: CharacterClass[] = [
    {
      id: 'warrior',
      name: 'Warrior',
      description: 'A strong melee fighter who relies on weapons and armor.'
    },
    {
      id: 'mage',
      name: 'Mage',
      description: 'A powerful spellcaster who uses magic to defeat enemies.'
    },
    {
      id: 'rogue',
      name: 'Rogue',
      description: 'A quick and agile fighter who relies on stealth and precision.'
    }
  ];
}
