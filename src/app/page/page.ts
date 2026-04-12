import { Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageControls } from './page-controls/page-controls';
import { LucideCircleX, LucideUpload } from '@lucide/angular';
import { Popup } from '../core/popup/popup';
import { Pictureservice } from '../services/picture.service';

@Component({
  selector: 'app-page',
  imports: [PageControls, LucideUpload, Popup, LucideCircleX],
  templateUrl: './page.html',
  styleUrl: './page.css',
})
export class Page {
  mode: 'discover' | 'my-images' = 'discover';

  showUploadPopup = signal(false);
  selectedFile: File | null = null;

  constructor(
    private route: ActivatedRoute,
    private pictureService: Pictureservice,
  ) {}

  ngOnInit() {
    this.mode = this.route.snapshot.data['mode'];
  }

  loadImages() {}

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
      next: () => {
        this.showUploadPopup.set(false);
        this.selectedFile = null;
        this.loadImages(); // refresh picturegrid
      },
      error: () => {
        //sth idk
      },
    });
  }
}
