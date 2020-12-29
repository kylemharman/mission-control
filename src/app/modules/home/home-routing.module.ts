import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeLandingComponent } from './pages/home-landing/home-landing.component';

const routes: Routes = [
  {
    path: 'landing',
    component: HomeLandingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
