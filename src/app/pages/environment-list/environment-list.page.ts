import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { HeaderComponent } from 'src/app/shared/components/header/header.component';

@Component({
  selector: 'app-environment-list',
  templateUrl: './environment-list.page.html',
  styleUrls: ['./environment-list.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HeaderComponent]
})
export class EnvironmentListPage implements OnInit {

  title = 'environment';

  constructor() { }

  ngOnInit() {
    console.log("dentro do environment")
  }

}
