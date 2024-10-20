import { Component } from '@angular/core';
import { AuthService } from '../../../auth/services/auth-service.service';
import { Router } from '@angular/router';
import { User } from '../../../auth/interfaces/user.interface';

@Component({
  selector: 'heroes-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrl: './layout-page.component.css'
})
export class LayoutPageComponent {

  public sidenavItems = [
    {label:'List', icon:'label', url:'./list'},
    {label:'Add new', icon:'add', url:'./add-new-hero'},
    {label:'Search', icon:'search', url:'./search'},
  ]

  constructor(private authService: AuthService, private router: Router){}

  get user(): User|undefined{
    return this.authService.currentUser;
  }


  onLogout() {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }
}
