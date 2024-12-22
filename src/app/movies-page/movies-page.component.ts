import { Component, computed, effect, inject } from '@angular/core';
import { MoviesComponent } from '../movies/movies.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movies-page',
  standalone: true,
  imports: [MoviesComponent],
  templateUrl: './movies-page.component.html',
  styleUrl: './movies-page.component.css',
})
export class MoviesPageComponent {
  private router = inject(Router);
  get tabType() {
    return this.router.url.includes('tv') ? 'tv' : 'movies';
  }
}
