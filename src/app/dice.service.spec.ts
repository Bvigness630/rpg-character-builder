import { TestBed } from '@angular/core/testing';
import { DiceService } from './dice.service';

describe('DiceService', () => {
  let service: DiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiceService);
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should return a value between 1 and the number of sides', () => {
    const result = service.roll(20);

    expect(result).toBeGreaterThanOrEqual(1);
    expect(result).toBeLessThanOrEqual(20);
  });

  it('should throw a RangeError for invalid sides', () => {
    expect(() => service.roll(0)).toThrowError(RangeError);
  });
});