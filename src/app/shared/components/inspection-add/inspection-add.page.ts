import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-inspection-add',
  templateUrl: './inspection-add.page.html',
  styleUrls: ['./inspection-add.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class InspectionAddPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
