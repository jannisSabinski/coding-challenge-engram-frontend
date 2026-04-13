import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { Pictureservice } from '../../services/picture.service';
import { Picture } from '../../services/models';
import { LucideCircleX, LucidePencil, LucideTrash } from '@lucide/angular';
import { Popup } from '../../core/popup/popup';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoadingSpinner } from '../../core/loading-spinner/loading-spinner';

@Component({
  selector: 'app-picture-card',
  imports: [LucideTrash, LucidePencil, Popup, LucideCircleX, ReactiveFormsModule, LoadingSpinner],
  templateUrl: './picture-card.html',
  styleUrl: './picture-card.css',
})
export class PictureCard {
  @Input() picture!: Picture;
  localPicture!: Picture;
  @Input() showButtons: boolean = false;

  @Output() pictureDeleted = new EventEmitter<string>();
  @Output() pictureTagChange = new EventEmitter<string>();

  pictureUrl: string = '';
  showTagEditPopup = signal(false);
  addTagForm = new FormGroup({
    tagName: new FormControl<string>('', Validators.required),
  });

  tagLoading = signal(false);
  deleteLoading = signal(false);

  constructor(private pictureService: Pictureservice) {}

  ngOnInit() {
    this.pictureUrl = this.pictureService.getPictureUrl(this.picture.storageName);
  }

  delete() {
    this.deleteLoading.set(true);
    this.pictureService.deletePicture(this.picture.id).subscribe({
      next: () => {
        this.deleteLoading.set(false);
        this.pictureDeleted.emit(this.picture.id);
      },
      error: () => {
        this.deleteLoading.set(false);
      },
    });
  }

  removeTag(tagId: string) {
    this.tagLoading.set(true);
    this.pictureService.removeTag(this.picture.id, tagId).subscribe({
      next: () => {
        this.tagLoading.set(false);
        this.pictureTagChange.emit(this.picture.id);
      },
      error: () => {
        this.tagLoading.set(false);
      },
    });
  }

  addTag() {
    const tagName = this.addTagForm.value?.tagName;
    if (!tagName) return;
    this.tagLoading.set(true);
    this.pictureService.addTag(this.picture.id, tagName).subscribe({
      next: () => {
        this.tagLoading.set(false);
        this.addTagForm.reset();
        this.pictureTagChange.emit(this.picture.id);
      },
      error: () => {
        this.tagLoading.set(false);
      },
    });
  }
}
