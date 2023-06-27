import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { CoopsComponent } from './pages/coops/coops.component';
import { NewCoopsComponent } from './pages/new-coops/new-coops.component';
import { PartnersComponent } from './pages/partners/partners.component';
import { NewPartnersComponent } from './pages/new-partners/new-partners.component';
import { NewUsersComponent } from './pages/new-users/new-users.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { UsersComponent } from './pages/users/users.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {path: 'inicio', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'cooperativas', component: CoopsComponent, canActivate: [AuthGuard]},
  {path: 'socios', component: PartnersComponent, canActivate: [AuthGuard]},
  {path: 'users', component: UsersComponent, canActivate: [AuthGuard]},
  {path: 'transactions', component: TransactionsComponent, canActivate: [AuthGuard]},
  {path: 'cooperativas/:mode', component: NewCoopsComponent, canActivate: [AuthGuard]},
  {path: 'cooperativas/:id/:mode', component: NewCoopsComponent, canActivate: [AuthGuard]},
  {path: 'socios/:mode', component: NewPartnersComponent, canActivate: [AuthGuard]},
  {path: 'socios/:id/:mode', component: NewPartnersComponent, canActivate: [AuthGuard]},
  {path: 'users/:mode', component: NewUsersComponent, canActivate: [AuthGuard]},
  {path: 'users/:id/:mode', component: NewUsersComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: 'login'},
  {path: '', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
