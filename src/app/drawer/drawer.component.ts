import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TABS } from '../constants/tabs';
import { DrawerService } from '../services/drawer.service';

@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.css',
})
export class DrawerComponent {
  tabs = TABS;
  private drawerService = inject(DrawerService);
  active = this.drawerService.drawerActiveValue;

  switch() {
    this.drawerService.switchDrawer();
  }
}
