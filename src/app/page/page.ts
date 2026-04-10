import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page',
  imports: [],
  templateUrl: './page.html',
  styleUrl: './page.css',
})
export class Page {
  mode: 'discover' | 'my' = 'discover';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.mode = this.route.snapshot.data['mode'];
  }

  get isMyImages() {
    return this.mode === 'my';
  }
}
