import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { UserService } from '../../services/user';

@Component({
  selector: 'app-register',
  imports: [RouterLink, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})

export class Register {

  usuario = '';
  correo = '';
  clave = '';

  constructor(
    private router: Router,
    private userService: UserService
  ){}

  registrar(){

    const data = {
      usuario: this.usuario,
      correo: this.correo,
      clave: this.clave
    };

    this.userService.register(data).subscribe({

      next: (res:any) => {

        alert('Usuario registrado');

        this.router.navigate(['/']);

      },

      error: (err) => {

        console.log(err);

        alert('Error al registrar');

      }

    });

  }

}