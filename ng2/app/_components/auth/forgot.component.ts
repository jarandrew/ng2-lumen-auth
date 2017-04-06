import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, AuthenticationService } from '../../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'forgot.component.html'
})

export class ForgotPasswordComponent {
    model: any = {};
    loading = false;

    constructor(
        private router: Router,
        private authService: AuthenticationService,
        private alertService: AlertService) { }

    send() {
        this.loading = true;
        this.authService.forgotPassword(this.model.email).subscribe(
            data => {
                if(data.success) {
                    this.alertService.success('Request sent successful', true);
                }
                else {
                    this.alertService.error('Email does not exist');
                }
                this.loading = false;
            },
            error => {
                const message = error.json();
                this.alertService.error(message.error);
                this.loading = false;
            });
    }
}
