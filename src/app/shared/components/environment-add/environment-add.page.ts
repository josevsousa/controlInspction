import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-environment-add',
  templateUrl: './environment-add.page.html',
  styleUrls: ['./environment-add.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class EnvironmentAddPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
