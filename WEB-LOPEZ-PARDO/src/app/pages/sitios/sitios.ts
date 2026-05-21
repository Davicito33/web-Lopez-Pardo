import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import {
  RouterLink
} from '@angular/router';

import { SitioService } from '../../services/sitio';

@Component({
  selector: 'app-sitios',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],

  templateUrl: './sitios.html',

  styleUrl: './sitios.css'
})

export class Sitios implements OnInit {

  nombreSitio = '';

  descripcion = '';

  colorTema = '#000000';

  sitios: any[] = [];

  editando = false;

  idEditar = '';

  constructor(
    private sitioService: SitioService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    this.obtenerSitios();

  }

  obtenerSitios(): void {

    this.sitioService.getSitios().subscribe({

      next: (res: any) => {

        console.log('RESPUESTA API:', res);

        this.sitios = Array.isArray(res)
          ? [...res]
          : [...(res.sitios || [])];

        console.log('SITIOS:', this.sitios);

        this.cdr.detectChanges();

      },

      error: (err: any) => {

        console.log(err);

      }

    });

  }

  crearSitio(): void {

    const data = {

      nombreSitio: this.nombreSitio,

      descripcion: this.descripcion,

      colorTema: this.colorTema,

      plantilla: 'moderna'

    };

    this.sitioService.crearSitio(data).subscribe({

      next: () => {

        alert('Sitio creado');

        this.limpiarFormulario();

        this.obtenerSitios();

      },

      error: (err: any) => {

        console.log(err);

      }

    });

  }

  eliminarSitio(id: string): void {

    this.sitioService.eliminarSitio(id).subscribe({

      next: () => {

        alert('Sitio eliminado');

        this.obtenerSitios();

      },

      error: (err: any) => {

        console.log(err);

      }

    });

  }

  editarSitio(sitio: any): void {

    this.editando = true;

    this.idEditar = sitio._id;

    this.nombreSitio = sitio.nombreSitio;

    this.descripcion = sitio.descripcion;

    this.colorTema = sitio.colorTema;

  }

  actualizarSitio(): void {

    const data = {

      nombreSitio: this.nombreSitio,

      descripcion: this.descripcion,

      colorTema: this.colorTema

    };

    this.sitioService.actualizarSitio(
      this.idEditar,
      data
    ).subscribe({

      next: () => {

        alert('Sitio actualizado');

        this.editando = false;

        this.idEditar = '';

        this.limpiarFormulario();

        this.obtenerSitios();

      },

      error: (err: any) => {

        console.log(err);

      }

    });

  }

  limpiarFormulario(): void {

    this.nombreSitio = '';

    this.descripcion = '';

    this.colorTema = '#000000';

  }

  cancelarEdicion(): void {

    this.editando = false;

    this.idEditar = '';

    this.limpiarFormulario();

  }

}