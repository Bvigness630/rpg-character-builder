import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterBuilderComponent } from './character-builder.component';

describe('CharacterBuilderComponent', () => {
  let component: CharacterBuilderComponent;
  let fixture: ComponentFixture<CharacterBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterBuilderComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterBuilderComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should support two-way binding for the character name', async () => {
    const nameInput = fixture.nativeElement.querySelector(
      '[data-testid="character-name"]'
    ) as HTMLInputElement;

    nameInput.value = 'Aragorn';
    nameInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.character.name).toBe('Aragorn');
  });

  it('should prevent submission when the form is invalid', async () => {
    const form = fixture.nativeElement.querySelector(
      '[data-testid="character-form"]'
    ) as HTMLFormElement;

    const submitButton = fixture.nativeElement.querySelector(
      '[data-testid="character-submit"]'
    ) as HTMLButtonElement;

    fixture.detectChanges();
    await fixture.whenStable();

    expect(form.checkValidity()).toBeFalse();
    expect(component.characters.length).toBe(0);
    expect(submitButton.disabled).toBeTrue();
  });

  it('should store a valid character with calculated hit points', async () => {
    const nameInput = fixture.nativeElement.querySelector(
      '[data-testid="character-name"]'
    ) as HTMLInputElement;

    const classInput = fixture.nativeElement.querySelector(
      '[data-testid="character-class"]'
    ) as HTMLInputElement;

    const levelInput = fixture.nativeElement.querySelector(
      '[data-testid="character-level"]'
    ) as HTMLInputElement;

    const veteranInput = fixture.nativeElement.querySelector(
      '[data-testid="character-veteran"]'
    ) as HTMLInputElement;

    nameInput.value = 'Aragorn';
    nameInput.dispatchEvent(new Event('input'));

    classInput.value = 'Ranger';
    classInput.dispatchEvent(new Event('input'));

    levelInput.value = '5';
    levelInput.dispatchEvent(new Event('input'));

    veteranInput.checked = true;
    veteranInput.dispatchEvent(new Event('change'));

    fixture.detectChanges();
    await fixture.whenStable();

    const submitButton = fixture.nativeElement.querySelector(
      '[data-testid="character-submit"]'
    ) as HTMLButtonElement;

    expect(submitButton.disabled).toBeFalse();

    submitButton.click();

    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.characters.length).toBe(1);
    expect(component.characters[0].name).toBe('Aragorn');
    expect(component.characters[0].characterClass).toBe('Ranger');
    expect(component.characters[0].level).toBe(5);
    expect(component.characters[0].veteran).toBeTrue();
    expect(component.characters[0].startingHitPoints).toBe(15);
  });

  it('should reset the character after a successful submission', async () => {
    const nameInput = fixture.nativeElement.querySelector(
      '[data-testid="character-name"]'
    ) as HTMLInputElement;

    const classInput = fixture.nativeElement.querySelector(
      '[data-testid="character-class"]'
    ) as HTMLInputElement;

    const levelInput = fixture.nativeElement.querySelector(
      '[data-testid="character-level"]'
    ) as HTMLInputElement;

    nameInput.value = 'Gandalf';
    nameInput.dispatchEvent(new Event('input'));

    classInput.value = 'Wizard';
    classInput.dispatchEvent(new Event('input'));

    levelInput.value = '10';
    levelInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    await fixture.whenStable();

    const submitButton = fixture.nativeElement.querySelector(
      '[data-testid="character-submit"]'
    ) as HTMLButtonElement;

    expect(submitButton.disabled).toBeFalse();

    submitButton.click();

    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.characters.length).toBe(1);
    expect(component.character.name).toBe('');
    expect(component.character.characterClass).toBe('');
    expect(component.character.level).toBe(1);
    expect(component.character.veteran).toBeFalse();
    expect(component.character.startingHitPoints).toBe(11);
  });
});