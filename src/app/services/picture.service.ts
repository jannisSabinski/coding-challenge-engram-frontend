import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiURL, bucketUrl } from '../../environment.local';
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
    return this.http.post<Picture>(`${apiURL}/pictures`, formData);
  }

  getPictureUrl(storageName: string) {
    return `${bucketUrl}${storageName}`;
  }

  deletePicture(id: string) {
    return this.http.delete(`${apiURL}/pictures/${id}`);
  }

  addTag(pictureId: string, tagName: string) {
    return this.http.post(`${apiURL}/tag`, {
      pictureId: pictureId,
      name: tagName,
    });
  }

  removeTag(pictureId: string, tagId: string) {
    return this.http.delete(`${apiURL}/tag`, {
      body: {
        tagId: tagId,
        pictureId: pictureId,
      },
    });
  }

  getPictureById(id: string) {
    return this.http.get<Picture>(`${apiURL}/pictures/${id}`);
  }

  loadImages(mode: string, page: number, take: number) {
    if(mode === 'my-images'){
      return this.http.get<PictureListReturn>(`${apiURL}/pictures/my-images`, {params:{
        page: page.toString(),
        take: take.toString(),
      }});
    }else{
      return this.http.get<PictureListReturn>(`${apiURL}/pictures`, {
        params: {
          page: page.toString(),
          take: take.toString(),
        },
      });
    }
  }
}
