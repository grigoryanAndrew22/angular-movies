import { Component } from '@angular/core';
import { SearchComponent } from '../search/search.component';
import { MoviesComponent } from '../movies/movies.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [SearchComponent, MoviesComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {}
