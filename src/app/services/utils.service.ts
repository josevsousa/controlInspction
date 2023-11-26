import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  LoadingController,
  ModalOptions,
  ToastController,
  ToastOptions
} from '@ionic/angular';
import {
  AlertController,
  AlertOptions,
  ModalController,
} from '@ionic/angular/standalone';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';



@Injectable({
  providedIn: 'root'
})
export class UtilsService {


  router = inject(Router);
  modalCtrl = inject(ModalController);
  toastCtrl = inject(ToastController);
  loadingCtrl = inject(LoadingController);
  alertCtrl = inject(AlertController);


  // ========== Camera ==========
  async takePicture(promptLabelHeader: string) {
    return await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt,
      promptLabelHeader,
      promptLabelPhoto: 'Selecione uma imagen',
      promptLabelPicture: 'Tirar uma photo'

    });
  };


  // ============ Modal =============
  // abre modal
  async presentMotal(opts: ModalOptions) {
    const modal = await this.modalCtrl.create(opts);
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data) {
      console.log(data)
      return data
    };
  }
  // fecha modal
  dismissModal(data?: any) {
    return this.modalCtrl.dismiss(data);
  }



  // ========== Alert =========
  async presentAlert(opts?: AlertOptions) {
    const alert = await this.alertCtrl.create(opts);
    await alert.present();
  }

  // ========== Loading =========
  loading() {
    return this.loadingCtrl.create({ spinner: 'crescent' })
  }

  // ============ Toast =============
  async presentToast(opts?: ToastOptions) {
    const toast = await this.toastCtrl.create(opts);
    toast.present();
  }

  // ============ Evia a qualquer pagina disponivel =============
  routerLink(url: string) {
    return this.router.navigateByUrl(url);
  }

  // ============ Guarda um elemento no localstore  =============
  saveInLocalStorage(key: string, value: any) {
    return localStorage.setItem(key, JSON.stringify(value));
  }

  // ============ Obtem um elemento no localstore  =============
  getFromLocalStorage(key: string) {
    return JSON.parse(localStorage.getItem(key)!);

  }



}
