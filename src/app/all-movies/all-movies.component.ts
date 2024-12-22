import { Component, computed, inject, input, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DrawerService } from '../services/drawer.service';
import { HttpClient } from '@angular/common/http';
import { SearchMoviesService } from '../services/search-movies.service';
import { AllMoviesService } from '../services/all-movies.service';

@Component({
  selector: 'app-all-movies',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './all-movies.component.html',
  styleUrl: './all-movies.component.css',
})
export class AllMoviesComponent {
  private allMoviesService = inject(AllMoviesService);
  private drawerService = inject(DrawerService);
  type = input<string>();
  showStar = this.allMoviesService.showStarVal;
  selectedPage = signal(1);
  firstNPages = [2, 3, 4, 5];
  nextPages = computed(() => {
    return [
      this.selectedPage() - 1,
      this.selectedPage(),
      this.selectedPage() + 1,
    ];
  });

  active = this.drawerService.drawerActiveValue;
  totalPages = this.allMoviesService.totalPagesVal;
  lastNPages = this.allMoviesService.lastNPagesVal;
  routerLinkPart = this.allMoviesService.routerLinkPartVal;
  moviesArr = this.allMoviesService.moviesArrVal;
  title = this.allMoviesService.titleValue;

  removeFavorite(movieId: any) {
    this.allMoviesService.removeFavs(movieId);
  }

  onPageChange(page: number) {
    if (page !== this.selectedPage()) {
      this.selectedPage.set(page);
      this.allMoviesService
        .loadMovies(this.type(), this.selectedPage(), false)
        .subscribe();
    }
  }

  ngOnInit() {
    this.allMoviesService.init(this.type());

    if (!this.allMoviesService.stopExecution()) {
      this.allMoviesService
        .loadMovies(this.type(), this.selectedPage(), true)
        .subscribe();
    }
  }
}
