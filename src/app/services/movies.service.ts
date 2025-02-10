import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private httpClient = inject(HttpClient);

  fetchMovies(moviesType: string, tabType: string) {
    return this.httpClient.get(
      `https://api.themoviedb.org/3/${
        moviesType === 'tv' ? 'tv' : 'movie'
      }/${tabType}?api_key=1b94db3ca8c2887a702567683f8e4f32&page=1`
    );
  }

  getRouterLink(moviesType: string, tabType: string) {
    if (moviesType === 'tv') {
      return ['/', `tv_${tabType}`];
    }
    return ['/', moviesType, tabType];
  }

  getTitle(moviesType: string, tabType: string) {
    let titleComputed;
    switch (tabType) {
      case 'top_rated':
        titleComputed = 'Top Rated';
        break;
      case 'popular':
        titleComputed = 'Popular';
        break;
      case 'upcoming':
        titleComputed = 'Upcoming';
        break;
      default:
        titleComputed = 'Not found';
    }
    if (moviesType === 'tv') {
      titleComputed += ' TV series';
    }
    return titleComputed;
  }
}
