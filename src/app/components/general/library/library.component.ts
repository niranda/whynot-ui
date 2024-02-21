import { Component } from '@angular/core';
import HomeComponent from '../home/home.component';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent { 
  selectedTab: 'readers' | 'books' | 'lendings' | 'reports' | 'initial' = 'initial';

  constructor(private homeComponent: HomeComponent) {}

  logout() {
    this.homeComponent.closeChat();
  }
}
