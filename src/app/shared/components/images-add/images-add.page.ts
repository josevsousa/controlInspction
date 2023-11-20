import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UtilsService } from 'src/app/services/utils.service';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-images-add',
  templateUrl: './images-add.page.html',
  styleUrls: ['./images-add.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HeaderComponent]
})
export class ImagesAddPage implements OnInit {
  title = 'images-add';
  utilsSvc = inject(UtilsService);

  ngOnInit() {
    console.log("dentro do images-add")
  }


}
