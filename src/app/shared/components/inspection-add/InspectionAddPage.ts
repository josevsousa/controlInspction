import { Component, OnInit, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from '../header/header.component';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';


@Component({
  selector: 'app-inspection-add',
  templateUrl: './inspection-add.page.html',
  styleUrls: ['./inspection-add.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HeaderComponent, ReactiveFormsModule]
})
export class InspectionAddPage implements OnInit {
  title = "inpection-add";

  @Input() inspection?: any;
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);
  uidUser = this.firebaseSvc.getAuth().currentUser?.uid;

  form = new FormGroup({
    uid: new FormControl(''),
    active: new FormControl(true),
    name: new FormControl('', [Validators.required, Validators.min(0)]),
    data_inicio: new FormControl(Date.now()),
    data_fim: new FormControl(undefined)
  });

  ngOnInit() {
    console.log('dentro de inspection-add');
    if (this.inspection) this.form.setValue(this.inspection);
  }

  onSubmit() {
    // console.log(this.form.value);
    if (this.form.valid) {
      if (this.inspection) {
        this.updateInspection();
      }
      else {
        this.createInspection();
      };
    }
  }


  // ===== create inspection ===
  async createInspection() {
    let newUid = Date.now();
    let path = `user/${this.uidUser}/inspections/${newUid}`;
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


  // ===== update inspection =====
  async updateInspection() {
    let path = `user/${this.uidUser}/inspections/${this.inspection.uid}`;

    const loading = await this.utilsSvc.loading();
    await loading.present();

    delete this.form.value.uid;

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
        color: 'primary',
        position: 'middle',
        icon: 'alert-circle-outline'
      })
      )
      .finally(() => {
        loading.dismiss();
      });

  }

}
