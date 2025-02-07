import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RouterAdapterService {
  private router: Router = inject(Router);

  navigate(url: string) {
    this.router.navigate([url]);
  }
}
