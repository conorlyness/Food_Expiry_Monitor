import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpiredYesterdayComponent } from './components/expired-yesterday/expired-yesterday.component';
import { ExpiringSoonComponent } from './components/expiring-soon/expiring-soon.component';
import { ExpiringTodayComponent } from './components/expiring-today/expiring-today.component';
import { FoodListComponent } from './components/food-list/food-list.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'all-entries',
    component: FoodListComponent,
  },
  {
    path: 'expiring-today',
    component: ExpiringTodayComponent,
  },
  {
    path: 'expiring-soon',
    component: ExpiringSoonComponent,
  },
  {
    path: 'expired-yesterday',
    component: ExpiredYesterdayComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
