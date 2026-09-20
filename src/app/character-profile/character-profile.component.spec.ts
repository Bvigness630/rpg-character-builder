import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterProfileComponent } from './character-profile.component';

describe('CharacterProfileComponent', () => {
  let component: CharacterProfileComponent;
  let fixture: ComponentFixture<CharacterProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterProfileComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should start with an invalid form', () => {
    expect(component.profileForm.invalid).toBeTrue();
  });

  it('should accept a valid profile after input', () => {
    component.profileForm.controls.class.setValue('warrior');
    component.profileForm.controls.backstory.setValue(
      'A warrior who guards the roads of Gondor.'
    );
    component.profileForm.controls.alignment.setValue('hero');
    component.profileForm.controls.skills.at(0).setValue(true);
    component.profileForm.controls.homeland.setValue('gondor');

    expect(component.profileForm.valid).toBeTrue();
  });

  it('should transform selected skill checkboxes into skill IDs', () => {
    component.profileForm.controls.class.setValue('rogue');
    component.profileForm.controls.backstory.setValue(
      'A quiet traveler who knows the hidden paths of Middle-earth.'
    );
    component.profileForm.controls.alignment.setValue('anti-hero');
    component.profileForm.controls.skills.at(1).setValue(true);
    component.profileForm.controls.skills.at(2).setValue(true);
    component.profileForm.controls.homeland.setValue('rivendell');

    component.saveProfile();

    expect(component.savedProfiles.length).toBe(1);
    expect(component.savedProfiles[0].skills).toEqual(['archery', 'stealth']);
  });

  it('should render the saved profile data', () => {
    component.profileForm.controls.class.setValue('mage');
    component.profileForm.controls.backstory.setValue(
      'A wise traveler seeking ancient knowledge.'
    );
    component.profileForm.controls.alignment.setValue('villain');
    component.profileForm.controls.skills.at(1).setValue(true);
    component.profileForm.controls.skills.at(3).setValue(true);
    component.profileForm.controls.homeland.setValue('rivendell');

    component.saveProfile();
    fixture.detectChanges();

    const profileList = fixture.nativeElement.querySelector(
      '[data-testid="profile-list"]'
    );

    expect(profileList.textContent).toContain('mage');
    expect(profileList.textContent).toContain('archery');
    expect(profileList.textContent).toContain('magic');
    expect(profileList.textContent).toContain('rivendell');
  });
});