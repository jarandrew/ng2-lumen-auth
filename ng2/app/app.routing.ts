import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './_components/home/index';
import { LoginComponent, RegisterComponent, PasswordComponent, ForgotPasswordComponent, ResetPasswordComponent } from './_components/auth/index';
import { UserListComponent, UserEditComponent, ProfileComponent } from './_components/user/index';
import { AuthGuard } from './_guards/index';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'users', component: UserListComponent, canActivate: [AuthGuard] },
    { path: 'users/:id', component: UserEditComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'change-password', component: PasswordComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'reset-password/:token', component: ResetPasswordComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);