import { Component } from '@angular/core';

type ProjectCategory = 'All' | 'Angular' | 'React' | 'Python' | 'Flask' | 'JavaScript';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  demoUrl: string;
  frontendRepo: string;
  backendRepo?: string;
  techStack: string[];
}

@Component({
  selector: 'app-projects-section',
  templateUrl: './projects-section.component.html',
  styleUrls: ['./projects-section.component.css']
})
export class ProjectsSectionComponent {
  readonly filters: ProjectCategory[] = ['All', 'Angular', 'React', 'Python', 'Flask', 'JavaScript'];

  readonly allProjects: Project[] = [
    {
      id: 'budget-allocation',
      title: 'Budget Allocation App',
      description: 'A React budget planning experience that helps users allocate spending across categories with a clean, interactive flow.',
      image: 'assets/project-1.PNG',
      demoUrl: 'https://budget-allocation-project.vercel.app/',
      frontendRepo: 'https://github.com/rohithrjnr/Budget-allocation-project',
      techStack: ['React', 'CSS', 'Vercel']
    },
    {
      id: 'task-management-angular',
      title: 'Task Management Website',
      description: 'An Angular task management product with drag-and-drop organization and chart-driven data visibility.',
      image: 'assets/project-2.PNG',
      demoUrl: 'https://task-management-website-phi.vercel.app/',
      frontendRepo: 'https://github.com/rohithrjnr/TaskManagementWebsite',
      techStack: ['Angular', 'Chart.js', 'TypeScript']
    },
    {
      id: 'portfolio-website',
      title: 'Portfolio Website',
      description: 'A responsive portfolio built with HTML and CSS to present projects and skills in a focused, minimal layout.',
      image: 'assets/project-3.PNG',
      demoUrl: 'https://portfolio-ibm.vercel.app/',
      frontendRepo: 'https://github.com/rohithrjnr/PortfolioIBM',
      techStack: ['HTML', 'CSS', 'Responsive']
    },
    {
      id: 'nutello-dashboard',
      title: 'Nutello Dashboard',
      description: 'A Trello-inspired JavaScript dashboard with draggable task organization and lightweight project board interactions.',
      image: 'assets/project-4.PNG',
      demoUrl: 'https://nutello-final.vercel.app/',
      frontendRepo: 'https://github.com/rohithrjnr/Nutello-final',
      techStack: ['JavaScript', 'Drag & Drop', 'Dashboard']
    },
    {
      id: 'full-stack-task-manager',
      title: 'Full-Stack Task Manager',
      description: 'A Flask and Python task management app with an HTML, CSS, and Bootstrap frontend for simple workflow tracking.',
      image: 'assets/project-5.PNG',
      demoUrl: 'https://taskmanagementusingpy.vercel.app/',
      frontendRepo: 'https://github.com/rohithrjnr/Task-Management-Simple-A',
      backendRepo: 'https://github.com/rohithrjnr/Task-Management-Simple-PY',
      techStack: ['Python', 'Flask', 'Bootstrap']
    },
    {
      id: 'recipe-reader',
      title: 'Recipe Reader',
      description: 'A full-stack recipe explorer with an Angular frontend and Flask/Python backend for structured recipe browsing.',
      image: 'assets/project-6.PNG',
      demoUrl: 'https://recipereaderpython.vercel.app/',
      frontendRepo: 'https://github.com/rohithrjnr/RecipeProjectFrontend',
      backendRepo: 'https://github.com/rohithrjnr/RecipeProjectBackend',
      techStack: ['Angular', 'Python', 'Flask']
    }
  ];

  filteredProjects: Project[] = [...this.allProjects];
  selectedCategory: ProjectCategory = 'All';
  selectedProject: Project | null = null;

  filterProjects(category: ProjectCategory): void {
    this.selectedCategory = category;
    this.filteredProjects = category === 'All'
      ? [...this.allProjects]
      : this.allProjects.filter((project) => project.techStack.includes(category));
  }

  openSourceCodePopup(project: Project): void {
    if (!project.backendRepo) {
      window.open(project.frontendRepo, '_blank', 'noopener');
      return;
    }

    this.selectedProject = project;
  }

  closeSourceCodePopup(): void {
    this.selectedProject = null;
  }

  trackByProjectId(_index: number, project: Project): string {
    return project.id;
  }
}
