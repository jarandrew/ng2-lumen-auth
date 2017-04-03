import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ApiFactory } from './_helpers/index';
import { BaseRequestOptions } from '@angular/http';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { AlertService, AuthenticationService, UserService, CustomerService } from './_services/index';
import { HomeComponent } from './_components/home/index';
import { UserListComponent, UserEditComponent } from './_components/user/index';
import { LoginComponent, RegisterComponent } from './_components/auth/index';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        LoginComponent,
        RegisterComponent,
        HomeComponent,
        UserListComponent,
        UserEditComponent,
    ],
    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,
        CustomerService,
        ApiFactory,
        BaseRequestOptions
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }