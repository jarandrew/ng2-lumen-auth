import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { AlertService, AuthenticationService } from '../../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'reset.component.html'
})

export class ResetPasswordComponent implements OnInit {
    model: any = {};
    loading = false;
    paramsSub: Subscription;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private authService: AuthenticationService,
        private alertService: AlertService) { }

    ngOnInit() {
        this.paramsSub = this.route.params
            .map(params => params['token'])
            .subscribe(token => {
                this.model.token = token;
            });
    }

    submit() {
        this.model.match = this.model.password == this.model.password_confirmation;

        if(this.model.match) {
            this.loading = true;
            this.authService.resetPassword(this.model).subscribe(
                data => {
                    this.alertService.success('Password has been reset successful', true);
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
