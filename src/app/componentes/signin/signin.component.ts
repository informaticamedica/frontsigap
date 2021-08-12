import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private aut: AuthService,
    private router: Router
  ) {}

  formulario = this.fb.group({
    Username: ['', Validators.required],
    Password: ['', Validators.required],
  });

  ngOnInit(): void {
    if (this.aut.loggedIn()) {
      this.router.navigate(['/principal']);
    }
  }

  ingresar() {
    if (this.formulario.dirty && this.formulario.valid) {
      // alert(
      //   `user: ${this.form.value.Username}
      //   pas: ${this.form.value.Password}`
      // );

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
            // console.log('====================================');
            // console.log(res);
            // console.log('====================================');
            this.router.navigate(['/principal']);
          },
          (error) => {
            alert(error.error.error);
          }
        );
    }
  }
}
