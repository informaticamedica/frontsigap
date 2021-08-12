import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/api/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  ocupado = false;
  constructor(
    private fb: FormBuilder,
    private aut: AuthService,
    private router: Router
  ) { }

  formulario = this.fb.group({
    Username: ['', Validators.required],
    Password: ['', Validators.required],
  });

  ngOnInit(): void {
    if (this.aut.loggedIn()) {
      this.router.navigate(['inicio']);
    }
  }

  ingresar() {
    this.ocupado = true;
    if (this.formulario.dirty && this.formulario.valid) {
      this.aut
        .autenticar({
          user: this.formulario.value.Username,
          pass: this.formulario.value.Password,
        })
        .subscribe(
          (res) => {
            sessionStorage.clear();
            sessionStorage.setItem('token', res.token);
            sessionStorage.setItem('nombre', res.nombre);
            this.ocupado = false;
            this.router.navigate(['inicio']);
          },
          (error) => {
            this.ocupado = false;
            alert(error.error.error);
          }
        );
    }
  }
}
