import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { UtilsService } from 'src/app/services/utils.service';
import { EnvironmentAddPage } from 'src/app/shared/components/environment-add/environment-add.page';

import { Inspection } from 'src/app/models/inspection.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Environment } from '../../models/environment.model';
import { ModalController } from '@ionic/angular/standalone';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-environment-list',
  templateUrl: './environment-list.page.html',
  styleUrls: ['./environment-list.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HeaderComponent]
})
export class EnvironmentListPage implements OnInit {

  title = 'environment';

  router = inject(Router);
  utilsSvc = inject(UtilsService);
  firebaseSvc = inject(FirebaseService);
  activateRoute = inject(ActivatedRoute);
  modalCtrol = inject(ModalController);

  uidInspection!: Inspection; // UID inspection
  environments: Environment[] = []; // LISTA ambientes


  ngOnInit() {
    // uid da inspection
    this.uidInspection = JSON.parse(this.activateRoute.snapshot.params['inspection']);
  }

  // ===  quando entrar na pagina
  ionViewWillEnter() {
    this.getEnvironments();
  }
  // ====== RouterLink =======
  // routerLink(item: Environment){
  //   console.log("routerLink environment-list: "+ item)
  //   // this.router.navigate(['/environment-add', JSON.stringify(item)]);
  // }

  
  // ===  ObterUid ====
  uidUser() {
    return this.firebaseSvc.getAuth().currentUser?.uid;
  }

  // === Obter enviroments do firebase ===
  async getEnvironments() {
    let uidUser = await this.uidUser();
    let path = `user/${uidUser}/inspections/${this.uidInspection}/environments`;
    let sub = this.firebaseSvc.getColletionData(path).subscribe({
      next: (resp: any) => {
        this.environments = resp;
      }
    })
  }

  // ====== RouterLink =======
  routerLink(item: Inspection) {
    this.router.navigate(['/images-list', JSON.stringify(item.uid)]);
  }


  // ====== Confirmar evento de delete ======
  async confirmDeleteEnvironment(enviroment: Environment) {
    this.utilsSvc.presentAlert({
      header: 'Deletar Environment',
      message: 'Deseja mesmo deletar?',
      mode: 'ios',
      buttons: [{
        text: 'Cancelar'
      },
      {
        text: 'Sim Deletar',
        handler: () => {
          this.deleleEnvironment(enviroment);
        }
      }]
    })
  }

  // === Deletar inspection do firebase  ===
  async deleleEnvironment(enviroment?: Environment) {
    let path = `user/${this.uidUser()}/inspections/${enviroment?.uid}`;

    const loading = await this.utilsSvc.loading();
    await loading.present();

    // ====== deletar img ======
    let imagePath = await this.firebaseSvc.getFilePath(enviroment!.image);
    await this.firebaseSvc.deletarFile(imagePath);

    this.firebaseSvc.deletarDocument(path)
      .then(async res => {
        // toast alerta 
        this.utilsSvc.presentToast({
          message: "Environment Delected!",
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

  
  // ===== add e upgrade de uma environment
  async addUpdateEnvironment(enviroment?: Environment, uidInspection? : Inspection) {
    let success = this.utilsSvc.presentMotal({
      component: EnvironmentAddPage,
      cssClass: 'edit-profile-modal',
      componentProps: { enviroment, uidInspection }
    })
    if (await success) this.getEnvironments()
  }


}
