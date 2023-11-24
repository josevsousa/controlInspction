import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Inspection } from 'src/app/models/inspection.model';
import { ModalController } from '@ionic/angular/standalone';
import { InspectionAddPage } from 'src/app/shared/components/inspection-add/InspectionAddPage';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-inspection-list',
  templateUrl: './inspection-list.page.html',
  styleUrls: ['./inspection-list.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HeaderComponent, RouterLink]
})
export class InspectionListPage implements OnInit {

  title = "inspection"
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);
  inspections: Inspection[] = [];
  modalCtrol = inject(ModalController);
  router = inject(Router);

  ngOnInit() {
    console.log('dentro da page inspection')
    // this.getInspections();
  }

  ionViewWillEnter() {
    this.getInspections();
  }

  // ===  ObterUid ====
  uidUser() {
    return this.firebaseSvc.getAuth().currentUser?.uid;
  }

  // === Obter inspections do firebase ===
  async getInspections() {
    let path = `user/${this.uidUser()}/inspections`;
    console.log(path);
    let sub = this.firebaseSvc.getColletionData(path).subscribe({
      next: (resp: any) => {
        this.inspections = resp;
      }
    })
  }

  // ====== RouterLink =======
  routerLink(item: Inspection){
    this.router.navigate(['/environment-list', JSON.stringify(item.uid)]);
  }


  // ====== Confirmar evento de delete ======
  async confirmDeleteInspection(inspection: Inspection) {
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
  async deleleInspections(inspection?: Inspection) {
    let path = `user/${this.uidUser()}/inspections/${inspection?.uid}`;

    const loading = await this.utilsSvc.loading();
    await loading.present();

     // ====== deletar img ======
     let imagePath = await this.firebaseSvc.getFilePath(inspection!.image);
     await this.firebaseSvc.deletarFile(imagePath);

    this.firebaseSvc.deletarDocument(path)
      .then(async res => {
        // toast alerta 
        this.utilsSvc.presentToast({
          message: "Inspection Deletado!",
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

  // ===== add e upgrade de uma inspection
  async addUpdateInspection(inspection?: Inspection) {
    // console.log(inspection)
    let success = this.utilsSvc.presentMotal({
      component: InspectionAddPage,
      cssClass: 'edit-profile-modal',
      componentProps: { inspection }
    })
    if (await success) this.getInspections()
  }

}
