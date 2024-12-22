import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private httpClient = inject(HttpClient);
  private router = inject(Router);
  favNotificationHidden = signal(true);
  favNotificationHiddenValue = this.favNotificationHidden.asReadonly();

  createDetailsObj(value: any, movieDetails: any) {
    return [
      {
        key: 'Genre: ',
        value: value.genres.map((genre: any) => ` ${genre.name}`),
      },
      {
        key: 'Release Date: ',
        value: value.first_air_date || value.release_date,
      },
      {
        key: 'Production Company: ',
        value: value.production_companies?.map((comp: any) => ` ${comp.name}`),
      },
      {
        key: 'Production Countries: ',
        value: value.production_countries[0].name,
      },
      {
        key: 'Networks: ',
        value: value.networks?.map((net: any) => ` ${net.name}`),
      },
      {
        key: 'IMDB: ',
        value: value.title,
        link: 'https://www.imdb.com/title/' + value.imdb_id,
      },
      {
        key: 'Website: ',
        value: movieDetails.title || movieDetails.name,
        link: value.homepage,
      },
      {
        key: 'Budget: ',
        value: value.budget ? value.budget + '$' : null,
      },
      {
        key: 'Revenue: ',
        value: value.revenue ? value.revenue + '$' : null,
      },
      {
        key: 'Runtime: ',
        value: (value.runtime || value.episode_run_time) + ' min.',
      },
      { key: 'Tagline: ', value: value.tagline },
      { key: 'Votes: ', value: value.vote_count },
      { key: 'Average vote: ', value: value.vote_average },
      { key: 'Popularity: ', value: value.popularity },
    ];
  }

  addToFavorites(id: any, details: any, poster_path: any) {
    let prevFavorites;
    if (localStorage.getItem('favorites') !== null) {
      prevFavorites = JSON.parse(localStorage.getItem('favorites')!);
    } else {
      prevFavorites = [];
    }

    if (prevFavorites.find((fav: any) => fav.id === id)) {
      return;
    }
    const updatedFavorites = [
      ...prevFavorites,
      {
        id,
        details,
        type: this.router.url.includes('tv') ? 'tv' : 'movie',
        poster_path,
      },
    ];
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    this.favNotificationHidden.set(false);
    setTimeout(() => {
      this.favNotificationHidden.set(true);
    }, 3000);
  }

  closeNotification() {
    this.favNotificationHidden.set(true);
  }

  getMovie(movieId: string) {
    return this.httpClient.get(
      `https://api.themoviedb.org/3/${
        this.router.url.includes('tv') ? 'tv' : 'movie'
      }/${movieId}?api_key=1b94db3ca8c2887a702567683f8e4f32`
    );
  }
}
