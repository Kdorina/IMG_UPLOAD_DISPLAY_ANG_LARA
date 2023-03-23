import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit{


  form!:FormGroup;
  constructor(private http:HttpClient, private fb: FormBuilder){
    this.form = this.fb.group({
      file:null
    })
  }
  ngOnInit(): void {
   this.getFile();
  }
 

  onFileChange(event:Event) {
      const file = (event.target as HTMLInputElement)?.files?.[0];
      this.form.patchValue({
        file:file
      })
  }
  
  uploadFile() {
    const formData:any = new FormData();
    formData.append('file', this.form.controls['file'].value);
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json'
      })
    }
    this.http.post('http://localhost:8000/api/upload', formData, httpOptions)
        .subscribe({
          next:(data:any) =>{
            console.log(data);
          }
        })


}


imageUrl = 'http://localhost:8000/storage/';
file:any;
  getFile() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'image/jpeg'
      })
    }
    this.http.get('http://localhost:8000/api/index', httpOptions)
        .subscribe({
          next:(data:any) =>{
            console.log(data);
            this.file = data;
          }
        })
}

}
