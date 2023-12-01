import { Component, OnInit, Input, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Ambiente } from 'src/app/models/ambiente.model';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UtilsService } from 'src/app/services/utils.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-add-edit-problema',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, HeaderComponent],
  templateUrl: './add-edit-problema.component.html',
  styleUrls: ['./add-edit-problema.component.scss'],
})
export class AddEditProblemaComponent  implements OnInit {
  // ========== SERVECES
  utilsSvc = inject(UtilsService);
  firebaseSvc = inject(FirebaseService);

    // ========== ATRIBUTOS
    @Input() problema: any;
    ambiente!: any;
    inspecao!: any;
    title!: string;
    uidUser!: string;
    path!: string;
    formProblema = new FormGroup({
      uid: new FormControl(''),
      image: new FormControl('', Validators.required),
      ativo: new FormControl(true),
      nome: new FormControl('', [Validators.required, Validators.min(0)]),
      data_inicio: new FormControl(Date.now()),
      data_fim: new FormControl(null)
    });

  ngOnInit() {
    console.log("dentro do add-edit-ambiente");
    this.initAddEditProblema();
    if (this.problema) {
      // recebeu uma problema
      this.formProblema.setValue(this.problema);
      this.title = "Editar Problema";
    } else {
      // nao recebeu uma problema
      this.title = "Novo Problema";
    };
  }

  // === iniciar problema ====
  initAddEditProblema() {
    this.inspecao = this.utilsSvc.getFromLocalStorage('inspecao');
    this.ambiente = this.utilsSvc.getFromLocalStorage('ambiente');
    this.uidUser = this.utilsSvc.getFromLocalStorage('user').uid;
    this.path = `users/${this.uidUser}/inspecoes/${this.inspecao.uid}/ambientes/${this.ambiente.uid}/problemas`;
  }

    //=========== Tirar/Selecionar Photo ==========
    async takeImage() {
      const dataUrl = (await this.utilsSvc.takePicture('Image do Ambiente')).dataUrl;
      this.formProblema.controls.image.setValue(dataUrl!);
    }

      // ========== Submit ================
  onSubmit() {
    
    if (this.formProblema.valid) {
      if (this.problema) {
        this.updateProblema();
      }
      else {
        this.criarProblema();
      };
    }
  }



  
  // ========== Criar Ambiente ================
  async criarProblema() {

    const loading = await this.utilsSvc.loading();
    await loading.present();

    let newUid = Date.now();
    let path = `${this.path}/${newUid}`;
    this.formProblema.controls.uid.setValue(`${newUid}`);
  
    // === Suber imagem e obter a url ====
    let dataUrl = this.formProblema.value.image;
    let imagePath = `${this.path}/${newUid}`;
    let imageUrl = await this.firebaseSvc.uploadImage(imagePath, dataUrl);
    this.formProblema.controls.image.setValue(imageUrl);

    // // ==== add ambiente
    this.firebaseSvc.setDocument(path, this.formProblema.value)
      .then(async (res) => {
        this.utilsSvc.dismissModal({ success: true });
        this.utilsSvc.presentToast({
          message: 'Ambiente adicionado',
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

  
  // ===== update problema =====
  async updateProblema() {
    let path = `${this.path}/${this.problema.uid}`;

    const loading = await this.utilsSvc.loading();
    await loading.present();

    

    // === Subir imagem, atualizar e obter a url ====
    if (this.formProblema.value.image !== this.problema.image) {
      let dataUrl = this.formProblema.value.image;
      let imagePath = await this.firebaseSvc.getFilePath(this.problema.image);
      let imageUrl = await this.firebaseSvc.uploadImage(imagePath, dataUrl!)!;
      this.formProblema.controls.image.setValue(imageUrl);
    }

    // delete this.form.value.uid;
    this.firebaseSvc.updateDocument(path, this.formProblema.value)
      .then(async (resp) => {
        this.utilsSvc.dismissModal({ success: true });
        this.utilsSvc.presentToast({
          message: 'Promblema Atualizado!',
          duration: 1500,
          color: 'success',
          position: 'middle',
          icon: 'checkmark-circle-outline'
        });
      })
      .catch(error => this.utilsSvc.presentToast({
        message: error.message,
        duration: 2500,
        color: 'danger',
        position: 'middle',
        icon: 'alert-circle-outline'
      })
      )
      .finally(() => {
        loading.dismiss();
      });

  }




}
