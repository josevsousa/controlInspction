import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Ambiente } from 'src/app/models/ambiente.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AddEditAmbienteComponent } from 'src/app/shared/components/add-edit-ambiente/add-edit-ambiente.component';


@Component({
  selector: 'app-ambiente',
  templateUrl: './ambiente.page.html',
  styleUrls: ['./ambiente.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HeaderComponent]
})
export class AmbientePage implements OnInit {

  //=============== SERVICES
  activateRoute = inject(ActivatedRoute);
  utilsSvc = inject(UtilsService);
  firebaseSvc = inject(FirebaseService);
  router = inject(Router);

  //=============== ATRIBUTOS
  title = "ambiente";
  inspecao!: any;
  uidUser!: string;
  path!: string;
  ambientes: Ambiente[] = []; // LISTA ambientes

  ngOnInit() {
    console.log("======= dentro de ambiente =======");
    console.log(this.ambientes);
    this.initAmbinent();
  }

  initAmbinent() {
    // this.uidInspecao = this.activateRoute.snapshot.params['uidInspecao'];
    this.inspecao = this.utilsSvc.getFromLocalStorage('inspecao');
    this.uidUser = this.utilsSvc.getFromLocalStorage('user').uid;
    this.path = `users/${this.uidUser}/inspecoes/${this.inspecao.uid}/ambientes`;
  }

  ionViewWillEnter() {
    this.getInspections();
  }

  ionViewWillLeave(){
    this.utilsSvc.delFromLocalStorage('inspecao');
  }

  // === Obter inspections do firebase ===
  async getInspections() {
    return this.firebaseSvc.getColletionData(this.path).subscribe({
      next: (resp: any) => {
        this.ambientes = resp;
      }
    })
  }


  // === addUpdateInspecao ====
  async addUpdateAmbientes(ambiente?: any) {
    let teste = "teste ambiente";
    let success = this.utilsSvc.presentMotal({
      component: AddEditAmbienteComponent,
      cssClass: 'edit-profile-modal',
      componentProps: { ambiente, teste }
    })
    if (await success) this.getInspections()
  }

}
