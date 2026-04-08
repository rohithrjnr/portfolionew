import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

interface NavItem {
  id: string;
  label: string;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Input() activeSection = 'home';
  @Input() scrolled = false;
  @Output() navigateToSection = new EventEmitter<string>();

  isMenuOpen = false;

  readonly navItems: NavItem[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ];

  @HostListener('window:keydown.escape')
  closeMenu(): void {
    this.isMenuOpen = false;
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  scrollToSection(section: string): void {
    this.navigateToSection.emit(section);
    this.isMenuOpen = false;
  }
}
