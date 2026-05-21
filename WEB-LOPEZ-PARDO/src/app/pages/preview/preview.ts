import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

import { SitioService } from '../../services/sitio';

@Component({
  selector: 'app-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './preview.html',
  styleUrl: './preview.css'
})

export class Preview {

  sitio: any = null;

  constructor(
    private route: ActivatedRoute,
    private sitioService: SitioService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    console.log("ID:", id);

    if(id){

      this.sitioService.getSitioById(id).subscribe({

        next: (res:any) => {

          console.log("DATOS DEL SITIO:", res);

          this.sitio = res;

          this.cd.detectChanges();

        },

        error: (err:any) => {

          console.log(err);

        }

      });

    }

  }

}