import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { UserService } from '../../services/user';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})

export class Login {

  correo = '';
  clave = '';

  constructor(
    private router: Router,
    private userService: UserService
  ){}

  iniciarSesion(){

    const data = {
      correo: this.correo,
      clave: this.clave
    };

    this.userService.login(data).subscribe({

      next: (res:any) => {

        alert('Bienvenido');

        localStorage.setItem(
          'usuario',
          JSON.stringify(res)
        );

        this.router.navigate(['/dashboard']);

      },

      error: (err) => {

        console.log(err);

        alert('Credenciales incorrectas');

      }

    });

  }

}