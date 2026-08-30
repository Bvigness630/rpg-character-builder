import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface ClassRouteData {
  title: string;
}

@Component({
  selector: 'class-detail-page',
  standalone: true,
  template: `
    <section data-testid="class-detail-page">
      <h1>{{ routeData.title }}</h1>
      <p data-testid="class-id">Class ID: {{ classId }}</p>
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