import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Ambiente } from 'src/app/models/ambiente.model';
import { ActivatedRoute } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';

@Component({
  selector: 'app-ambiente',
  templateUrl: './ambiente.page.html',
  styleUrls: ['./ambiente.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HeaderComponent]
})
export class AmbientePage implements OnInit {

  //==================================== SERVICES
  activateRoute = inject(ActivatedRoute);
  utilsSvc = inject(UtilsService);
  
  //==================================== ATRIBUTOS
  title = "ambientes";
  uidInspecao!: string;
  uidUser!: string;
  path!: string;
  environments: Ambiente[] = []; // LISTA ambientes

  constructor() { }

  ngOnInit() {
       this.initAmbinent();
  }

  initAmbinent(): void{
    // uid da inspection
    this.uidInspecao = this.activateRoute.snapshot.params['uidInspecao'];
    this.uidUser = this.utilsSvc.getFromLocalStorage('user').uid;
    this.path = `users/${this.uidUser}/inspecoes/${this.uidInspecao}/ambientes`;
  }

}
