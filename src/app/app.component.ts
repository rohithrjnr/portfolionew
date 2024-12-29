import { Component, ViewChild, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Fixing "styleUrl" to "styleUrls"
})
export class AppComponent {
  title = 'portfolio-project';

  @ViewChild('projectsSection', { static: false }) projectsSection!: ElementRef;
  @ViewChild('homeSection', { static: false }) homeSection!: ElementRef;
  @ViewChild('skillSection', { static: false }) skillSection!: ElementRef;
  @ViewChild('aboutmeSection', { static: false }) aboutmeSection!: ElementRef;

  currentSection: string = 'home'; // Tracks the current section visible

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    const projectsSectionPosition = this.projectsSection?.nativeElement.offsetTop;
    const homeSectionPosition = this.homeSection?.nativeElement.offsetTop;
    const skillSectionPosition = this.skillSection?.nativeElement.offsetTop;
    const aboutmeSectionPosition=this.aboutmeSection?.nativeElement.offsetTop;
    const scrollPosition = window.pageYOffset + window.innerHeight / 2;

    if (scrollPosition >= projectsSectionPosition) {
      this.currentSection = 'projects';
    } else if (scrollPosition >= homeSectionPosition) {
      this.currentSection = 'home';
    }
    else if (scrollPosition >= skillSectionPosition) {
      this.currentSection = 'skills';
    }
    else if (scrollPosition >= aboutmeSectionPosition) {
      this.currentSection = 'aboutme';
    }
  }

  scrollToSection(section: string): void {
    let targetSection: HTMLElement;

    if (section === 'home') {
      targetSection = this.homeSection.nativeElement;
    } else if (section === 'projects') {
      targetSection = this.projectsSection.nativeElement;
    } 
     else if (section === 'skills') {
    targetSection = this.skillSection.nativeElement;
     }else if (section === 'aboutme') {
      targetSection = this.aboutmeSection.nativeElement;
    }
  else {
      return;
    }

    targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
