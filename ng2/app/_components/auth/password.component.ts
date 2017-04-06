import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { User } from '../../_models/index';
import { AlertService, UserService, AuthenticationService } from '../../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'password.component.html'
})

export class PasswordComponent {
    user: User;
    loading = false;
    model: any = {};
    
    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService,
        private authService: AuthenticationService,
    ) { }

    ngOnInit() {
        const currentUser = this.authService.getCurrentUser();
        if(currentUser) {
            this.user = currentUser.user;
        }
        else {
            this.alertService.error('You need to login!');
            this.router.navigate(['/login']);
        }
    }

    save() {
        this.model.match = this.model.password == this.model.confirm;

        if(this.model.match) {
            this.loading = true;
            this.user.password = this.model.password;
            this.userService.update(this.user).subscribe(
                data => {
                    this.alertService.success('User updated successfully!', true);
                    this.loading = false;
                },
                error => {
                    const message = error.json();
                    this.alertService.error(message.error);
                    this.loading = false;
                });
        }
    }
}
