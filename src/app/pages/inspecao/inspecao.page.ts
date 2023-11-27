import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

// === components ===
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { AddEditInspecaoComponent } from 'src/app/shared/components/add-edit-inspecao/add-edit-inspecao.component';
import { UtilsService } from 'src/app/services/utils.service';
import { Inspecao } from 'src/app/models/inspecao.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';
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
  title: string = "inspeções";
  path!: string;
  inspecoes: Inspecao[] = [];
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
    return this.firebaseSvc.getColletionData(path).subscribe({
      next: (resp: any) => {
        this.inspecoes = resp;
      }
    })
  }
  // ====== RouterLink =======  
  routerLink(item: Inspecao) {
    this.router.navigate(['/ambiente', item.uid]);
  }

  // === addUpdateInspecao ====
  async addUpdateInspection(inspecao?: any) {
    let teste = "jos";
    let success = this.utilsSvc.presentMotal({
      component: AddEditInspecaoComponent,
      cssClass: 'edit-profile-modal',
      componentProps: { inspecao, teste }
    })
    if (await success) this.getInspections()
  }


  // ====== Confirmar evento de delete ======
  async confirmDeleteInspection(inspection: Inspecao) {
    this.utilsSvc.presentAlert({
      header: 'Deletar Inspection',
      message: 'Deseja mesmo deletar?',
      mode: 'ios',
      buttons: [{
        text: 'Cancelar'
      },
      {
        text: 'Sim Deletar',
        handler: () => {
          this.deleleInspections(inspection);
        }
      }]
    })
  }

  // === Deletar inspection do firebase  ===
  async deleleInspections(inspecao?: Inspecao) {
    let path = `users/${this.uidUser}/inspecoes/${inspecao?.uid}`;

    const loading = await this.utilsSvc.loading();
    await loading.present();

    // ====== deletar img ======
    let imagePath = await this.firebaseSvc.getFilePath(inspecao!.image);
    await this.firebaseSvc.deletarFile(imagePath);

    this.firebaseSvc.deletarDocument(path)
      .then(async res => {
        // toast alerta 
        this.utilsSvc.presentToast({
          message: "Inspeção Eliminada!",
          duration: 1500,
          color: 'success',
          position: 'middle',
          icon: 'alert-circle-outline'
        })
          .catch(error => this.utilsSvc.presentToast({
            message: error.message,
            duration: 2500,
            color: 'primary',
            position: 'middle',
            icon: 'alert-circle-outline'
          })
          )
          .finally(() => {
            loading.dismiss();
          });
      });

  }
}
