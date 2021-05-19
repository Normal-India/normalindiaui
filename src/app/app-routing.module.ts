import { SupporterComponent } from './block/supporter/supporter.component';
import { LegalComponent } from './block/legal/legal.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './block/layout/layout/layout.component';


const routes: Routes = [

  {
    path: '', component: LayoutComponent
  },
  {
    path: 'legal', component: LegalComponent
  },
  {
    path: 'supporter', component: SupporterComponent
  },
  {
    path: 'volunteer', component: SupporterComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
