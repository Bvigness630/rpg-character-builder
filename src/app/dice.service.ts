import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DiceService {
  roll(sides: number): number {
    if (!Number.isInteger(sides) || sides < 2 || !Number.isFinite(sides)) {
      throw new RangeError('Sides must be an integer greater than 1.');
    }

    return Math.floor(Math.random() * sides) + 1;
  }
}

