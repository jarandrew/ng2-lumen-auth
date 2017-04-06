import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { User } from '../../_models/index';
import { AlertService, UserService } from '../../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'edit.component.html'
})

export class UserEditComponent {
    user: User;
    loading = false;
    paramsSub: Subscription;
    userId: number;
    roles: any[];

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private userService: UserService,
        private alertService: AlertService
    ) {
        this.user = new User();
    }

    ngOnInit() {
        this.paramsSub = this.route.params
            .map(params => params['id'])
            .subscribe(userId => {
                this.userId = userId;
                if (userId > 0) {
                    this.userService.getById(userId).subscribe(response => {
                        this.user = response;
                    });
                }
            });

        this.roles = [
            { role: 0, title: 'Member' },
            { role: 1, title: 'Subscriber' },
            { role: 9, title: 'Administrator' },
        ]
    }

    save() {
        this.loading = true;
        if(this.userId > 0) {
            this.userService.update(this.user)
                .subscribe(
                    data => {
                        this.alertService.success('User updated successfully!', true);
                        this.router.navigate(['/users']);
                    },
                    error => {
                        const message = error.json();
                        this.alertService.error(message.error);
                        this.loading = false;
                    });
        }
        else {
            this.userService.create(this.user)
                .subscribe(
                    data => {
                        this.alertService.success('User added successfully!', true);
                        this.router.navigate(['/users']);
                    },
                    error => {
                        const message = error.json();
                        this.alertService.error(message.error);
                        this.loading = false;
                    });
        }
        
    }
}
