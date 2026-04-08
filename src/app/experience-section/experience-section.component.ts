import { Component } from '@angular/core';

interface ExperienceItem {
  period: string;
  role: string;
  label: string;
  summary: string;
  points: string[];
  stack: string[];
}

@Component({
  selector: 'app-experience-section',
  templateUrl: './experience-section.component.html',
  styleUrls: ['./experience-section.component.css']
})
export class ExperienceSectionComponent {
  readonly timeline: ExperienceItem[] = [
    {
      period: 'Professional Work',
      role: 'Full Stack Developer',
      label: 'Accounting, payroll, ERP, and task workflows',
      summary: 'Built and improved business application flows with a focus on clean UI, reliable data handling, and maintainable backend contracts.',
      points: [
        'Developed Angular interfaces for operational workflows and dashboard-style products.',
        'Worked with .NET Core, SQL, and Oracle-centered data flows for scalable business modules.',
        'Improved usability across task management, ERP, payroll, and accounting experiences.'
      ],
      stack: ['Angular', '.NET Core', 'C#', 'SQL', 'Oracle']
    },
    {
      period: 'Product Builds',
      role: 'Independent Projects',
      label: 'Dashboards, full-stack apps, and UI experiments',
      summary: 'Shipped portfolio projects across task management, recipes, budget planning, and Trello-style boards while exploring multiple frontend and backend patterns.',
      points: [
        'Built full-stack apps with Angular, Flask, Python, HTML, CSS, and Bootstrap.',
        'Created interactive task tools with drag-and-drop behaviors and visual data representation.',
        'Maintained public demos and source repositories to show implementation details clearly.'
      ],
      stack: ['Angular', 'React', 'Flask', 'Python', 'JavaScript']
    },
    {
      period: 'Foundation',
      role: 'Engineering Growth',
      label: 'Five-plus years of programming practice',
      summary: 'Built a broad technical base across frontend, backend, databases, mobile-adjacent workflows, and developer tooling.',
      points: [
        'Practiced product-minded UI decisions, responsive layouts, and performance basics.',
        'Expanded across Git, Docker, Django, Flutter, and database technologies.',
        'Kept learning through personal builds, stack exploration, and production problem solving.'
      ],
      stack: ['Git', 'Docker', 'Django', 'Flutter', 'PL/SQL']
    }
  ];
}
