import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-images-add',
  templateUrl: './images-add.page.html',
  styleUrls: ['./images-add.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ImagesAddPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
