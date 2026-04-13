import { Picture } from './picture.model';

export interface PictureListReturn {
  data: Picture[];
  total: number;
  page: number;
  take: number;
  totalPages: number;
}
