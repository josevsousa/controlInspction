import { Component, OnInit, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from '../header/header.component';
import { UtilsService } from 'src/app/services/utils.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Inspection } from 'src/app/models/inspection.model';
import { ActivatedRoute } from '@angular/router';




@Component({
  selector: 'app-environment-add',
  templateUrl: './environment-add.page.html',
  styleUrls: ['./environment-add.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HeaderComponent, ReactiveFormsModule]
})
export class EnvironmentAddPage implements OnInit {
  title = "environment-add";

  @Input() inspection?: any;
  @Input() uidInspection?: any;
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);
  uidUser = this.firebaseSvc.getAuth().currentUser?.uid;
  activateRoute = inject(ActivatedRoute);

  form = new FormGroup({
    uid: new FormControl(''),
    image: new FormControl(''),
    name: new FormControl('', [Validators.required, Validators.min(0)]),
    data_inicio: new FormControl(Date.now()),
  });

  ngOnInit() {
    console.log("dentro do environment-add");

    // if (this.inspection) this.form.setValue(this.inspection);
    
    
    console.log("............ :" + this.uidInspection);
  }


  //=========== Tirar/Selecionar Photo ==========
  async takeImage() {
    const dataUrl = (await this.utilsSvc.takePicture('Image do produto')).dataUrl;
    this.form.controls.image.setValue(dataUrl!);
  }

  onSubmit() {
    // console.log(this.form.value);
    if (this.form.valid) {
      if (this.inspection) {
        this.updateEnvironment();
      }
      else {
        this.createEnvironment();

        console.log("environment:" + this.inspection);
      };
    }
  }



  // ===== create inspection ===
  async createEnvironment() {
    let newUid = Date.now();
    let path = `user/${this.uidUser}/inspections/${this.inspection}/environments/${newUid}`;
    this.form.controls.uid.setValue(`${newUid}`);

    console.log("paths:  "+ path);

    // const loading = await this.utilsSvc.loading();
    // await loading.present();



    // se tiver imagem subir aqui
    // ===== === ==== ===
    // ==== add inspection
    // this.firebaseSvc.setDocument(path, this.form.value)
    //   .then(async (res) => {
    //     this.utilsSvc.dismissModal({ success: true });
    //     this.utilsSvc.presentToast({
    //       message: 'Inspection add',
    //       duration: 1500,
    //       color: 'success',
    //       position: 'middle',
    //       icon: 'checkmark-circle-outline'
    //     });
    //   })
    //   .catch(error => this.utilsSvc.presentToast({
    //     message: error.message,
    //     duration: 2500,
    //     color: 'primary',
    //     position: 'middle',
    //     icon: 'alert-circle-outline'
    //   })
    //   )
    //   .finally(() => {
    //     loading.dismiss();
    //   });

  }
  // ===== update inspection =====
  async updateEnvironment() {
    let path = `user/${this.uidUser}/inspections/${this.inspection.uid}/environments`;

    const loading = await this.utilsSvc.loading();
    await loading.present();


    // === Subir imagem, atualizar e obter a url ====
    if (this.form.value.image !== this.inspection.image) {
      let dataUrl = this.form.value.image;
      let imagePath = await this.firebaseSvc.getFilePath(this.inspection.image);
      console.log("imagePath======:" + imagePath);
      let imageUrl = await this.firebaseSvc.uploadImage(imagePath, dataUrl!)!;
      this.form.controls.image.setValue(imageUrl);
    }

    // delete this.form.value.uid;

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