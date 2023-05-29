import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { buffer } from 'rxjs';

@Component({
  selector: 'app-create-caso',
  templateUrl: './create-caso.component.html',
  styles: [
  ]
})
export class CreateCasoComponent {

  id: string = '';
  filePDF: string = '';
  

  constructor( private apiService: ApiService, private fb: FormBuilder){  }

  miFormulario: FormGroup = this.fb.group({
    id: ['']
  })

  fileEvent(fileInput:any){
      const file = fileInput.target.files[0]
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result?.slice(28)
        this.filePDF = base64String as string;
      };

  }


  apiCall(){
    console.log(this.id)
    this.apiService.valid = 2
    this.apiService.createCase(this.id)
    .subscribe(data => {
      console.log(data);
    });

  }

}


