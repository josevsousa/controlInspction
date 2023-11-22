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


@Component({
  selector: 'app-inspection-list',
  templateUrl: './inspection-list.page.html',
  styleUrls: ['./inspection-list.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HeaderComponent]
})
export class InspectionListPage implements OnInit {

  title = "inspection"
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);
  inspections: Inspection[] = [];
  modalCtrol = inject(ModalController);

  ngOnInit() {
    console.log('dentro da page inspection')
    // this.getInspections();
  }

  ionViewWillEnter() {
    this.getInspections();
  }

  // ====== Obter inspections
  // async getInspections() {
  //   let path = "users";
  //   let list = this.firebaseSvc.getColletionData(path).subscribe({
  //     next: (resp: any) => {
  //       this.inspections = resp;
  //     }
  //   });
  // }

  // ===  ObterUid ====
  uidUser() {
    return this.firebaseSvc.getAuth().currentUser?.uid;
  }


  async getInspections() {
    let path = `user/${this.uidUser()}/inspections`;
    let sub = this.firebaseSvc.getColletionData(path).subscribe({
      next: (resp: any) => {
        this.inspections = resp;
      }
    })
  }


  // ====== Confirmar evento de delete ======
  async confirmDeleteInspection(inspection: Inspection) {
    this.utilsSvc.presentAlert({
      header: 'Deletar Inspection',
      message: 'Deseja mesmo deletar?',
      buttons: [{
        text: 'Cancelar'
      },
      {
        text: 'Sim Deletar',
        handler: ()=>{
          this.deleleInspections(inspection);
        }
      }]
    })
  }


  async deleleInspections(inspection?: Inspection) {
    let path = `user/${this.uidUser()}/inspections/${inspection?.uid}`;
    console.log(path);
    const loading = await this.utilsSvc.loading();
    await loading.present();

    // deletar imagem se tiver
    // ==== ==== ====

    this.firebaseSvc.deletarDocument(path).then(async res => {
      console.log(this.inspections);
      this.inspections = this.inspections.filter(p => p.uid !== inspection?.uid);
      console.log(this.inspections);

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
