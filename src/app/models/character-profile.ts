export interface ProfileOption {
  id: string;
  label: string;
}

export interface CharacterProfile {
  class: string;
  backstory: string;
  alignment: string;
  skills: string[];
  homeland: string;
}