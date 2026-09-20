import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  CharacterProfile,
  ProfileOption
} from '../models/character-profile';

@Component({
  selector: 'app-character-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './character-profile.component.html',
})
export class CharacterProfileComponent {
  readonly classOptions: ProfileOption[] = [
    { id: 'warrior', label: 'Warrior' },
    { id: 'mage', label: 'Mage' },
    { id: 'rogue', label: 'Rogue' }
  ];

  readonly alignmentOptions: ProfileOption[] = [
    { id: 'hero', label: 'Hero' },
    { id: 'anti-hero', label: 'Anti-Hero' },
    { id: 'villain', label: 'Villain' }
  ];

  readonly skillOptions: ProfileOption[] = [
    { id: 'swordsmanship', label: 'Swordsmanship' },
    { id: 'archery', label: 'Archery' },
    { id: 'stealth', label: 'Stealth' },
    { id: 'magic', label: 'Magic' }
  ];

  readonly homelandOptions: ProfileOption[] = [
    { id: 'gondor', label: 'Gondor' },
    { id: 'rivendell', label: 'Rivendell' },
    { id: 'mordor', label: 'Mordor' }
  ];

  readonly profileForm = new FormGroup({
    class: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    backstory: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    alignment: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    skills: new FormArray(
      this.skillOptions.map(() => new FormControl(false, { nonNullable: true })),
      {
        validators: [this.requireOneSkill]
      }
    ),
    homeland: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    })
  });

  readonly savedProfiles: CharacterProfile[] = [];

  get skillControls(): FormControl<boolean>[] {
    return this.profileForm.controls.skills.controls;
  }

  private requireOneSkill(control: AbstractControl): { required: true } | null {
    return (control as FormArray<FormControl<boolean>>).controls.some(skill => skill.value)
      ? null
      : { required: true };
  }

  saveProfile(): void {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    const values = this.profileForm.getRawValue();

    const selectedSkills = values.skills
      .map((selected, index) => selected ? this.skillOptions[index].id : null)
      .filter((skill): skill is string => skill !== null);

    const profile: CharacterProfile = {
      class: values.class,
      backstory: values.backstory,
      alignment: values.alignment,
      skills: selectedSkills,
      homeland: values.homeland
    };

    this.savedProfiles.push(profile);
    this.profileForm.reset();
  }
}