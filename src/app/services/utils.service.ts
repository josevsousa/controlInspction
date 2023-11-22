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


@Injectable({
  providedIn: 'root'
})
export class UtilsService {


  router = inject(Router);
  modalCtrl = inject(ModalController);
  toastCtrl = inject(ToastController);
  loadingCtrl = inject(LoadingController);
  alertCtrl = inject(AlertController);

  // ============ Modal =============
  // abre modal
  async presentMotal(opts: ModalOptions) {
    const modal = await this.modalCtrl.create(opts);
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data) return data;
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


}
