import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from '../header/header.component';
import { UtilsService } from 'src/app/services/utils.service';


@Component({
  selector: 'app-environment-add',
  templateUrl: './environment-add.page.html',
  styleUrls: ['./environment-add.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HeaderComponent]
})
export class EnvironmentAddPage implements OnInit {
  title = "environment-add";
  utilsSvc = inject(UtilsService);
  

  ngOnInit() {
    console.log("ok")
  }

  // ===== Atualizar o profile
  editEnvironment() {
    this.utilsSvc.presentMotal({
      component: EnvironmentAddPage,
      cssClass: 'edit-profile-modal'
    }).finally(() => {
      // atualizar o user de localStorage
      // this.getUserLS(); 
    });

  }
}