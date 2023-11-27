import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';


// ============ Imports =============
import { UtilsService } from 'src/app/services/utils.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]

})
export class HeaderComponent implements OnInit {

  //==================================== SERVICES
  utilSvc = inject(UtilsService);
  firebaseSvc = inject(FirebaseService);

  //==================================== ATRIBUTOS
  @Input() page!: string;
  @Input() backButton!: string;
  @Input() isModal!: boolean;
  photoUrl!: string;


  // ============ Router =============
  routerLink(url: string) {
    this.utilSvc.routerLink(url);
  }

  // =========== Modal ============
  dismissModal() {
    this.utilSvc.dismissModal();
  }

  ngOnInit() {
    this.photoUrl = this.utilSvc.getFromLocalStorage('user').photoUrl;
    console.log(this.photoUrl);
  }

  //============ auth ==============
  logOut() {
    return this.firebaseSvc.desconectarGoogle();
  }


}
