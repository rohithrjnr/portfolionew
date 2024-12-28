import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Output() navigateToSection = new EventEmitter<string>();

  scrollToSection(section: string): void {
    this.navigateToSection.emit(section);
  }
}
