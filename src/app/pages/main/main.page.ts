import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';


import { HeaderComponent } from 'src/app/shared/components/header/header.component';

@Component({
    selector: 'app-main',
    templateUrl: './main.page.html',
    styleUrls: ['./main.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule, HeaderComponent
    ]
})
export class MainPage implements OnInit {

  title = 'main';

  ngOnInit() {
    console.log("dentro do main")
  }

  
  // ============== FUNCTION DO MAIN ===============

}
