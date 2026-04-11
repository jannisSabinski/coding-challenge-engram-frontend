import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LucideCircleX } from '@lucide/angular';

@Component({
  selector: 'app-popup',
  imports: [LucideCircleX],
  templateUrl: './popup.html',
  styleUrl: './popup.css',
})
export class Popup {
  @Output() closeClicked = new EventEmitter<void>();
  @Input() popUpMessage:string='';
}
