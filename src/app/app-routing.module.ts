import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ErrorComponent } from './components/error/error.component';
import { UserComponent } from './components/user/user.component';
import { ActiveComponent } from './components/active/active.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'active', component: ActiveComponent },
  { path: 'user', component: UserComponent },
  { path: '**', component: ErrorComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
