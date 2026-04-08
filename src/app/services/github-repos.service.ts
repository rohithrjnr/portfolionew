import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

export interface GitHubRepository {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  fork: boolean;
  private: boolean;
  size: number;
  updated_at: string;
  pushed_at: string | null;
  archived: boolean;
  topics?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class GithubReposService {
  private readonly http = inject(HttpClient);
  private readonly reposUrl = 'https://api.github.com/users/rohithrjnr/repos';

  getRepos(): Observable<GitHubRepository[]> {
    return this.http.get<GitHubRepository[]>(this.reposUrl, {
      params: {
        per_page: 100,
        sort: 'updated',
        direction: 'desc'
      }
    }).pipe(
      map((repos) => repos
        .map((repo) => ({
          ...repo,
          homepage: this.normalizeHomepage(repo.homepage)
        }))
        .filter((repo) => !repo.private && !repo.fork)
        .filter((repo) => this.hasUsefulContent(repo))
        .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
      )
    );
  }

  private hasUsefulContent(repo: GitHubRepository): boolean {
    if (repo.size <= 5) {
      return false;
    }

    const searchableText = `${repo.name} ${repo.description ?? ''}`.toLowerCase();
    const looksLikeTestRepo = /\b(test|testing|sample|empty|practice)\b/.test(searchableText);

    return !(repo.size <= 20 && looksLikeTestRepo);
  }

  private normalizeHomepage(homepage: string | null): string | null {
    const trimmedHomepage = homepage?.trim();

    if (!trimmedHomepage) {
      return null;
    }

    return /^https?:\/\//i.test(trimmedHomepage)
      ? trimmedHomepage
      : `https://${trimmedHomepage}`;
  }
}
