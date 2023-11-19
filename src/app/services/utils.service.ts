import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController, ModalOptions, ToastController, ToastOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  router = inject(Router);
  // modalCtrl = inject(ModalController);
  toastCtrl = inject(ToastController);
  loadingCtrl = inject(LoadingController);

  // ============ Modal =============
  // abre modal
  // async presentMotal(opts: ModalOptions) {
  //   const modal = await this.modalCtrl.create(opts);
  //   await modal.present();
  //   const { data } = await modal.onWillDismiss();
  //   if (data) return data;
  // }
  // // fecha modal
  // dismissModal(data?: any) {
  //   return this.modalCtrl.dismiss(data);
  // }


  // ========== Loading =========
  loading() {
    return this.loadingCtrl.create({ spinner: 'crescent' })
  }


  // ============ Evia a qualquer pagina disponivel =============
  routerLink(url: string) {
    return this.router.navigateByUrl(url);
  }


}
