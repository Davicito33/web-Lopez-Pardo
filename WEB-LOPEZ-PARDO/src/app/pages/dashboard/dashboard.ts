import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';


import { SitioService } from '../../services/sitio';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})

export class Dashboard implements OnInit {

  usuario: any = null;

  sitios: any[] = [];

  ultimosSitios: any[] = [];

  totalSitios: number = 0;

constructor(
  private router: Router,
  private sitioService: SitioService,
  private cdr: ChangeDetectorRef
) { }

  ngOnInit(): void {

    const usuarioGuardado = localStorage.getItem('usuario');

    if (usuarioGuardado) {

      this.usuario = JSON.parse(usuarioGuardado);

    }

    this.obtenerSitios();

  }

  obtenerSitios() {

   this.sitioService.getSitios().subscribe({

    next: (res: any) => {

      console.log('RESPUESTA API:', res);

      this.sitios = res.sitios || res;

      console.log('SITIOS:', this.sitios);

      this.totalSitios = this.sitios.length;

      console.log('TOTAL:', this.totalSitios);

      this.ultimosSitios = this.sitios.slice(-5).reverse();

      // FORZAR ACTUALIZACIÓN VISTA
      this.cdr.detectChanges();

    },

    error: (err: any) => {

      console.log(err);

      }

    });

  }

  cerrarSesion() {

    localStorage.removeItem('usuario');

    this.router.navigate(['/']);

  }

}