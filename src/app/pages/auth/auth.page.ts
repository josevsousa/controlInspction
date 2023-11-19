import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
  standalone: true,
  imports: [
    IonicModule, 
    CommonModule,
  ]
})
export class AuthPage implements OnInit {

  title = 'auth';

  utilSvc = inject(UtilsService);

  ngOnInit() {
    console.log("dentro do auth")
  }

  // ============== FUNCTION DO AUTH ===============
  utilRouter(){
    this.utilSvc.routerLink('main');
  }

}
