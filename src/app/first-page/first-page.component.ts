import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.css']
})
export class FirstPageComponent implements OnInit, OnDestroy {
  readonly roles = [
    'Angular interfaces',
    '.NET Core APIs',
    'SQL-backed products',
    'performance-first UX'
  ];

  readonly codeSnippet = `const rohith = {
  focus: ['Angular', '.NET Core', 'Databases'],
  ships: ['ERP flows', 'Dashboards', 'APIs'],
  standard: 'clean UX + reliable systems'
};`;

  typedRole = '';

  private roleIndex = 0;
  private characterIndex = 0;
  private isDeleting = false;
  private typingTimer?: ReturnType<typeof setTimeout>;

  ngOnInit(): void {
    this.runTypingLoop();
  }

  ngOnDestroy(): void {
    if (this.typingTimer) {
      clearTimeout(this.typingTimer);
    }
  }

  private runTypingLoop(): void {
    const currentRole = this.roles[this.roleIndex] ?? '';

    if (this.isDeleting) {
      this.characterIndex -= 1;
      this.typedRole = currentRole.slice(0, this.characterIndex);
    } else {
      this.characterIndex += 1;
      this.typedRole = currentRole.slice(0, this.characterIndex);
    }

    let delay = this.isDeleting ? 38 : 72;

    if (!this.isDeleting && this.characterIndex === currentRole.length) {
      delay = 1200;
      this.isDeleting = true;
    }

    if (this.isDeleting && this.characterIndex === 0) {
      this.isDeleting = false;
      this.roleIndex = (this.roleIndex + 1) % this.roles.length;
      delay = 260;
    }

    this.typingTimer = setTimeout(() => this.runTypingLoop(), delay);
  }

}
