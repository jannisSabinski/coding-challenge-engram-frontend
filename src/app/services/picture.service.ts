import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { User, Picture, Tag } from './models';
import { PictureListReturn } from './models/pictureListReturn.model';

@Injectable({
  providedIn: 'root',
})
export class Pictureservice {
  constructor(private http: HttpClient) {}

  upload(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<Picture>(`${environment.apiURL}/pictures`, formData);
  }

  getPictureUrl(storageName: string) {
    return `${environment.bucketUrl}${storageName}`;
  }

  deletePicture(id: string) {
    return this.http.delete(`${environment.apiURL}/pictures/${id}`);
  }

  addTag(pictureId: string, tagName: string) {
    return this.http.post(`${environment.apiURL}/tag`, {
      pictureId: pictureId,
      name: tagName,
    });
  }

  removeTag(pictureId: string, tagId: string) {
    return this.http.delete(`${environment.apiURL}/tag`, {
      body: {
        tagId: tagId,
        pictureId: pictureId,
      },
    });
  }

  getPictureById(id: string) {
    return this.http.get<Picture>(`${environment.apiURL}/pictures/${id}`);
  }

  loadImages(mode: string, page: number, take: number) {
    if(mode === 'my-images'){
      return this.http.get<PictureListReturn>(`${environment.apiURL}/pictures/my-images`, {
        params: {
          page: page.toString(),
          take: take.toString(),
        },
      });
    }else{
      return this.http.get<PictureListReturn>(`${environment.apiURL}/pictures`, {
        params: {
          page: page.toString(),
          take: take.toString(),
        },
      });
    }
  }
}
