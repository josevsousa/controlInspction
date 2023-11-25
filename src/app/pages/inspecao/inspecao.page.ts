import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

// === components ===
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { AddEditInspecaoComponent } from 'src/app/shared/components/add-edit-inspecao/add-edit-inspecao.component';
import { UtilsService } from 'src/app/services/utils.service';
import { Inspecao } from 'src/app/models/inspecao.model';
import { Inspection } from 'src/app/models/inspection.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router, RouterLink } from '@angular/router';
import { ModalController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-inspecao',
  templateUrl: './inspecao.page.html',
  styleUrls: ['./inspecao.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HeaderComponent]
})
export class InspecaoPage implements OnInit {

  //==================================== SERVICES
  utilsSvc = inject(UtilsService);
  firebaseSvc = inject(FirebaseService);
  modalCtrol = inject(ModalController);
  router = inject(Router);

  //==================================== ATRIBUTOS
  title: string = "inpecao";
  path!: string;
  inspecoes: Inspection[] = [];
  uidUser!: string;

  //==================================== COMPORTAMENTOS
  // === init === 
  ngOnInit() {
    console.log("======= dentro de inspecao =======")
    this.uidUser = this.utilsSvc.getFromLocalStorage('user').uid;
    this.getInspections();
  }
  ionViewWillEnter() {
    this.getInspections();
  }


  // === Obter inspections do firebase ===
  async getInspections() {
    let path = `users/${this.uidUser}/inspecoes`;
    console.log(path);
    let sub = this.firebaseSvc.getColletionData(path).subscribe({
      next: (resp: any) => {
        this.inspecoes = resp;
        console.log(resp)
      }
    })
  }
  // ====== RouterLink =======
  routerLink(item: Inspection) {
    this.router.navigate(['/ambiente', JSON.stringify(item.uid)]);
  }

  // === addUpdateInspecao ====
  async addUpdateInspection(inspecao?: Inspecao) {
    // console.log(inspection)
    let success = this.utilsSvc.presentMotal({
      component: AddEditInspecaoComponent,
      cssClass: 'edit-profile-modal',
      componentProps: { inspecao }
    })
    // if (await success) this.getInspections()
  }

}
