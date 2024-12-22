import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, input, signal } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DrawerService } from './drawer.service';
import { SearchMoviesService } from './search-movies.service';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AllMoviesService {
  private searchMoviesService = inject(SearchMoviesService);
  private httpClient = inject(HttpClient);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  confirmedType = signal<'top_rated' | 'popular' | 'not found'>('not found');
  showStar = signal(false);
  totalPages = signal(0);
  lastNPages = signal<any>([]);
  moviesArr = signal<any>([]);
  routerLinkPart = signal('');
  title = signal('');
  stopExecution = signal(false);

  totalPagesVal = this.totalPages.asReadonly();
  lastNPagesVal = this.lastNPages.asReadonly();
  moviesArrVal = this.moviesArr.asReadonly();
  routerLinkPartVal = this.routerLinkPart.asReadonly();
  showStarVal = this.showStar.asReadonly();
  titleValue = this.title.asReadonly();

  removeFavs(movieId: any) {
    const favorites = JSON.parse(localStorage.getItem('favorites')!);
    const updatedFavorites = favorites.filter((fav: any) => fav.id !== movieId);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    let filteredUpdatedFavs;
    if (this.router.url.includes('tv')) {
      filteredUpdatedFavs = updatedFavorites.filter(
        (fav: any) => fav.type === 'tv'
      );
    } else if (this.router.url.includes('movie')) {
      filteredUpdatedFavs = updatedFavorites.filter(
        (fav: any) => fav.type === 'movie'
      );
    }
    this.moviesArr.set(filteredUpdatedFavs);
  }

  loadMovies(type: any, selectedPage: any, init: boolean) {
    return this.httpClient
      .get(
        `https://api.themoviedb.org/3/${
          this.router.url.includes('tv') ? 'tv' : 'movie'
        }/${
          type || this.confirmedType()
        }?api_key=1b94db3ca8c2887a702567683f8e4f32&page=${selectedPage}`
      )
      .pipe(
        tap({
          next: (value: any) => {
            if (init) {
              this.lastNPages.set([
                this.totalPages() - 4,
                this.totalPages() - 3,
                this.totalPages() - 2,
                this.totalPages() - 1,
              ]);
            }
            this.totalPages.set(value.total_pages);
            this.moviesArr.set(value.results);
            this.showStar.set(false);
          },
        })
      );
  }

  init(type: any) {
    this.totalPages.set(0);
    this.stopExecution.set(false);
    if (!type) {
      if (this.router.url.includes('top_rated')) {
        this.confirmedType.set('top_rated');
      } else {
        this.confirmedType.set('popular');
      }
    }

    let titleComputed;
    if (type) {
      switch (type) {
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
    } else if (this.router.url.includes('search')) {
      this.route.queryParamMap.subscribe({
        next: (value: any) => {
          titleComputed = 'Results for: ' + value.get('query');
        },
      });
    } else if (this.router.url.includes('favorite_movies')) {
      titleComputed = 'Favorite Movies';
    } else if (this.router.url.includes('favorite_tv')) {
      titleComputed = 'Favorite TV Series';
    } else {
      titleComputed =
        this.confirmedType() === 'top_rated'
          ? 'Top Rated TV Series'
          : 'Popular TV Series';
    }
    this.title.set(titleComputed!);

    this.routerLinkPart.set(!type ? 'tv' : 'movie');

    if (this.router.url.includes('search')) {
      this.route.queryParamMap.subscribe({
        next: (value) => {
          this.routerLinkPart.set(value.get('movieType')!);
        },
      });
      this.moviesArr.set(this.searchMoviesService.foundMovies());
      this.stopExecution.set(true);
    }

    if (this.router.url.includes('favorite')) {
      const favoritesAll = JSON.parse(localStorage.getItem('favorites')!);
      let favorites;
      if (this.router.url.includes('tv')) {
        favorites = favoritesAll.filter((fav: any) => fav.type === 'tv');
        this.routerLinkPart.set('tv');
      } else if (this.router.url.includes('movie')) {
        favorites = favoritesAll.filter((fav: any) => fav.type === 'movie');
        this.routerLinkPart.set('movie');
      }
      this.showStar.set(true);
      this.moviesArr.set(favorites);
      this.stopExecution.set(true);
      return;
    }
  }
}
