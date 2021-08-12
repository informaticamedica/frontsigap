import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../api/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(public aut: AuthService,
    private router: Router) {
  }


  nombre() {
    return this.aut.nombre();
  }

  inicio() {
    this.router.navigate(['inicio']);
  }
  salir() {
    this.aut.logout();
  }
}
