import { Component, OnInit, Input } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { Ambiente } from 'src/app/models/ambiente.model';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-edit-ambiente',
  standalone: true,
  imports: [IonicModule, CommonModule, HeaderComponent ],
  templateUrl: './add-edit-ambiente.component.html',
  styleUrls: ['./add-edit-ambiente.component.scss'],
})
export class AddEditAmbienteComponent  implements OnInit {
  // ========== SERVECES
  
  // ========== ATRIBUTOS
  title!: string;
  @Input() ambiente: any;




  // ========== COMPORTAMENTOS
  ngOnInit() {
    console.log("dentro do add-edit-ambiente");
    if (this.ambiente) {
      // recebeu uma ambiente
      // this.form.setValue(this.ambiente);
      this.title = "Editar Ambiente";
    } else {
      // nao recebeu uma ambiente
      this.title = "Novo Ambiente";
    };
  }

}
