import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { HeaderComponent } from 'src/app/shared/components/header/header.component';

@Component({
  selector: 'app-images-list',
  templateUrl: './images-list.page.html',
  styleUrls: ['./images-list.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HeaderComponent]
})
export class ImagesListPage implements OnInit {

  title = "images";

  constructor() { }

  ngOnInit() {
    console.log("dentro de images-list")
  }

}
