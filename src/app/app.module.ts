import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AddGoodsComponent } from './components/add-goods/add-goods.component';

import { TransformUnitPipe } from './pipes/transform-unit';
import { authInterceptorProviders } from './helpers/auth.interceptor';

@NgModule({
    declarations: [
        AppComponent,
        RegistrationComponent,
        HomeComponent,
        LoginComponent,
        TransformUnitPipe,
        AddGoodsComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        NgbModule
    ],
    providers: [authInterceptorProviders],
    bootstrap: [AppComponent]
})
export class AppModule { }
