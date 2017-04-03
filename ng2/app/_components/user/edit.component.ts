import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Customer } from '../../_models/index';
import { AlertService, CustomerService } from '../../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'edit.component.html'
})

export class UserEditComponent {
    customer: Customer;
    loading = false;
    paramsSub: Subscription;
    customerId: number;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private customerService: CustomerService,
        private alertService: AlertService
    ) {
        this.customer = new Customer();
    }

    ngOnInit() {
        this.paramsSub = this.route.params
            .map(params => params['id'])
            .subscribe(customerId => {
                if (customerId) {
                    this.customerId = customerId;
                    this.customerService.getById(customerId).subscribe(response => {
                        this.customer = response;
                    })
                }
            });
    }

    save() {
        this.loading = true;
        if(this.customerId) {
            this.customerService.update(this.customer)
                .subscribe(
                    data => {
                        this.alertService.success('Customer updated successfully!', true);
                        this.router.navigate(['/']);
                    },
                    error => {
                        this.alertService.error(error);
                        this.loading = false;
                    });
        }
        else {
            this.customerService.create(this.customer)
                .subscribe(
                    data => {
                        this.alertService.success('Customer added successfully!', true);
                        this.router.navigate(['/']);
                    },
                    error => {
                        this.alertService.error(error);
                        this.loading = false;
                    });
        }
        
    }
}
