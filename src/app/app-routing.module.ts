import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { RegistrationComponent } from './components/registration/registration.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AddGoodsComponent } from './components/add-goods/add-goods.component';

import { RouteGuardService } from './services/route-guard.service';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, canActivate: [RouteGuardService] },
    { path: 'add', component: AddGoodsComponent, canActivate: [RouteGuardService] },
    { path: 'registration', component: RegistrationComponent },
    { path: 'login', component: LoginComponent },          //
    { path: '**', redirectTo: 'login' }                     //both lines required to revert back to login url. Eg surf /loginnnxx => /login
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
