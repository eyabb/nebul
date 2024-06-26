import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { StorageService } from './_services/storage.service';
import { AuthService } from './_services/auth.service';
import { EventBusService } from './_shared/event-bus.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private Roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  eventBusSub?: Subscription;

  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private eventBusService: EventBusService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.Roles = user.user.roles;

      this.showAdminBoard = this.Roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.Roles.includes('ROLE_MODERATOR');

      this.username = user.user.username;
    }

     this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout();
    });
  }

  logout(): void {
    console.log("ddddd");

    this.authService.logout().subscribe({
      next: res => {
        console.log("ddddd",res);
        this.storageService.clean();
        //window.location.reload();
      },
      error: err => {
        console.log(err);
      }
    });
  }
}
