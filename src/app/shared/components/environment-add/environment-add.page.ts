import { Component, OnInit, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from '../header/header.component';
import { UtilsService } from 'src/app/services/utils.service';
import { FirebaseService } from 'src/app/services/firebase.service';



@Component({
  selector: 'app-environment-add',
  templateUrl: './environment-add.page.html',
  styleUrls: ['./environment-add.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HeaderComponent, ReactiveFormsModule]
})
export class EnvironmentAddPage implements OnInit {
  title = "environment-add";
  
  @Input()  environment?: any;
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);
  uidUser = this.firebaseSvc.getAuth().currentUser?.uid;

  form = new FormGroup({
    uid: new FormControl(''),
    name: new FormControl('', [Validators.required, Validators.min(0)]),
    data_inicio: new FormControl(Date.now()),
  });

  ngOnInit() {
    console.log("dentro do environment-add");
    if(this.environment) this.form.setValue(this.environment);
  }

  onSubmit() {
    // console.log(this.form.value);
    if (this.form.valid) {
      if (this.environment) {
        this.updateInspection();
      }
      else {
        this.createInspection();
        
        console.log("environment:"+ this.environment);
      };
    }
  }

  
  
  // ===== create inspection ===
  async createInspection() {
    let newUid = Date.now();
    let path = `user/${this.uidUser}/inspections/1700769380505/${newUid}`;
    this.form.controls.uid.setValue(`${newUid}`);

    const loading = await this.utilsSvc.loading();
    await loading.present();



    // se tiver imagem subir aqui
    // ===== === ==== ===
    // ==== add inspection
    this.firebaseSvc.setDocument(path, this.form.value)
      .then(async (res) => {
        this.utilsSvc.dismissModal({ success: true });
        this.utilsSvc.presentToast({
          message: 'Inspection add',
          duration: 1500,
          color: 'success',
          position: 'middle',
          icon: 'checkmark-circle-outline'
        });
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

  }
  async updateInspection() {
    let path = `user/${this.uidUser}/inspections/${this.environment.uid}/environments`;
    console.log(path)
  }

  // ===== update inspection =====
  async _updateInspection() {
    let path = `user/${this.uidUser}/inspections/${this.environment.uid}/environments`;

    const loading = await this.utilsSvc.loading();
    await loading.present();

    delete this.form.value.uid;

    this.firebaseSvc.updateDocument(path, this.form.value)
      .then(async (resp) => {
        this.utilsSvc.dismissModal({ success: true });
        this.utilsSvc.presentToast({
          message: 'Enviironment Actualizad',
          duration: 1500,
          color: 'success',
          position: 'middle',
          icon: 'checkmark-circle-outline'
        });
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

  }

  
  
  // ===== Atualizar o profile
  // editEnvironment() {
  //   this.utilsSvc.presentMotal({
  //     component: EnvironmentAddPage,
  //     cssClass: 'edit-profile-modal'
  //   }).finally(() => {
  //     // atualizar o user de localStorage
  //     // this.getUserLS(); 
  //   });

  // }
}