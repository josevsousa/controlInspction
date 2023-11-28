import { Component, OnInit, Input, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { Ambiente } from 'src/app/models/ambiente.model';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UtilsService } from 'src/app/services/utils.service';
import { FirebaseService } from 'src/app/services/firebase.service';


@Component({
  selector: 'app-add-edit-ambiente',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, HeaderComponent],
  templateUrl: './add-edit-ambiente.component.html',
  styleUrls: ['./add-edit-ambiente.component.scss'],
})
export class AddEditAmbienteComponent implements OnInit {
  // ========== SERVECES
  utilsSvc = inject(UtilsService);
  firebaseSvc = inject(FirebaseService);

  // ========== ATRIBUTOS
  @Input() ambiente: any;
  inspecao!: any;
  title!: string;
  uidUser!: string;
  formAmbiente = new FormGroup({
    uid: new FormControl(''),
    image: new FormControl('', Validators.required),
    ativo: new FormControl(true),
    nome: new FormControl('', [Validators.required, Validators.min(0)]),
    data_inicio: new FormControl(Date.now()),
    data_fim: new FormControl(null)
  });

  // ========== COMPORTAMENTOS
  ngOnInit() {
    console.log("dentro do add-edit-ambiente");
    this.uidUser = this.utilsSvc.getFromLocalStorage('user').uid;
    this.inspecao = this.utilsSvc.getFromLocalStorage('inspecao');

    if (this.ambiente) {
      // recebeu uma ambiente
      this.formAmbiente.setValue(this.ambiente);
      this.title = "Editar Ambiente";
    } else {
      // nao recebeu uma ambiente
      this.title = "Novo Ambiente";
    };
  }

  //=========== Tirar/Selecionar Photo ==========
  async takeImage() {
    const dataUrl = (await this.utilsSvc.takePicture('Image do Ambiente')).dataUrl;
    this.formAmbiente.controls.image.setValue(dataUrl!);
  }

  // ========== Submit ================
  onSubmit() {
    if (this.formAmbiente.valid) {
      if (this.ambiente) {
        this.updateAmbiente();
      }
      else {
        this.criarAmbiente();
      };
    }
  }

  // ========== Criar Ambiente ================
  async criarAmbiente() {

    let newUid = Date.now();
    let path = `users/${this.uidUser}/inspecoes/${this.inspecao.uid}/ambientes/${newUid}`;
    this.formAmbiente.controls.uid.setValue(`${newUid}`);

    const loading = await this.utilsSvc.loading();
    await loading.present();

  
    // console.log("A: "+ this.formAmbiente.value.image);
    // console.log("B: "+ this.inspecao.image);
    // === Suber imagem e obter a url ====
    let dataUrl = this.formAmbiente.value.image;
    let imagePath = `${this.uidUser}/inspecao/${this.inspecao.uid}/ambiente/${newUid}`;
    let imageUrl = await this.firebaseSvc.uploadImage(imagePath, dataUrl);
    this.formAmbiente.controls.image.setValue(imageUrl);
  

    
    // console.log("C: "+ path);
    // console.log("D: "+ this.formAmbiente.value);

    // // ==== add ambiente
    this.firebaseSvc.setDocument(path, this.formAmbiente.value)
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

  
  // ===== update inspection =====
  async updateAmbiente() {
    let path = `users/${this.uidUser}/inspecoes/${this.inspecao.uid}/ambientes/${this.ambiente.uid}`;

    const loading = await this.utilsSvc.loading();
    await loading.present();

    // === Subir imagem, atualizar e obter a url ====
    if (this.formAmbiente.value.image !== this.ambiente.image) {
      console.log("NOVA IMAGEM")
      let dataUrl = this.formAmbiente.value.image;
      let imagePath = await this.firebaseSvc.getFilePath(this.ambiente.image);
      let imageUrl = await this.firebaseSvc.uploadImage(imagePath, dataUrl!)!;
      this.formAmbiente.controls.image.setValue(imageUrl);
    }


    //?????

    // console.log(this.formAmbiente.value);
    // console.log(path);
    // delete this.formAmbiente.value.uid;
    this.firebaseSvc.updateDocument(path, this.formAmbiente.value)
      .then(async (resp) => {
        this.utilsSvc.dismissModal({ success: true });
        this.utilsSvc.presentToast({
          message: 'Ambiente Atualizado!',
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
