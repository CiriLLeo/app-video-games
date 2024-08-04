import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  searchTerm: string = '';
  @Output() searchEvent = new EventEmitter<string>();

  constructor(private router: Router) { }

  onSubmit() {
    this.searchEvent.emit(this.searchTerm);
  }
}
