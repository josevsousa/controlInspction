import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { UtilsService } from 'src/app/services/utils.service';
import { ImagesAddPage } from 'src/app/shared/components/images-add/images-add.page';

@Component({
  selector: 'app-images-list',
  templateUrl: './images-list.page.html',
  styleUrls: ['./images-list.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HeaderComponent]
})
export class ImagesListPage implements OnInit {

  title = "images";
  utilsSvc = inject(UtilsService);


  ngOnInit() {
    console.log("dentro de images-list")
  }

  
  ionViewWillEnter() {
    // atualizar a lista
    }

  // ===== Atualizar o profile
  editEnvironment() {
    console.log("dddd");
    this.utilsSvc.presentMotal({
      component: ImagesAddPage,
      cssClass: 'edit-profile-modal'
    }).finally(() => {
      // atualizar o user de localStorage
      // this.getUserLS(); 
    });
  }

}


