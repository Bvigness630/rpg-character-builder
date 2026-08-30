import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DiceService } from '../dice.service';

@Component({
  selector: 'ability-roller',
  standalone: true,
  template: `
    <section>
      <h1>Ability Score Roller</h1>

      <p>Roll a {{ sides }}-sided die to generate an ability score.</p>

      <button
        type="button"
        data-testid="roll-button"
        (click)="rollAbility()"
      >
        Roll
      </button>

      <p data-testid="roll-result">
        Result: {{ result }}
      </p>
    </section>
  `
})
export class AbilityRollerComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly diceService = inject(DiceService);

  public sides = Number(this.route.snapshot.paramMap.get('sides')) || 20;
  public result: number | null = null;

  public rollAbility(): void {
    try {
      this.result = this.diceService.roll(this.sides);
    } catch (error) {
      console.warn('Unable to roll the die.', error);
      this.result = null;
    }
  }
}