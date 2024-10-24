import { CommonModule} from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss',]
})
export class NavbarComponent {
  navbarListItems = [
    { id: 1, name: 'Products', link: '/products/table' },
    { id: 2, name: 'Users', link: '/users' },
    { id: 2, name: 'Meetings', link: '/meetings' },
  ];
}
