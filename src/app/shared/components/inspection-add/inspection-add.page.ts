import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-inspection-add',
  templateUrl: './inspection-add.page.html',
  styleUrls: ['./inspection-add.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HeaderComponent]
})
export class InspectionAddPage implements OnInit {
  title = "inpection-add";

  ngOnInit() {
    console.log('dentro de inspection-add');
  }

}
