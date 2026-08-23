import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'class-detail-page',
  standalone: true,
  template: `
    <section>
      <h1>Character Class Details</h1>
      <p class="class-id">Class ID: {{ classId }}</p>
    </section>
  `
})
export class ClassDetailComponent {
  private route = inject(ActivatedRoute, { optional: true });

  public classId = this.route?.snapshot.paramMap.get('id') ?? '';
}
