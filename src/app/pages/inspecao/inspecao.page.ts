import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
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
import { Observable } from 'rxjs';

@Component({
  selector: 'app-inspecao',
  templateUrl: './inspecao.page.html',
  styleUrls: ['./inspecao.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HeaderComponent, NgOptimizedImage]
})
export class InspecaoPage implements OnInit {

  //==================================== SERVICES
  utilsSvc = inject(UtilsService);
  firebaseSvc = inject(FirebaseService);
  modalCtrol = inject(ModalController);
  router = inject(Router);
  teste!: any;

  //==================================== ATRIBUTOS
  title: string = "inspeções";
  path!: string;
  
  //inspecoes: Inspecao[] = [];  //trocar para tipo async para evitar vazamento de memoria
  inspecoes$ = new Observable<any[]>();

  user: any;
  qtdAmbientes!: string;

  //==================================== COMPORTAMENTOS
  // === init === 
  ngOnInit() {
    console.log("======= dentro de inspecao =======");
    this.user = this.firebaseSvc.getAuth().currentUser;
    this.getInspections();
    this.getQtdAmbientes().then((resp)=>{
      this.qtdAmbientes = resp;
    });
    
  }
  ionViewWillEnter() {
    this.getInspections();
  }
  async getUserr(){
    return await this.utilsSvc.getFromLocalStorage('user'); 
  }

  // === Obter inspections do firebase ===
  getInspections() {
    let path = `users/${this.user.uid}/inspecoes`;
    // return await this.firebaseSvc.getColletionData(path).subscribe({
    //   next: (resp: any) => {
    //     this.inspecoes = resp;
    //   }
    // })
    this.inspecoes$ = this.firebaseSvc.getColletionData(path);
  }

  // === addUpdateInspecao ====
  async addUpdateInspection(inspecao?: any) {
    let success = this.utilsSvc.presentMotal({
      component: AddEditInspecaoComponent,
      cssClass: 'edit-profile-modal',
      componentProps: { inspecao }
    })
    if (await success) this.getInspections()
  }

  // ====== RouterLink =======  
  async routerLink(item: Inspecao) {
    //add o item no localStorage
    await this.utilsSvc.saveInLocalStorage('inspecao', item);
    this.utilsSvc.routerLink('ambiente');
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
    let path = `users/${this.user.uid}/inspecoes/${inspecao?.uid}`;

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

   // busca qtd de ambientes
   async getQtdAmbientes(){
    return await this.firebaseSvc.contaRegistros('teste');
  }
  
}
