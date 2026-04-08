import { Component } from '@angular/core';

interface Skill {
  name: string;
  icon: string;
  level: number;
}

interface SkillCategory {
  title: string;
  description: string;
  skills: Skill[];
}

@Component({
  selector: 'app-skills-section',
  templateUrl: './skills-section.component.html',
  styleUrls: ['./skills-section.component.css']
})
export class SkillsSectionComponent {
  readonly categories: SkillCategory[] = [
    {
      title: 'Frontend Systems',
      description: 'Interfaces, dashboards, responsive UI, and interaction design.',
      skills: [
        { name: 'Angular', icon: 'assets/angular-icon.png', level: 92 },
        { name: 'React', icon: 'assets/react-icon.png', level: 78 },
        { name: 'HTML', icon: 'assets/html-icon.png', level: 90 },
        { name: 'CSS', icon: 'assets/css-icon.png', level: 88 },
        { name: 'Bootstrap', icon: 'assets/bootstrap-icon.png', level: 82 }
      ]
    },
    {
      title: 'Backend & Data',
      description: 'APIs, business workflows, data access, and database-heavy products.',
      skills: [
        { name: 'C#', icon: 'assets/csharp-icon.png', level: 88 },
        { name: '.NET', icon: 'assets/dotnet-icon.png', level: 88 },
        { name: 'Microsoft SQL', icon: 'assets/sql-icon.png', level: 86 },
        { name: 'Oracle', icon: 'assets/oracle-icon.png', level: 78 },
        { name: 'PL/SQL', icon: 'assets/plsql-icon.png', level: 76 }
      ]
    },
    {
      title: 'Extended Stack',
      description: 'Tools and languages used across experiments, delivery, and deployment.',
      skills: [
        { name: 'Python', icon: 'assets/python-icon.png', level: 82 },
        { name: 'Flask', icon: 'assets/flask-icon.png', level: 78 },
        { name: 'Django', icon: 'assets/django-icon.png', level: 70 },
        { name: 'Flutter', icon: 'assets/flutter-icon.png', level: 68 },
        { name: 'Git', icon: 'assets/git-icon.png', level: 84 },
        { name: 'Docker', icon: 'assets/docker-icon.png', level: 70 }
      ]
    }
  ];

}
