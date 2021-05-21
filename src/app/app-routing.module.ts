import { VolunterComponent } from './block/volunter/volunter.component';
import { SupporterComponent } from './block/supporter/supporter.component';
import { LegalComponent } from './block/legal/legal.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './block/layout/layout/layout.component';


const routes: Routes = [

  {
    path: '', component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./feature/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'legal', component: LegalComponent
      },
      {
        path: 'supporter', component: SupporterComponent
      },
      {
        path: 'volunteer', component: VolunterComponent
      }
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
