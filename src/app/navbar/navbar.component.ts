import { Component, inject } from '@angular/core';
import { DrawerService } from '../services/drawer.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  private drawerService = inject(DrawerService);
  active = this.drawerService.drawerActiveValue;

  switch() {
    this.drawerService.switchDrawer();
  }
}
