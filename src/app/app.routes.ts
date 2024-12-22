import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { MovieComponent } from './movie/movie.component';
import { AllMoviesComponent } from './all-movies/all-movies.component';
import { MoviesPageComponent } from './movies-page/movies-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'tv/:movieId',
    component: MovieComponent,
  },
  {
    path: 'movie/:movieId',
    component: MovieComponent,
  },
  {
    path: 'movies',
    component: MoviesPageComponent,
  },
  {
    path: 'movies/:type',
    component: AllMoviesComponent,
  },
  {
    path: 'tv',
    component: MoviesPageComponent,
  },
  {
    path: 'tv_top_rated',
    component: AllMoviesComponent,
  },
  {
    path: 'tv_popular',
    component: AllMoviesComponent,
  },
  {
    path: 'favorite_movies',
    component: AllMoviesComponent,
  },
  {
    path: 'favorite_tv',
    component: AllMoviesComponent,
  },
  {
    path: 'search',
    component: AllMoviesComponent,
  },
];
