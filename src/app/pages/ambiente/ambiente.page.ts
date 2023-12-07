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
import { Observable } from 'rxjs';


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
  title = "ambientes";
  inspecao!: any;
  uidUser!: string;
  path!: string;
  // ambientes: Ambiente[] = []; // LISTA ambientes
  ambientes$ = new Observable<any[]>();

  ngOnInit() {
    console.log("======= dentro de ambiente =======");
    this.initAmbinent();
  }

  initAmbinent() {
    // this.uidInspecao = this.activateRoute.snapshot.params['uidInspecao'];
    this.inspecao = this.utilsSvc.getFromLocalStorage('inspecao');
    this.uidUser = this.utilsSvc.getFromLocalStorage('user').uid;

    // this.uidUser = JSON.stringify(this.firebaseSvc.getAuth().currentUser?.uid);
    this.path = `users/${this.uidUser}/inspecoes/${this.inspecao.uid}/ambientes`;
  }

  ionViewWillEnter() {
    this.getInspections();
  }



  // === Obter inspections do firebase ===
  getInspections() {
    // return this.firebaseSvc.getColletionData(this.path).subscribe({
    //   next: (resp: any) => {
    //     this.ambientes = resp;
    //   }
    // })
    this.ambientes$ = this.firebaseSvc.getColletionData(this.path);
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

  // ====== RouterLink =======  
  async routerLink(item: Ambiente) {
    //add o item no localStorage
    await this.utilsSvc.saveInLocalStorage('ambiente', item);
    this.utilsSvc.routerLink('problema');
  }

  
  
  // ====== Confirmar evento de delete ======
  async confirmDeleteAmbiente(ambiente: Ambiente) {
    this.utilsSvc.presentAlert({
      header: 'Deletar Ambiente',
      message: 'Deseja mesmo deletar?',
      mode: 'ios',
      buttons: [{
        text: 'Cancelar'
      },
      {
        text: 'Sim Deletar',
        handler: () => {
          this.deleleAmbiente(ambiente);
        }
      }]
    })
  }

  // === Deletar inspection do firebase  ===
  async deleleAmbiente(ambiente?: Ambiente) {
    let path = `${this.path}/${ambiente?.uid}`;

    const loading = await this.utilsSvc.loading();
    await loading.present();

    // ====== deletar img ======
    let imagePath = await this.firebaseSvc.getFilePath(ambiente!.image);
    await this.firebaseSvc.deletarFile(imagePath);

    this.firebaseSvc.deletarDocument(path)
      .then(async res => {
        // toast alerta 
        this.utilsSvc.presentToast({
          message: "Ambiente Eliminado!",
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
