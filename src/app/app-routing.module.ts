import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirstPageComponent } from './first-page/first-page.component';
import { ProjectsSectionComponent } from './projects-section/projects-section.component';
const routes: Routes = [
  { path: '', component: FirstPageComponent },
  { path: 'projects', component: ProjectsSectionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
