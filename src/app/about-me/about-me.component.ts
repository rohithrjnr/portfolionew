import { Component } from '@angular/core';

interface SkillGroup {
  title: string;
  skills: string[];
}

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css']
})
export class AboutMeComponent {
  readonly skillGroups: SkillGroup[] = [
    {
      title: 'Frontend',
      skills: ['Angular', 'React', 'HTML', 'CSS', 'Bootstrap']
    },
    {
      title: 'Backend',
      skills: ['.NET Core', 'C#', 'Python', 'Flask', 'Django']
    },
    {
      title: 'Data & Tools',
      skills: ['SQL', 'Oracle', 'PL/SQL', 'Git', 'Docker']
    }
  ];

}
