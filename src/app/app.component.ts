import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, ViewChild } from '@angular/core';

type SectionId = 'home' | 'about' | 'skills' | 'experience' | 'projects' | 'contact';

interface PortfolioSection {
  id: SectionId;
  element: HTMLElement;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnDestroy {
  title = 'portfolio-project';

  @ViewChild('homeSection') homeSection?: ElementRef<HTMLElement>;
  @ViewChild('aboutSection') aboutSection?: ElementRef<HTMLElement>;
  @ViewChild('skillSection') skillSection?: ElementRef<HTMLElement>;
  @ViewChild('experienceSection') experienceSection?: ElementRef<HTMLElement>;
  @ViewChild('projectsSection') projectsSection?: ElementRef<HTMLElement>;
  @ViewChild('contactSection') contactSection?: ElementRef<HTMLElement>;

  currentSection: SectionId = 'home';

  private sectionElements: PortfolioSection[] = [];
  private revealObserver?: IntersectionObserver;
  private cursorDot?: HTMLElement | null;
  private cursorRing?: HTMLElement | null;
  private cursorFrame = 0;
  private cursorX = 0;
  private cursorY = 0;

  ngAfterViewInit(): void {
    this.sectionElements = [
      this.toSection('home', this.homeSection),
      this.toSection('about', this.aboutSection),
      this.toSection('skills', this.skillSection),
      this.toSection('experience', this.experienceSection),
      this.toSection('projects', this.projectsSection),
      this.toSection('contact', this.contactSection)
    ].filter((section): section is PortfolioSection => section !== null);

    this.cursorDot = document.querySelector('.custom-cursor-dot');
    this.cursorRing = document.querySelector('.custom-cursor-ring');
    document.body.classList.add('cursor-ready');

    this.observeRevealElements();
    this.updateActiveSection();
    this.updateParallax();
  }

  ngOnDestroy(): void {
    this.revealObserver?.disconnect();
    document.body.classList.remove('cursor-ready');

    if (this.cursorFrame) {
      cancelAnimationFrame(this.cursorFrame);
    }
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    this.updateActiveSection();
    this.updateParallax();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.updateActiveSection();
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (!this.cursorDot || !this.cursorRing || window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    this.cursorX = event.clientX;
    this.cursorY = event.clientY;

    if (this.cursorFrame) {
      return;
    }

    this.cursorFrame = requestAnimationFrame(() => {
      this.cursorDot?.style.setProperty('transform', `translate3d(${this.cursorX}px, ${this.cursorY}px, 0)`);
      this.cursorRing?.style.setProperty('transform', `translate3d(${this.cursorX}px, ${this.cursorY}px, 0)`);
      this.cursorFrame = 0;
    });
  }

  scrollToSection(section: string): void {
    const targetSection = this.sectionElements.find((item) => item.id === section)?.element;

    if (!targetSection) {
      return;
    }

    targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    this.currentSection = section as SectionId;
  }

  private toSection(id: SectionId, ref?: ElementRef<HTMLElement>): PortfolioSection | null {
    return ref?.nativeElement ? { id, element: ref.nativeElement } : null;
  }

  private updateActiveSection(): void {
    if (!this.sectionElements.length) {
      return;
    }

    const scrollPosition = window.scrollY + window.innerHeight * 0.36;
    let activeSection: SectionId = 'home';

    for (const section of this.sectionElements) {
      if (scrollPosition >= section.element.offsetTop) {
        activeSection = section.id;
      }
    }

    this.currentSection = activeSection;
  }

  private observeRevealElements(): void {
    const revealElements = document.querySelectorAll<HTMLElement>('.reveal');

    if (!('IntersectionObserver' in window)) {
      revealElements.forEach((element) => element.classList.add('is-visible'));
      return;
    }

    this.revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add('is-visible');
          this.revealObserver?.unobserve(entry.target);
        });
      },
      {
        threshold: 0.16,
        rootMargin: '0px 0px -10% 0px'
      }
    );

    revealElements.forEach((element) => this.revealObserver?.observe(element));
  }

  private updateParallax(): void {
    document.documentElement.style.setProperty('--scroll-y', `${window.scrollY * 0.035}`);
  }
}
