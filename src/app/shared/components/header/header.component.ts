import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';


// ============ Imports =============
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]

})
export class HeaderComponent {

  @Input() page!: string;
  @Input() backButton!: string;
  @Input() isModal!: boolean;

  utilSvc = inject(UtilsService);


  // ============ Router =============
  routerLink(url: string) {
    this.utilSvc.routerLink(url);
  }


}
