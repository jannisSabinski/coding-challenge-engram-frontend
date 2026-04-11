import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LucideBookImage, LucideCircleUserRound, LucideCompass } from '@lucide/angular';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterModule, LucideCompass, LucideBookImage, LucideCircleUserRound],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  get isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
