import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DrawerService {
  drawerActive = signal(false);
  drawerActiveValue = this.drawerActive.asReadonly();

  switchDrawer() {
    this.drawerActive.update((prevValue) => !prevValue);
  }
}
