import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ClassesComponent } from './classes/classes.component';
import { ClassDetailComponent } from './class-detail/class-detail.component';
import { AboutComponent } from './about/about.component';
import { AbilityRollerComponent } from './ability-roller/ability-roller.component';
import { CharacterBuilderComponent } from './character-builder/character-builder.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home | RPG Character Builder'
  },
  {
    path: 'classes',
    component: ClassesComponent,
    title: 'Character Classes | RPG Character Builder'
  },
  {
    path: 'classes/:id',
    component: ClassDetailComponent,
    title: 'Character Class Details | RPG Character Builder',
    data: {
      title: 'Character Class Details'
    }
  },
  {
    path: 'about',
    component: AboutComponent,
    title: 'About | RPG Character Builder',
    data: {
      title: 'About'
    }
  },
  {
    path: 'roll/:sides',
    component: AbilityRollerComponent,
    title: 'Ability Score Roller | RPG Character Builder'
  },
  {
    path: 'builder',
    component: CharacterBuilderComponent,
    title: 'Character Builder | RPG Character Builder'
  },
  {
    path: '**',
    redirectTo: ''
  }
];