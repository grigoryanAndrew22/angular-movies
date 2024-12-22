import { Component, inject, input, signal } from '@angular/core';
import { DrawerService } from '../services/drawer.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css',
})
export class MovieComponent {
  private movieService = inject(MovieService);
  private drawerService = inject(DrawerService);
  movieId = input.required<string>();
  movieDetails = signal<any>({});
  detailsObj = signal<{ key: string; value: string; link?: string }[]>([]);
  active = this.drawerService.drawerActiveValue;
  favNotificationHidden = this.movieService.favNotificationHiddenValue;

  closeNotification() {
    this.movieService.closeNotification();
  }

  addToFavorites() {
    this.movieService.addToFavorites(
      this.movieId(),
      this.detailsObj(),
      this.movieDetails().poster_path
    );
  }

  ngOnInit() {
    this.movieService.getMovie(this.movieId()).subscribe({
      next: (value: any) => {
        this.movieDetails.set(value);
        this.detailsObj.set(
          this.movieService.createDetailsObj(value, this.movieDetails())
        );
      },
    });
  }
}
