import { Component, OnInit, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from '../header/header.component';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Inspecao } from 'src/app/models/inspecao.model';

@Component({
  selector: 'app-add-edit-inspecao',
  templateUrl: './add-edit-inspecao.component.html',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HeaderComponent, ReactiveFormsModule],
  styleUrls: ['./add-edit-inspecao.component.scss'],
})
export class AddEditInspecaoComponent implements OnInit {
  title!: string;

  @Input() inspecao: any;
  @Input() teste: any;
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);
  uidUser!: string;

  form = new FormGroup({
    uid: new FormControl(''),
    image: new FormControl('', Validators.required),
    ativo: new FormControl(true),
    nome: new FormControl('', [Validators.required, Validators.min(0)]),
    data_inicio: new FormControl(Date.now()),
    data_fim: new FormControl(null)
  });


  ngOnInit() {
    console.log('dentro da add-edit-inspecao');
    this.uidUser = this.utilsSvc.getFromLocalStorage('user').uid;
    console.log(this.form.value)
    if (this.inspecao) {
      // recebeu uma inspecao
      this.form.setValue(this.inspecao);
      this.title = "Editar Inspecao";
    } else {
      // nao recebeu uma inspecao
      this.title = "Nova Inspecao";
    };

  }

  //=========== Tirar/Selecionar Photo ==========
  async takeImage() {
    const dataUrl = (await this.utilsSvc.takePicture('Image do produto')).dataUrl;
    this.form.controls.image.setValue(dataUrl!);
  }

  onSubmit() {
    if (this.form.valid) {
      if (this.inspecao) {
        this.updateInspection();
      }
      else {
        this.criarInspecao();
      };
    }
  }

  async criarInspecao() {

    let newUid = Date.now();
    let path = `users/${this.uidUser}/inspecoes/${newUid}`;
    this.form.controls.uid.setValue(`${newUid}`);

    const loading = await this.utilsSvc.loading();
    await loading.present();

    // === Suber imagem e obter a url ====
    let dataUrl = this.form.value.image;
    let imagePath = `${this.uidUser}/inspecao/${newUid}`;
    let imageUrl = await this.firebaseSvc.uploadImage(imagePath, dataUrl);
    this.form.controls.image.setValue(imageUrl);


    // // ==== add inspecao
    this.firebaseSvc.setDocument(path, this.form.value)
      .then(async (res) => {
        this.utilsSvc.dismissModal({ success: true });
        this.utilsSvc.presentToast({
          message: 'Inspecao adicionada',
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
  async updateInspection() {
    let path = `users/${this.uidUser}/inspecoes/${this.inspecao.uid}`;

    const loading = await this.utilsSvc.loading();
    await loading.present();

    console.log(this.inspecao.image);

    // === Subir imagem, atualizar e obter a url ====
    if (this.form.value.image !== this.inspecao.image) {
      let dataUrl = this.form.value.image;
      let imagePath = await this.firebaseSvc.getFilePath(this.inspecao.image);
      let imageUrl = await this.firebaseSvc.uploadImage(imagePath, dataUrl!)!;
      this.form.controls.image.setValue(imageUrl);
    }

    // delete this.form.value.uid;
    this.firebaseSvc.updateDocument(path, this.form.value)
      .then(async (resp) => {
        this.utilsSvc.dismissModal({ success: true });
        this.utilsSvc.presentToast({
          message: 'Inspection Atualizado existosament',
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
