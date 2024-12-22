import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SearchMoviesService {
  private httpClient = inject(HttpClient);
  private router = inject(Router);
  totalPages = signal(0);
  foundMovies = signal<any>([]);

  findMovies(movieType: string, query: string) {
    this.httpClient
      .get(
        `https://api.themoviedb.org/3/search/${movieType}?api_key=1b94db3ca8c2887a702567683f8e4f32&query=${query}&page=1`
      )
      .subscribe({
        next: (value: any) => {
          this.foundMovies.set(value.results);
          this.totalPages.set(value.total_pages);
          this.router.navigate(['/search'], {
            queryParams: { movieType, query },
          });
          console.log(this.foundMovies(), this.totalPages());
        },
      });
  }
}
