import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ClubsPage } from './clubs.page';


const routes: Routes = [
  {
    path: '',
    component: ClubsPage,
    
  },
  {
    path: 'clubPath',
    redirectTo: '/tabs/tab2',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClubsPageRoutingModule {}
