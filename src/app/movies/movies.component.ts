import {
  Component,
  computed,
  effect,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { DrawerService } from '../services/drawer.service';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css',
  providers: [MoviesService],
})
export class MoviesComponent implements OnInit {
  private drawerService = inject(DrawerService);
  private moviesService = inject(MoviesService);
  active = this.drawerService.drawerActiveValue;
  top = input<string>();
  tabType = input.required<string>();
  moviesType = input.required<'movies' | 'tv'>();
  fetchedMovies = signal<any[]>([]);

  get title() {
    return this.moviesService.getTitle(this.moviesType(), this.tabType());
  }

  get routerlink() {
    return this.moviesService.getRouterLink(this.moviesType(), this.tabType());
  }

  ngOnInit() {
    this.moviesService
      .fetchMovies(this.moviesType(), this.tabType())
      .subscribe({
        next: (movies: any) => {
          this.fetchedMovies.set(movies.results);
        },
      });
  }
}
