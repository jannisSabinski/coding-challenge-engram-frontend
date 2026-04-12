import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiURL } from '../../environment.local';

@Injectable({
  providedIn: 'root',
})
export class Pictureservice {

  constructor(private http: HttpClient) {}

  upload(file:File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${apiURL}/pictures`, formData);
  }
}
