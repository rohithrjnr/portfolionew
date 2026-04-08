import { Component, inject } from '@angular/core';
import { BehaviorSubject, Observable, catchError, combineLatest, map, of, shareReplay, startWith } from 'rxjs';
import { GitHubRepository, GithubReposService } from '../services/github-repos.service';

type LanguageFilter = string;

interface RepoState {
  repos: GitHubRepository[];
  isLoading: boolean;
  errorMessage: string | null;
}

interface ProjectsViewModel extends RepoState {
  filteredRepos: GitHubRepository[];
  languageFilters: LanguageFilter[];
  selectedLanguage: LanguageFilter;
  searchTerm: string;
}

@Component({
  selector: 'app-projects-section',
  templateUrl: './projects-section.component.html',
  styleUrls: ['./projects-section.component.css']
})
export class ProjectsSectionComponent {
  private readonly githubReposService = inject(GithubReposService);
  private readonly searchTermSubject = new BehaviorSubject<string>('');
  private readonly selectedLanguageSubject = new BehaviorSubject<LanguageFilter>('All');

  private readonly repoState$: Observable<RepoState> = this.githubReposService.getRepos().pipe(
    map((repos) => ({
      repos,
      isLoading: false,
      errorMessage: null
    })),
    startWith({
      repos: [],
      isLoading: true,
      errorMessage: null
    }),
    catchError(() => of({
      repos: [],
      isLoading: false,
      errorMessage: 'GitHub repositories are temporarily unavailable. Please try again later.'
    })),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  readonly vm$: Observable<ProjectsViewModel> = combineLatest([
    this.repoState$,
    this.searchTermSubject,
    this.selectedLanguageSubject
  ]).pipe(
    map(([state, searchTerm, selectedLanguage]) => {
      const languageFilters = this.getLanguageFilters(state.repos);
      const filteredRepos = this.filterRepos(state.repos, searchTerm, selectedLanguage);

      return {
        ...state,
        filteredRepos,
        languageFilters,
        selectedLanguage,
        searchTerm
      };
    })
  );

  updateSearchTerm(searchTerm: string): void {
    this.searchTermSubject.next(searchTerm);
  }

  setLanguageFilter(language: LanguageFilter): void {
    this.selectedLanguageSubject.next(language);
  }

  trackByRepoId(_index: number, repo: GitHubRepository): number {
    return repo.id;
  }

  trackByLanguage(_index: number, language: LanguageFilter): LanguageFilter {
    return language;
  }

  private filterRepos(
    repos: GitHubRepository[],
    searchTerm: string,
    selectedLanguage: LanguageFilter
  ): GitHubRepository[] {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return repos.filter((repo) => {
      const matchesLanguage = selectedLanguage === 'All' || repo.language === selectedLanguage;
      const matchesSearch = !normalizedSearch
        || repo.name.toLowerCase().includes(normalizedSearch)
        || (repo.description ?? '').toLowerCase().includes(normalizedSearch);

      return matchesLanguage && matchesSearch;
    });
  }

  private getLanguageFilters(repos: GitHubRepository[]): LanguageFilter[] {
    const languages = repos
      .map((repo) => repo.language)
      .filter((language): language is string => Boolean(language));

    return ['All', ...Array.from(new Set(languages)).sort((a, b) => a.localeCompare(b))];
  }
}
