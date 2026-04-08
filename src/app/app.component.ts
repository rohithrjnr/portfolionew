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
  hasScrolled = false;
  scrollProgress = 0;

  private sectionElements: PortfolioSection[] = [];
  private revealObserver?: IntersectionObserver;
  private scrollFrame = 0;

  ngAfterViewInit(): void {
    this.sectionElements = [
      this.toSection('home', this.homeSection),
      this.toSection('about', this.aboutSection),
      this.toSection('skills', this.skillSection),
      this.toSection('experience', this.experienceSection),
      this.toSection('projects', this.projectsSection),
      this.toSection('contact', this.contactSection)
    ].filter((section): section is PortfolioSection => section !== null);

    this.observeRevealElements();
    this.queueScrollUpdate();
  }

  ngOnDestroy(): void {
    this.revealObserver?.disconnect();

    if (this.scrollFrame) {
      cancelAnimationFrame(this.scrollFrame);
    }
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.queueScrollUpdate();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.queueScrollUpdate();
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
    const revealElements = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));

    revealElements.forEach((element) => {
      const parent = element.parentElement;
      const revealSiblings = parent ? Array.from(parent.children).filter((child) => child.classList.contains('reveal')) : [];
      const revealIndex = Math.max(revealSiblings.indexOf(element), 0);
      if (!element.classList.contains('delay-1') && !element.classList.contains('delay-2')) {
        element.style.setProperty('--reveal-delay', `${Math.min(revealIndex * 70, 280)}ms`);
      }
    });

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

  private queueScrollUpdate(): void {
    if (this.scrollFrame) {
      return;
    }

    this.scrollFrame = requestAnimationFrame(() => {
      this.updateScrollState();
      this.scrollFrame = 0;
    });
  }

  private updateScrollState(): void {
    this.updateActiveSection();
    this.updateParallax();
    this.hasScrolled = window.scrollY > 16;

    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    this.scrollProgress = scrollableHeight > 0 ? Math.min(window.scrollY / scrollableHeight, 1) : 0;
  }
}
