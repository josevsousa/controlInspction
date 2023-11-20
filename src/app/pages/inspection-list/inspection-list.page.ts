import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';


import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { map } from 'rxjs';
import { Inspection } from 'src/app/models/inspection.model';


@Component({
  selector: 'app-inspection-list',
  templateUrl: './inspection-list.page.html',
  styleUrls: ['./inspection-list.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HeaderComponent]
})
export class InspectionListPage implements OnInit {

  title = "inspection"
  firebaseSvc = inject(FirebaseService);
  utilSvc = inject(UtilsService);
  inspections: Inspection[] = []; 
  

  ngOnInit() {
    console.log('dentro da page inspection')
    // this.getInspections();
  }

  ionViewWillEnter(){
    this.getInspections();
  }

  // ====== Obter inspections
  async getInspections(){
    let path = "users";
    let list = this.firebaseSvc.getColletionData(path).subscribe({
      next: (resp: any)=>{
        this.inspections = resp;
      }
    });


  }
  

}