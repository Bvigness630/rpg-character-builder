import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface ClassRouteData {
  title: string;
}

@Component({
  selector: 'class-detail-page',
  standalone: true,
  template: `
    <section class="w4-container" data-testid="class-detail-page">
      <div class="w4-panel">
        <p class="w4-eyebrow">Character Class</p>

        <h1>{{ routeData.title }}</h1>

        <div class="w4-card">
          <p class="w4-kicker">Class ID</p>
          <p data-testid="class-id">{{ classId }}</p>
        </div>
      </div>
    </section>
  `
})
export class ClassDetailComponent {
  private readonly route = inject(ActivatedRoute);

  public classId: string = this.route.snapshot.paramMap.get('id') ?? '';

  public routeData: ClassRouteData = {
    title: this.route.snapshot.data['title'] as string
  };
}