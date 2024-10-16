import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { AddNewPageComponent } from './pages/add-new-page/add-new-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { HeroPageComponent } from './pages/hero-page/hero-page.component';

  // localhost:400/heroes
const routes: Routes = [
  {
    path:'',
    component: LayoutPageComponent,
    children: [
      {path:'add-new-hero', component: AddNewPageComponent},
      {path:'search', component: SearchPageComponent},
      {path:'list', component: ListPageComponent},
      {path:'edit/:id', component: AddNewPageComponent},
      {path:':id', component: HeroPageComponent},
      {path:'**', redirectTo:'list'}, // La primera vez 'localhost:400/heroes/' redirige a 'list'
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroesRoutingModule { }
