import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-inspection-add',
  templateUrl: './inspection-add.page.html',
  styleUrls: ['./inspection-add.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HeaderComponent, ReactiveFormsModule ]
})
export class InspectionAddPage implements OnInit {
  title = "inpection-add";
  
  loginForm = new FormGroup({
    // uid: new FormControl('')
  // //   // active: new FormControl(true),
    name: new FormControl('', Validators.required),
  // //   // data_inicio: new FormControl(Date.now()),
  // //   // data_fim: new FormControl(undefined)
  });

  ngOnInit() {
    console.log('dentro de inspection-add');
  }

  onSubmit(){
    console.log(this.loginForm.value);
  }

}
