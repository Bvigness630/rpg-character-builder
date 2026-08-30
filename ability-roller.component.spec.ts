import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { AbilityRollerComponent } from './ability-roller.component';
import { DiceService } from '../dice.service';

describe('AbilityRollerComponent', () => {
  let component: AbilityRollerComponent;
  let fixture: ComponentFixture<AbilityRollerComponent>;
  let diceService: DiceService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbilityRollerComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '20'
              }
            }
          }
        },
        DiceService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AbilityRollerComponent);
    component = fixture.componentInstance;
    diceService = TestBed.inject(DiceService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should use the route sides value', () => {
    expect(component.sides).toBe(20);
  });

  it('should call DiceService when rolling', () => {
    const rollSpy = spyOn(diceService, 'roll');

    rollSpy.and.returnValue(15);

    component.rollAbility();

    expect(rollSpy).toHaveBeenCalledWith(20);
    expect(component.result).toBe(15);
  });

  it('should display the rolled result', () => {
    const rollSpy = spyOn(diceService, 'roll');

    rollSpy.and.returnValue(18);

    component.rollAbility();
    fixture.detectChanges();

    const result = fixture.nativeElement.querySelector(
      '[data-testid="roll-result"]'
    );

    expect(result.textContent).toContain('18');
  });
});