import { style } from '@angular/animations';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DrawerService } from '../services/drawer.service';
import { HttpClient } from '@angular/common/http';
import { SearchMoviesService } from '../services/search-movies.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
  host: {
    class: 'search-wrapper',
  },
})
export class SearchComponent {
  private searchMoviesService = inject(SearchMoviesService);
  private drawerService = inject(DrawerService);
  active = this.drawerService.drawerActiveValue;
  searchForm = new FormGroup({
    movieType: new FormControl('movie', Validators.required),
    query: new FormControl('', Validators.required),
  });

  onSearchSubmit() {
    if (this.searchForm.valid) {
      this.searchMoviesService.findMovies(
        this.searchForm.controls.movieType.value!,
        this.searchForm.controls.query.value!
      );
    }
  }

  clear() {
    this.searchForm.reset();
  }
}
