import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'about-title',
  standalone: true,
  template: `
    <section>
      <h1 data-testid="about-title">{{ title }}</h1>
      <p>This application demonstrates Angular routing.</p>
    </section>
  `
})
export class AboutComponent {
  private route = inject(ActivatedRoute, { optional: true });

  public title = this.route?.snapshot.data['title'] ?? 'About';
}