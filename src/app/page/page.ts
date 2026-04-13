import { Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageControls } from './page-controls/page-controls';
import { LucideCircleX, LucideUpload } from '@lucide/angular';
import { Popup } from '../core/popup/popup';
import { Pictureservice } from '../services/picture.service';
import { Picture } from '../services/models';
import { PictureCard } from './picture-card/picture-card';

@Component({
  selector: 'app-page',
  imports: [PageControls, LucideUpload, Popup, LucideCircleX, PictureCard],
  templateUrl: './page.html',
  styleUrl: './page.css',
  host: {
    class: 'flex flex-col flex-1 w-full h-full min-h-0',
  },
})
export class Page {
  mode: 'discover' | 'my-images' = 'discover';
  pictures = signal<Picture[]>([]);

  showUploadPopup = signal(false);
  selectedFile: File | null = null;

  currentPage = 1;
  totalPages = 1;
  totalItems = 0;
  itemsPerpage = 10;

  constructor(
    private route: ActivatedRoute,
    private pictureService: Pictureservice,
  ) {}

  ngOnInit() {
    this.mode = this.route.snapshot.data['mode'];
    this.loadImages();
  }

  loadImages() {
    this.pictureService.loadImages(this.mode, this.currentPage, this.itemsPerpage).subscribe({
      next: (pictureList) => {
        this.pictures.set(pictureList.data);
        this.itemsPerpage = pictureList.take;
        this.currentPage = pictureList.page;
        this.totalItems = pictureList.total;
        this.totalPages = pictureList.totalPages;
      },
    });
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadImages();
  }

  onItemsPerPageChange(itemsPerPage: number) {
    this.itemsPerpage = itemsPerPage;
    this.currentPage = 1;
    this.loadImages();
  }

  get isMyImages() {
    return this.mode === 'my-images';
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];
    }
  }

  onFileDrop(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer?.files.length) {
      this.selectedFile = event.dataTransfer.files[0];
    }
  }

  upload() {
    if (!this.selectedFile) return;

    this.pictureService.upload(this.selectedFile).subscribe({
      next: (createdPicture) => {
        this.showUploadPopup.set(false);
        this.selectedFile = null;
        if (this.pictures().length + 1 < this.itemsPerpage) {
          this.pictures.update((pictures) => [createdPicture, ...pictures]);
        } else {
          this.loadImages();
        }
      },
      error: () => {
        //sth idk
      },
    });
  }

  onDelete(pictureId: string) {
    //this.pictures.update((pictures) => pictures.filter(p => p.id !== pictureId));
    this.loadImages();
  }

  onPictureTagChange(pictureId: string) {
    this.pictureService.getPictureById(pictureId).subscribe({
      next: (pic) => {
        this.pictures.update((pictures) => pictures.map((p) => (p.id === pic.id ? pic : p)));
      },
      error: () => {},
    });
  }
}
