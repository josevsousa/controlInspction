import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Ambiente } from 'src/app/models/ambiente.model';
import { Problema } from 'src/app/models/problema.model'
import { ActivatedRoute, Router } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AddEditProblemaComponent } from 'src/app/shared/components/add-edit-problema/add-edit-problema.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-problema',
  templateUrl: './problema.page.html',
  styleUrls: ['./problema.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HeaderComponent]
})
export class ProblemaPage implements OnInit {

  //=============== SERVICES
  activateRoute = inject(ActivatedRoute);
  utilsSvc = inject(UtilsService);
  firebaseSvc = inject(FirebaseService);
  router = inject(Router);

  //=============== ATRIBUTOS
  title = "problemas";
  inspecao!: any;
  ambiente!: any;
  uidUser!: string;
  path!: string;
  // problemas: any[] = []; // LISTA problemas
  problemas$ = new Observable<any[]>();

  ngOnInit() {
    console.log("======= dentro de problema =======");
    this.initProblema();
  }

  initProblema() {
    this.inspecao = this.utilsSvc.getFromLocalStorage('inspecao');
    this.ambiente = this.utilsSvc.getFromLocalStorage('ambiente');
    this.uidUser = this.utilsSvc.getFromLocalStorage('user').uid;
    this.path = `users/${this.uidUser}/inspecoes/${this.inspecao.uid}/ambientes/${this.ambiente.uid}/problemas`;
    console.log("================? "+this.path);
  }

  ionViewWillEnter() {
    this.getInspections();
  }

  
  // === Obter inspections do firebase ===
  getInspections() {
    // return this.firebaseSvc.getColletionData(this.path).subscribe({
    //   next: (resp: any) => {
    //     this.problemas = resp;
    //   }
    // })
    this.problemas$ = this.firebaseSvc.getColletionData(this.path);
  }


  // === addUpdateProblema ====
  async addUpdateProblema(problema?: any) {
    let success = this.utilsSvc.presentMotal({
      component: AddEditProblemaComponent,
      cssClass: 'edit-profile-modal',
      componentProps: { problema }
    })
    if (await success) this.getInspections()
  }

  // ====== RouterLink =======  
  async routerLink(item: Ambiente) {
    //add o item no localStorage
    await this.utilsSvc.saveInLocalStorage('problema', item);
    this.utilsSvc.routerLink('problema');
  }

  
  // ====== Confirmar evento de delete ======
  async confirmDeleteProblema(problema: Problema) {
    this.utilsSvc.presentAlert({
      header: 'Deletar problema',
      message: 'Deseja mesmo deletar?',
      mode: 'ios',
      buttons: [{
        text: 'Cancelar'
      },
      {
        text: 'Sim Deletar',
        handler: () => {
          this.deleleProblema(problema);
        }
      }]
    })
  }

  // === Deletar inspection do firebase  ===
  async deleleProblema(problema?: Problema) {
    let path = `${this.path}/${problema?.uid}`;

    const loading = await this.utilsSvc.loading();
    await loading.present();

    // ====== deletar img ======
    let imagePath = await this.firebaseSvc.getFilePath(problema!.image);
    await this.firebaseSvc.deletarFile(imagePath);

    this.firebaseSvc.deletarDocument(path)
      .then(async res => {
        // toast alerta 
        this.utilsSvc.presentToast({
          message: "Problema Eliminado!",
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
