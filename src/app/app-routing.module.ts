import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutes } from './interfaces';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: AppRoutes.home,
    component: HomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
