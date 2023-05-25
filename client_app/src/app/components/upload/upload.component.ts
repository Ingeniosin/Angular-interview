import { Component } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {FileService} from "../../service/file.service";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {
  constructor(
    private client : HttpClient,
    private service : FileService
  ) {
  }

  onChange(e: Event) {
    const target = e.target as HTMLInputElement;
    const file = target.files![0];

    const formData = new FormData();
    formData.append('file', file);

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    const options = {
      headers: headers
    };

    this.client.post('http://localhost:3000/storage/upload', formData, options).subscribe(this.service.notify.bind(this.service));
    target.value = '';
  }
}
