import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { UtilsService } from 'src/app/services/utils.service';
import { EnvironmentAddPage } from 'src/app/shared/components/environment-add/environment-add.page';

@Component({
  selector: 'app-environment-list',
  templateUrl: './environment-list.page.html',
  styleUrls: ['./environment-list.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HeaderComponent]
})
export class EnvironmentListPage implements OnInit {

  title = 'environment';
  utilsSvc = inject(UtilsService);

  constructor() { }

  ngOnInit() {
    console.log("dentro do environment")
  }

  // ===== Atualizar o profile
  editEnvironment() {
    console.log("dddd");
    this.utilsSvc.presentMotal({
      component: EnvironmentAddPage,
      cssClass: 'edit-profile-modal'
    }).finally(() => {
      // atualizar o user de localStorage
      // this.getUserLS(); 
    });
  }

}
