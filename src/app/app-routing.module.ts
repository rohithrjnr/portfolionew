import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirstPageComponent } from './first-page/first-page.component';
import { ProjectsSectionComponent } from './projects-section/projects-section.component';
import { SkillsSectionComponent } from './skills-section/skills-section.component';
const routes: Routes = [
  { path: '', component: FirstPageComponent },
  { path: 'projects', component: ProjectsSectionComponent },
  { path: 'skills', component: SkillsSectionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
