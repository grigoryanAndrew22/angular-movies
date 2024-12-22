import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { DrawerComponent } from './drawer/drawer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, DrawerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  // ngOnInit(): void {
  //   this.httpClient
  //     .get('https://api.themoviedb.org/3/authentication', {
  //       headers: {
  //         Accept: 'application/json',
  //         Authentication:
  //           'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYjk0ZGIzY2E4YzI4ODdhNzAyNTY3NjgzZjhlNGYzMiIsIm5iZiI6MTczMzAxNTE5OC44NTksInN1YiI6IjY3NGJiNjllNDFmMDBjMDRkNmI0NDA4MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2IMzIt2R79kXor3pB5X_2Dj7aNPVhZ3G7h-GXhcF11A',
  //       },
  //     })
  //     .subscribe({
  //       next: (value) => {
  //         console.log(value);
  //       },
  //     });
  // }

  constructor() {}
}
